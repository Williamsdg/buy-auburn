/* ============================================
   Auburn Business Network - Mock Data
   Replace with Supabase queries later
   ============================================ */

const BUSINESSES = [
  {
    id: 1,
    name: "Tiger Construction Co.",
    industry: "Construction",
    location: "Auburn, AL",
    state: "AL",
    city: "Auburn",
    bio: "Full-service general contractor specializing in residential and commercial builds across East Alabama. Auburn grad '04, building quality structures with integrity since 2008.",
    contact: "info@tigerconstructionco.com",
    phone: "(334) 555-0102",
    website: "https://tigerconstructionco.com",
    owner: "Matt Henderson",
    status: "active"
  },
  {
    id: 2,
    name: "Plains Wealth Advisors",
    industry: "Financial Services",
    location: "Birmingham, AL",
    state: "AL",
    city: "Birmingham",
    bio: "Comprehensive financial planning and investment management for Auburn families. We believe in the same values on and off the Plains — hard work, loyalty, and doing things right.",
    contact: "hello@plainswealthadvisors.com",
    phone: "(205) 555-0198",
    website: "https://plainswealthadvisors.com",
    owner: "Sarah Mitchell",
    status: "active"
  },
  {
    id: 3,
    name: "War Eagle Brewing",
    industry: "Food & Beverage",
    location: "Nashville, TN",
    state: "TN",
    city: "Nashville",
    bio: "Craft brewery with an Auburn soul. Serving award-winning beers inspired by our time on the Plains. Stop by on game days for the best Auburn watch party in Nashville.",
    contact: "cheers@wareaglebrewing.com",
    phone: "(615) 555-0147",
    website: "https://wareaglebrewing.com",
    owner: "Jake Sullivan",
    status: "active"
  },
  {
    id: 4,
    name: "Loveliest Village Realty",
    industry: "Real Estate",
    location: "Auburn, AL",
    state: "AL",
    city: "Auburn",
    bio: "Helping Auburn families find their forever homes since 2010. Whether you're moving to the Plains or investing in Auburn real estate, we know this community inside and out.",
    contact: "homes@loveliestvillagerealty.com",
    phone: "(334) 555-0233",
    website: "https://loveliestvillagerealty.com",
    owner: "Lisa Parker",
    status: "active"
  },
  {
    id: 5,
    name: "Toomer's Tech Solutions",
    industry: "Technology",
    location: "Atlanta, GA",
    state: "GA",
    city: "Atlanta",
    bio: "IT consulting and managed services for small to mid-size businesses. Auburn engineering grads building tech solutions that actually work. We roll your tech problems, guaranteed.",
    contact: "support@toomerstech.com",
    phone: "(404) 555-0311",
    website: "https://toomerstech.com",
    owner: "Chris Dawson",
    status: "active"
  },
  {
    id: 6,
    name: "Plainsman Legal Group",
    industry: "Legal",
    location: "Montgomery, AL",
    state: "AL",
    city: "Montgomery",
    bio: "Full-service law firm handling business law, estate planning, and real estate closings. Two Auburn Law alumni dedicated to serving the Auburn family with trusted legal counsel.",
    contact: "info@plainsmanlaw.com",
    phone: "(334) 555-0409",
    website: "https://plainsmanlaw.com",
    owner: "David & Rachel Turner",
    status: "active"
  },
  {
    id: 7,
    name: "Samford's Southern Kitchen",
    industry: "Food & Beverage",
    location: "Birmingham, AL",
    state: "AL",
    city: "Birmingham",
    bio: "Southern comfort food at its finest. From fried green tomatoes to our famous smoked brisket, every plate is made with love and a whole lot of Auburn pride.",
    contact: "eat@samfordskitchen.com",
    phone: "(205) 555-0512",
    website: "https://samfordskitchen.com",
    owner: "Marcus Williams",
    status: "active"
  },
  {
    id: 8,
    name: "Jordan-Hare Hardware",
    industry: "Home Services",
    location: "Opelika, AL",
    state: "AL",
    city: "Opelika",
    bio: "Your locally-owned hardware store serving Lee County. From plumbing supplies to power tools, we've got everything you need. Auburn family helping Auburn families.",
    contact: "shop@jordanharehardware.com",
    phone: "(334) 555-0621",
    website: "https://jordanharehardware.com",
    owner: "Tom Bradley",
    status: "active"
  },
  {
    id: 9,
    name: "Eagle Eye Photography",
    industry: "Creative Services",
    location: "Atlanta, GA",
    state: "GA",
    city: "Atlanta",
    bio: "Professional photography for weddings, events, and corporate clients. Auburn '12 grad with a passion for capturing life's biggest moments. War Eagle in every frame.",
    contact: "book@eagleeyephoto.com",
    phone: "(404) 555-0733",
    website: "https://eagleeyephoto.com",
    owner: "Amanda Foster",
    status: "active"
  },
  {
    id: 10,
    name: "Aubie's Auto Shop",
    industry: "Automotive",
    location: "Auburn, AL",
    state: "AL",
    city: "Auburn",
    bio: "Honest, reliable auto repair and maintenance. Serving the Auburn-Opelika community for over 15 years. We treat every customer's car like it's our own.",
    contact: "service@aubiesauto.com",
    phone: "(334) 555-0844",
    website: "https://aubiesauto.com",
    owner: "Kevin Rhodes",
    status: "active"
  },
  {
    id: 11,
    name: "The Plains Dental",
    industry: "Healthcare",
    location: "Auburn, AL",
    state: "AL",
    city: "Auburn",
    bio: "Modern family dentistry with a gentle touch. Dr. Collins is a proud Auburn grad providing comprehensive dental care to the Auburn family and beyond.",
    contact: "smile@theplainsdentalal.com",
    phone: "(334) 555-0955",
    website: "https://theplainsdentalal.com",
    owner: "Dr. Amy Collins",
    status: "active"
  },
  {
    id: 12,
    name: "Orange & Blue Marketing",
    industry: "Marketing",
    location: "Dallas, TX",
    state: "TX",
    city: "Dallas",
    bio: "Digital marketing agency specializing in social media, SEO, and brand strategy. Auburn grads helping businesses grow their online presence. War Eagle from Big D!",
    contact: "grow@orangebluemarketing.com",
    phone: "(214) 555-1022",
    website: "https://orangebluemarketing.com",
    owner: "Ryan & Kelly Price",
    status: "active"
  },
  {
    id: 13,
    name: "Tiger Fitness",
    industry: "Health & Fitness",
    location: "Nashville, TN",
    state: "TN",
    city: "Nashville",
    bio: "Boutique gym offering personal training, group classes, and nutrition coaching. Built by Auburn athletes who believe in pushing limits and supporting each other.",
    contact: "train@tigerfitnesstn.com",
    phone: "(615) 555-1133",
    website: "https://tigerfitnesstn.com",
    owner: "Derek Mason",
    status: "active"
  },
  {
    id: 14,
    name: "Heisman Accounting",
    industry: "Financial Services",
    location: "Houston, TX",
    state: "TX",
    city: "Houston",
    bio: "CPA firm providing tax preparation, bookkeeping, and business advisory services. Auburn accounting grad helping individuals and small businesses win with their finances.",
    contact: "taxes@heismanaccounting.com",
    phone: "(713) 555-1244",
    website: "https://heismanaccounting.com",
    owner: "Jennifer Owens",
    status: "active"
  },
  {
    id: 15,
    name: "Plains Landscaping",
    industry: "Home Services",
    location: "Montgomery, AL",
    state: "AL",
    city: "Montgomery",
    bio: "Professional landscaping, lawn care, and outdoor living design. We bring the beauty of the Auburn campus to your backyard. Serving the River Region since 2015.",
    contact: "yards@plainslandscaping.com",
    phone: "(334) 555-1355",
    website: "https://plainslandscaping.com",
    owner: "Brian Wells",
    status: "active"
  },
  {
    id: 16,
    name: "War Eagle Insurance",
    industry: "Insurance",
    location: "Jacksonville, FL",
    state: "FL",
    city: "Jacksonville",
    bio: "Independent insurance agency offering home, auto, life, and business coverage. Auburn '07 grad providing personalized insurance solutions for the Auburn family in North Florida.",
    contact: "protect@wareaglesinsurance.com",
    phone: "(904) 555-1466",
    website: "https://wareagleinsurance.com",
    owner: "Patrick Simmons",
    status: "active"
  }
];

const SAMPLE_APPLICATIONS = [
  {
    id: 101,
    businessName: "Southern Paws Veterinary",
    ownerName: "Dr. Megan Cruz",
    email: "megan@southernpawsvet.com",
    phone: "(334) 555-2001",
    industry: "Healthcare",
    location: "Opelika, AL",
    website: "https://southernpawsvet.com",
    bio: "Compassionate veterinary care from a proud Auburn Vet Med grad. Treating your pets like family since 2018.",
    auburnConnection: "DVM, Auburn College of Veterinary Medicine, 2016",
    submittedDate: "2026-03-20",
    status: "pending"
  },
  {
    id: 102,
    businessName: "Tiger Tailgate Catering",
    ownerName: "Marcus Brown",
    email: "marcus@tigertailgate.com",
    phone: "(205) 555-2002",
    industry: "Food & Beverage",
    location: "Birmingham, AL",
    website: "https://tigertailgatecatering.com",
    bio: "BBQ and catering service born from Auburn tailgate traditions. Now serving corporate events, weddings, and private parties.",
    auburnConnection: "B.S. Business Administration, Auburn University, 2011",
    submittedDate: "2026-03-18",
    status: "pending"
  },
  {
    id: 103,
    businessName: "Iron Bowl Contracting",
    ownerName: "Steve Harmon",
    email: "steve@ironbowlcontracting.com",
    phone: "(334) 555-2003",
    industry: "Construction",
    location: "Auburn, AL",
    website: "",
    bio: "General contracting and home renovation services. Auburn Building Science grad bringing quality craftsmanship to every project.",
    auburnConnection: "B.S. Building Science, Auburn University, 2009",
    submittedDate: "2026-03-15",
    status: "pending"
  }
];

// Extract unique values for filters
function getLocations() {
  const locations = [...new Set(BUSINESSES.map(b => b.location))].sort();
  return locations;
}

function getStates() {
  const states = [...new Set(BUSINESSES.map(b => b.state))].sort();
  return states;
}

function getIndustries() {
  const industries = [...new Set(BUSINESSES.map(b => b.industry))].sort();
  return industries;
}

function getCities() {
  const cities = [...new Set(BUSINESSES.map(b => b.city))].sort();
  return cities;
}

// Get random featured businesses
function getFeaturedBusinesses(count = 4) {
  const shuffled = [...BUSINESSES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Search and filter businesses
function searchBusinesses({ query = '', location = '', industry = '' } = {}) {
  return BUSINESSES.filter(b => {
    const matchesQuery = !query ||
      b.name.toLowerCase().includes(query.toLowerCase()) ||
      b.bio.toLowerCase().includes(query.toLowerCase()) ||
      b.owner.toLowerCase().includes(query.toLowerCase());

    const matchesLocation = !location ||
      b.location === location ||
      b.state === location ||
      b.city === location;

    const matchesIndustry = !industry || b.industry === industry;

    return matchesQuery && matchesLocation && matchesIndustry;
  });
}

// Get single business by ID
function getBusinessById(id) {
  return BUSINESSES.find(b => b.id === parseInt(id));
}
