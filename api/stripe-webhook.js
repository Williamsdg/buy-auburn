import Stripe from 'stripe';

export const config = {
  api: { bodyParser: false }
};

async function buffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function verifySignature(payload, sig, secrets) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'unused');
  for (const secret of secrets) {
    try {
      return stripe.webhooks.constructEvent(payload, sig, secret);
    } catch (e) {
      continue;
    }
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET_1,
    process.env.STRIPE_WEBHOOK_SECRET_2
  ].filter(Boolean);

  const event = verifySignature(buf, sig, secrets);
  if (!event) {
    console.error('Webhook signature verification failed');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email || session.customer_email;

      if (customerEmail) {
        // Mark business as paid by matching contact email
        const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/businesses?contact=eq.${encodeURIComponent(customerEmail)}&payment_status=eq.unpaid`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ payment_status: 'paid' })
        });

        const updated = await updateRes.json();
        console.log(`Checkout completed for ${customerEmail}. Updated ${Array.isArray(updated) ? updated.length : 0} business(es).`);
      }
    }

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object;
      const customerEmail = invoice.customer_email;

      if (customerEmail) {
        // Ensure business stays paid on renewal
        const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/businesses?contact=eq.${encodeURIComponent(customerEmail)}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ payment_status: 'paid' })
        });

        const updated = await updateRes.json();
        console.log(`Invoice paid for ${customerEmail}. Updated ${Array.isArray(updated) ? updated.length : 0} business(es).`);
      }
    }
  } catch (err) {
    console.error('Webhook processing error:', err);
    return res.status(500).json({ error: 'Processing failed' });
  }

  return res.status(200).json({ received: true });
}
