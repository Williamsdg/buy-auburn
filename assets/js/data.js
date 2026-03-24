/* ============================================
   Auburn Business Network - Data Layer
   Fetches from Supabase, falls back to cache
   ============================================ */

// Cache for loaded data
let _businessesCache = [];
let _industriesCache = [];

// Fetch all active businesses from Supabase
async function loadBusinesses() {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('name');

    if (error) throw error;
    _businessesCache = data || [];
  } catch (err) {
    console.error('Error loading businesses:', err);
    _businessesCache = [];
  }
  return _businessesCache;
}

// Get unique industries from loaded businesses
function getIndustries() {
  const industries = [...new Set(_businessesCache.map(b => b.industry))].sort();
  return industries;
}

// Get random featured businesses
function getFeaturedBusinesses(count = 4) {
  const shuffled = [..._businessesCache].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Search and filter businesses
function searchBusinesses({ query = '', industry = '' } = {}) {
  return _businessesCache.filter(b => {
    const matchesQuery = !query ||
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.bio.toLowerCase().includes(query.toLowerCase()) ||
      b.owner.toLowerCase().includes(query.toLowerCase()) ||
      b.industry.toLowerCase().includes(query.toLowerCase());

    const matchesIndustry = !industry || b.industry === industry;

    return matchesQuery && matchesIndustry;
  });
}

// Get single business by ID
function getBusinessById(id) {
  return _businessesCache.find(b => b.id === id);
}

// Submit a new application
async function submitApplication(formData) {
  const { data, error } = await supabase
    .from('applications')
    .insert([{
      business_name: formData.businessName,
      industry: formData.industry,
      address: formData.address,
      website: formData.website || null,
      bio: formData.bio,
      owner_name: formData.ownerName,
      email: formData.email,
      phone: formData.phone,
      auburn_connection: formData.auburnConnection
    }]);

  if (error) throw error;
  return data;
}

// ---- Admin functions (require auth) ----

// Sign in admin
async function adminSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

// Sign out admin
async function adminSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current session
async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Fetch all applications (admin only)
async function loadApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Fetch ALL businesses including unpaid (admin only)
async function loadAllBusinesses() {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

// Update application status
async function updateApplicationStatus(id, status) {
  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
  return data;
}

// Approve application and create business listing
async function approveAndCreateBusiness(application) {
  // Update application status
  await updateApplicationStatus(application.id, 'approved');

  // Create business listing (unpaid until they pay)
  const { data, error } = await supabase
    .from('businesses')
    .insert([{
      name: application.business_name,
      industry: application.industry,
      address: application.address,
      location: 'Auburn, AL',
      website: application.website,
      bio: application.bio,
      owner: application.owner_name,
      contact: application.email,
      phone: application.phone,
      status: 'active',
      payment_status: 'unpaid',
      application_id: application.id
    }]);

  if (error) throw error;
  return data;
}

// Update business payment status
async function updateBusinessPayment(id, paymentStatus) {
  const { data, error } = await supabase
    .from('businesses')
    .update({ payment_status: paymentStatus })
    .eq('id', id);

  if (error) throw error;
  return data;
}
