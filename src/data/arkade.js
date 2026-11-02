// Arkade brand content. Figures marked (brochure) come from the approved
// "Arkade_Thane Opp Doc" brochure; values / vision / ISO from arkade.in.
const img = (name) => `${process.env.PUBLIC_URL}/images/${name}.webp`;

export const brand = {
  name: "ARKADE",
  tagline: "Welcome Home to Excellence",
  line: "Family First",
  logo: { src: `${process.env.PUBLIC_URL}/images/arkade-logo.png`, alt: "Arkade" },
  familyLogo: { src: `${process.env.PUBLIC_URL}/images/arkade-family-logo.png`, alt: "Arkade" },
  address: "Arkade House, Next to Children's Academy, Ashok Nagar, Kandivali (E), Mumbai 400 101",
  rera: "[RERA DETAILS TO BE PROVIDED]",
  disclaimer:
    "The images, layouts, and other details on this page are indicative and for representational purposes only. The developers reserve the right to make changes or improvements as required. Actual project features may differ from those depicted. This page does not constitute an offer or contract.",
};

export const nav = [
  { id: "about-us", label: "About Us" },
  { id: "values", label: "values" },
  { id: "portfolio", label: "Portfolio" },
  { id: "voices", label: "Voices" },
  { id: "contact-us", label: "Contact Us" },
];

export const hero = {
  eyebrow: "Four decades · Mumbai",
  title: ["Homes built on", "Family First."],
  text: "For more than forty years, Arkade has created homes across Mumbai around one enduring belief — that a home is where a family’s story begins.",
  // Drop the client's happy-family photo at public/images/hero-family.webp (portrait ~4:5, 1200px+ wide).
  // Until that file exists, the previous image is used as a fallback.
  image: img("hero-family"),
  imageAlt: "A happy family together at home",
  fallback: img("arkade-vistas"),
  back: img("mumbai-skyline"),
  backAlt: "Mumbai skyline along the waterfront in warm haze",
};

export const philosophy = {
  eyebrow: "Our philosophy",
  lines: [
    "For more than forty years, Arkade has created homes around one enduring belief.",
    "Family First.",
    "Building quality homes is about passion more than profession.",
    "That understanding has guided Arkade across Mumbai, through changing neighbourhoods, evolving aspirations and generations of families.",
    "Trust, quality, ethics and transparency are not what we promise. They are how we build.",
  ],
  vision: {
    label: "Our vision",
    text: "Adding value to people’s lives by creating realty masterpieces.",
  },
  mission: {
    label: "Our mission",
    text: "Deliver exemplary experience with our products, place, people & processes.",
  },
  founders: "Built by Mr. Mangilal Jain and Mr. Amit Jain",
  pillars: ["Trust", "Quality", "Ethics", "Transparency"],
  image: img("arkade-nest"),
  alt: "An Arkade residence rising above its greens — artistic impression",
};

export const legacy = {
  eyebrow: "About Us",
  title: ["Four decades", "of shaping Mumbai."],
  image: img("legacy-img"),
  alt: "Mumbai skyline along the waterfront in warm haze",
  stats: [
    { value: "40+", label: "Years of crafting excellence" },
    { value: "5.8+", label: "Million sq.ft. developed", big: true },
    { value: "3+", label: "Million sq.ft. under development" },
    { value: "5,800+", label: "Happy families" },
  ],
  pipeline: [
    { key: "done", value: 33, label: "Completed", status: "Delivered", note: "Homes delivered and lived in" },
    { key: "live", value: 7, label: "Ongoing", status: "Under construction", note: "Rising across Mumbai today" },
    { key: "next", value: 10, plus: true, label: "Upcoming", status: "Launching soon", note: "Next launches — details unveiled soon" },
  ],
  listed: { year: "2024", text: "Listed on BSE and NSE" },
  certs: ["ISO 9001:2015", "ISO 45001:2018"],
  // Trust badges shown on the plate over the legacy image
  badges: [
    { seal: "exchange", pre: "Listed on", title: "BSE and NSE", post: "" },
    { seal: "iso", pre: "ISO", title: "9001:2015", post: "Certified" },
    { seal: "iso", pre: "ISO", title: "45001:2018", post: "Certified" },
  ],
};

export const principles = {
  eyebrow: "The Arkade way",
  title: ["Principles we", "build by."],
  items: [
    {
      num: "01",
      title: "A promise is a promise",
      text: "Commitments on products and transactions are treated as unwavering — and kept.",
      proof: "“They even gave us possession before time!”",
      who: "Mr. Shreyas Suralkar · Arkade Pearl",
      image: img("arkade-pearl"),
      alt: "Arkade Pearl, Vile Parle East",
    },
    {
      num: "02",
      title: "Quality & transparency",
      text: "Certified processes, honest dealings and an open line from the first brick to the last handover.",
      proof: "“The builder himself is sending those updates to us.”",
      who: "Mrs. Ketaki Phadke · Arkade Aspire",
      image: img("arkade-sapphire"),
      alt: "Arkade Sapphire, Santacruz West",
    },
    {
      num: "03",
      title: "Human touch",
      text: "Listening to, respecting and serving people — homes planned around how a whole family lives.",
      proof: "“Wonderful for our senior parents too.”",
      who: "Mr. Patel · Arkade Rare",
      image: img("arkade-rare"),
      alt: "Arkade Rare, Bhandup West",
    },
    {
      num: "04",
      title: "Creative thinking",
      text: "Innovation across every project — from thoughtful layouts to living, landscaped decks.",
      proof: "“I love how thoughtfully everything is planned.”",
      who: "Mrs. Dholakiya · Arkade Aura",
      image: img("arkade-evoke"),
      alt: "Arkade Evoke, Goregaon West",
    },
  ],
};

export const homes = {
  eyebrow: "Portfolio",
  title: ["Landmark homes", "*across Mumbai.*"],
  text: "From the island city to the suburbs, Arkade has built neighbourhood by neighbourhood — and stayed for the families who live in them.",
  note: "Artistic impression",
  items: [
    { name: "Arkade Pearl", place: "Vile Parle East", area: "Vile Parle", region: "Western Suburbs", image: img("arkade-pearl") },
    { name: "Arkade Sapphire", place: "Santacruz West", area: "Santacruz", region: "Western Suburbs", image: img("arkade-sapphire") },
    { name: "Arkade Evoke", place: "Goregaon West", area: "Goregaon", region: "Western Suburbs", image: img("arkade-evoke") },
    { name: "Arkade Vistas", place: "Goregaon East", area: "Goregaon", region: "Western Suburbs", image: img("arkade-vistas") },
    { name: "Arkade Nest", place: "Mulund West", area: "Mulund", region: "Central Suburbs", image: img("arkade-nest") },
    { name: "Arkade Rare", place: "Bhandup West", area: "Bhandup", region: "Central Suburbs", image: img("arkade-rare") },
    { name: "Arkade Views", place: "Goregaon East", area: "Goregaon", region: "Western Suburbs", image: img("arkade-views") },
  ],
};

// Neighbourhood index for the merged Homes section (project cards + city footprint).
export const footprint = {
  regions: [
    // { region: "South Mumbai", places: ["Carmichael Road", "Tardeo", "Mazgaon"] },
    { region: "Western Suburbs", places: ["Virar", "Vasai", "Mira Road", "Dahisar", "Borivali", "Kandivali", "Malad", "Goregaon", "Andheri", "Vile Parle", "Santacruz"] },
    { region: "Central Suburbs", places: ["Mulund", "Bhandup", "Kanjurmarg"] },
    // { region: "Central Suburbs", places: ["Thane"] },
  ],
};

export const values = {
  eyebrow: "What we stand for",
  title: ["Eight values,", "one standard."],
  items: [
    { title: "We live our vision", text: "Pursuing masterpieces in our chosen segments and adding value to people’s lives." },
    { title: "A promise is a promise", text: "Treating commitments on products and transactions as unwavering." },
    { title: "A healthy & happy organisation", text: "Sustaining a financially healthy company where every stakeholder finds trust and satisfaction." },
    { title: "Creative thinking", text: "Encouraging innovation across the business." },
    { title: "Learning & improvement", text: "Building a learning culture and a growth mindset." },
    { title: "Quality and transparency", text: "Treating quality of work and transparency in dealings as guiding principles." },
    { title: "Doing it now", text: "Working with urgency, and protecting delivery speed beyond external constraints." },
    { title: "Human touch", text: "Listening to, respecting, and serving people." },
  ],
};

export const testimonials = [
  { project: "Arkade Pearl", name: "Mr. Shreyas Suralkar", quote: "We had a very good experience with Arkade.Our property was redeveloped by Arkade, and they did a fantastic job. They even gave us possession before time! Based on all the information we have, the construction quality is truly top-notch. Highly recommended." },
  { project: "Arkade Nest", name: "Mr. Hiren Salian", quote: "We needed a good society in a good location where our place of worship and upcoming connectivity are nearby. The developer is of a good standard and maintains high quality, which helped us make our decision." },
  { project: "Arkade Rare", name: "Mr. Patel", quote: "We couldn't find a project as good as this one, both in terms of locality and construction. There are great amenities to keep the kids busy, and it's wonderful for our senior parents too. We are getting everything in one place." },
  { project: "Arkade Aspire", name: "Mr & Mrs. Mohidekar", quote: "No developer in Mumbai usually gives you early possession; it’s a huge challenge in this market. Arkade not only achieved this, but they also maintained complete transparency throughout. Everything promised in the miniature model—from the amenities to the finer details—was faithfully realized in the actual building" },
  { project: "Arkade Aura", name: "Mrs. Dholakiya", quote: "I love how thoughtfully everything is planned. The overall layout is fantastic, and we especially love what they’ve done with the EcoDeck and the gym—really, all of it! We are super excited to start this next chapter of our lives here. All the best to everyone and congratulations!" },
];

// "Thane — coming soon" reveal. Copy and figures are from the Thane opportunity brochure.
export const thaneSoon = {
  ghost: "Thane",
  intro: { eyebrow: "The next chapter", lines: ["The shape of", "*Thane to come.*"], hint: "Scroll to unveil" },
  eyebrow: "Thane",
  title: ["Discover Arkade.", "*A Vision for Thane.*"],
  text:
    "With decades of experience in Mumbai's real estate landscape, Arkade brings thoughtful design, quality craftsmanship and a commitment to creating homes that enrich everyday living. In Thane, we see an opportunity to shape spaces that reflect the city's evolving aspirations.",
  cta: "Know more",
  stats: [
    { value: "₹10,000 – 13,850", label: "Average price per sq.ft.", note: "2022 – 2026 · indicative" },
    { value: "3.5% – 4.5%", label: "Expanding rental yields", note: "Corporate professionals moving in" },
    { value: "06", label: "Infrastructure projects", note: "Under construction, proposed or planned" },
  ],
  panel: { label: "The opportunity", title: "When a city changes shape, value follows." },
  source: "Square Yards · Housing.com · CRE Matrix · PropertyWala — indicative values",
  image: img("thane-coming-soon"),
  alt: "Aerial view of Thane's high-rise skyline with hills on the horizon at golden hour",
};

export const enquire = {
  eyebrow: "Begin your story",
  title: ["Welcome home to", "excellence."],
  text: "Share your details and the Arkade team will reach out with more about our residences and what we are building next.",
  consent: "I agree to be contacted by Arkade and its authorised representatives by call, SMS, email or WhatsApp regarding this enquiry.",
  image: img("arkade-sapphire"),
  alt: "Arkade Sapphire, Santacruz West",
};
