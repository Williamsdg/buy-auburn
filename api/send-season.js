const FULL_SCHEDULE = {
  Football: [
    { date: 'Sept 5', opponent: 'Baylor', location: 'Atlanta, GA', away: true },
    { date: 'Sept 12', opponent: 'Southern Miss', location: 'Auburn, AL', away: false },
    { date: 'Sept 19', opponent: 'Florida', location: 'Auburn, AL', away: false },
    { date: 'Sept 26', opponent: 'Vanderbilt', location: 'Auburn, AL', away: false },
    { date: 'Oct 3', opponent: 'Tennessee', location: 'Knoxville, TN', away: true },
    { date: 'Oct 17', opponent: 'Georgia', location: 'Athens, GA', away: true },
    { date: 'Oct 24', opponent: 'LSU', location: 'Auburn, AL', away: false },
    { date: 'Oct 31', opponent: 'Ole Miss', location: 'Oxford, MS', away: true },
    { date: 'Nov 7', opponent: 'Arkansas', location: 'Auburn, AL', away: false },
    { date: 'Nov 14', opponent: 'Mississippi State', location: 'Starkville, MS', away: true },
    { date: 'Nov 21', opponent: 'Samford', location: 'Auburn, AL', away: false },
    { date: 'Nov 28', opponent: 'Alabama', location: 'Tuscaloosa, AL', away: true },
  ],
  Baseball: [
    { date: 'Feb 20-22', opponent: 'KSU/FSU/Louisville', location: 'Arlington, TX', away: true },
    { date: 'Mar 13-15', opponent: 'Missouri', location: 'Columbia, MO', away: true },
    { date: 'Mar 27-29', opponent: 'Alabama', location: 'Tuscaloosa, AL', away: true },
    { date: 'Mar 31', opponent: 'Georgia Tech', location: 'Atlanta, GA', away: true },
    { date: 'Apr 17-19', opponent: 'Florida', location: 'Gainesville, FL', away: true },
    { date: 'May 1-3', opponent: 'Texas A&M', location: 'College Station, TX', away: true },
    { date: 'May 8-10', opponent: 'Mississippi State', location: 'Starkville, MS', away: true },
  ],
  Basketball: [
    { date: 'TBD', opponent: 'SEC Schedule', location: 'Various', away: true },
  ],
  Softball: [
    { date: 'Mar 13-15', opponent: 'Oklahoma', location: 'Norman, OK', away: true },
    { date: 'Mar 17', opponent: 'South Alabama', location: 'Mobile, AL', away: true },
    { date: 'Apr 3-5', opponent: 'Arkansas', location: 'Fayetteville, AR', away: true },
    { date: 'Apr 17-19', opponent: 'Florida', location: 'Gainesville, FL', away: true },
    { date: 'Apr 22', opponent: 'Troy', location: 'Troy, AL', away: true },
    { date: 'Apr 30-May 2', opponent: 'LSU', location: 'Baton Rouge, LA', away: true },
  ],
  Gymnastics: [
    { date: 'Jan 16', opponent: 'Arkansas', location: 'Fayetteville, AR', away: true },
    { date: 'Feb 13', opponent: 'LSU', location: 'Baton Rouge, LA', away: true },
    { date: 'Feb 27', opponent: 'Oklahoma', location: 'Norman, OK', away: true },
    { date: 'Mar 8', opponent: 'Elevate the Stage', location: 'Huntsville, AL', away: true },
  ],
  Track: [
    { date: 'Jan 9', opponent: 'Blazer Invitational', location: 'Birmingham, AL', away: true },
    { date: 'Jan 30-31', opponent: 'Bob Pollock Inv.', location: 'Clemson, SC', away: true },
    { date: 'Mar 20-21', opponent: 'Yellow Jacket Invite', location: 'Atlanta, GA', away: true },
    { date: 'Mar 27-28', opponent: 'Pepsi Florida Relays', location: 'Gainesville, FL', away: true },
  ],
};

function buildScheduleSection(sport, games) {
  const rows = games.map(g => `
    <tr>
      <td style="padding:8px 12px;color:rgba(255,255,255,0.5);font-size:12px;border-bottom:1px solid rgba(255,255,255,0.03);width:90px;">${g.date}</td>
      <td style="padding:8px 12px;color:#fff;font-size:13px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.03);">${g.away ? '@ ' : ''}${g.opponent}</td>
      <td style="padding:8px 12px;color:${g.away ? '#F26522' : 'rgba(255,255,255,0.4)'};font-size:12px;border-bottom:1px solid rgba(255,255,255,0.03);text-align:right;">${g.location}</td>
    </tr>
  `).join('');

  return `
    <div style="margin-bottom:24px;">
      <div style="background:rgba(242,101,34,0.1);border-radius:8px 8px 0 0;padding:10px 16px;border-left:3px solid #F26522;">
        <h3 style="color:#F26522;font-size:14px;font-weight:700;margin:0;text-transform:uppercase;letter-spacing:1px;">${sport}</h3>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,0,0,0.15);border-radius:0 0 8px 8px;">
        ${rows}
      </table>
    </div>
  `;
}

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.RESEND_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;

  // Get subscribers
  const subRes = await fetch(`${SUPABASE_URL}/rest/v1/subscribers?select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const subscribers = await subRes.json();

  let totalSent = 0;

  for (const sub of subscribers) {
    const selectedSports = (sub.sports && sub.sports.length > 0) ? sub.sports : Object.keys(FULL_SCHEDULE);

    // Build schedule sections for their selected sports
    let scheduleSections = '';
    for (const sport of selectedSports) {
      if (FULL_SCHEDULE[sport]) {
        scheduleSections += buildScheduleSection(sport, FULL_SCHEDULE[sport]);
      }
    }

    if (!scheduleSections) continue;

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#020e1f;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020e1f;">
<tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td style="background:linear-gradient(135deg,#03244d 0%,#0a3a6b 50%,rgba(242,101,34,0.08) 100%);padding:44px 36px;border-radius:14px 14px 0 0;text-align:center;">
  <div style="width:56px;height:56px;background:#F26522;border-radius:50%;display:inline-block;text-align:center;line-height:56px;margin-bottom:18px;">
    <span style="color:#fff;font-weight:800;font-size:20px;">AB</span>
  </div>
  <p style="color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px;">2026 SEASON</p>
  <h1 style="color:#fff;font-size:28px;margin:0 0 6px;font-weight:800;">Your Auburn Away Game Guide</h1>
  <p style="color:#F26522;font-size:15px;margin:0;font-weight:600;">Wherever Auburn goes, we go.</p>
</td></tr>

<tr><td style="background:#071e3d;padding:32px 36px;">
  <p style="color:rgba(255,255,255,0.65);font-size:14px;line-height:1.7;margin:0 0 8px;">
    War Eagle! Here's your complete 2026 away game schedule. Before each of these games, we'll email you Auburn-owned businesses near that city so you can support the Auburn family on the road.
  </p>
  <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 28px;">
    <span style="color:#F26522;">&#9679;</span> Orange = away games where we'll send you business picks
  </p>

  ${scheduleSections}

  <div style="background:rgba(242,101,34,0.08);border-radius:10px;padding:20px;text-align:center;margin-top:8px;">
    <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 12px;">Want to browse Auburn businesses now?</p>
    <a href="https://buyauburn.com/directory.html" style="display:inline-block;background:#F26522;color:#fff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:13px;text-decoration:none;">Browse the Directory →</a>
  </div>
</td></tr>

<tr><td style="background:#03244d;padding:24px 36px;text-align:center;border-top:2px solid #F26522;border-radius:0 0 14px 14px;">
  <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0 0 4px;">Auburn Business Network — Wherever Auburn Goes, We Go</p>
  <p style="color:rgba(255,255,255,0.2);font-size:10px;margin:0;">buyauburn.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Auburn Business Network <noreply@buyauburn.com>',
          to: [sub.email],
          subject: '🏈 Your 2026 Auburn Away Game Guide — Buy Auburn',
          html: html
        })
      });
      totalSent++;
    } catch (err) {
      console.error(`Failed to send to ${sub.email}:`, err);
    }
  }

  return res.status(200).json({ message: `Season start email sent to ${totalSent} subscribers` });
}
