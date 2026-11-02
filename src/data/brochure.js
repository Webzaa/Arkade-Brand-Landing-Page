// All content sourced verbatim from "Arkade_Thane Opp Doc_Gold_A4_R2_CTC.pdf".
const img = (name) => `${process.env.PUBLIC_URL}/images/${name}.webp`;

export const brand = {
  name: "ARKADE",
  line: "FAMILY FIRST",
  campaign: "The shape of Thane to come.",
  address:
    "Arkade House, Next to Children's Academy, Ashok Nagar, Kandivali (E), Mumbai 400 101",
  disclaimer:
    "The images, layouts, and other details in this advertisement are indicative and for representational purposes only. The developers reserve the right to make changes or improvements as required. Actual project features may differ from those depicted. This advertisement does not constitute an offer or contract.",
  rera: "[RERA DETAILS TO BE PROVIDED]",
  privacy: "[PRIVACY POLICY LINK TO BE PROVIDED]",
  brandLogo : {
    src : `${process.env.PUBLIC_URL}/images/arkade-logo.png`,
    alt: "Arkade", 
  }
};

export const chapters = [
  { id: "brand" , label: "Brand", long: "Arkade" },
  { id: "legacy", label: "Legacy", long: "Arkade Legacy" },
  { id: "thane", label: "Thane", long: "About Thane" },
  { id: "locations", label: "Locations", long: "Arkade Locations" },
  { id: "testimonials", label: "Testimonials", long: "Testimonials" },
];

export const hero = {
  lines: ["The shape of", "Thane to come."],
  image: img("hero-forest"),
  alt: "Misty forested hills under a soft golden sky",
  cta: "Explore Thane",
};

export const thaneStory = {
  eyebrow: "Thane",
  title: ["A city never stops", "taking shape."],
  image: img("thane-aerial"),
  alt: "Aerial view of Thane's high-rise skyline with hills on the horizon at sunrise",
  lines: [
    "It expands beyond old boundaries.",
    "Connects with new centres.",
    "Draws new people, new businesses and new aspirations towards it.",
    "Places once considered distant become desirable.",
    "Neighbourhoods once chosen for value become valued for everything they offer.",
    "And gradually, the city becomes something more than it was before.",
    "Thane has already undergone one remarkable transformation.",
    "From an industrial suburb to a residential alternative.",
    "From an alternative to a complete, self-sustaining urban centre.",
    "Today, another transformation is underway.",
    "New infrastructure is changing its relationship with the wider MMR.",
    "New aspirations are changing what families expect from an address.",
    "And new residential centres are beginning to define where Thane goes next.",
  ],
};

export const cityOwnRight = {
  title: "A city in its own right",
  image: img("city-own-right"),
  alt: "Residential towers set among lakes and greenery at golden hour",
  lines: [
    "Thane no longer needs to be described in relation to Mumbai.",
    "It has developed an ecosystem of its own, with established schools, leading healthcare institutions, destination retail, recreation, commercial activity and mature residential communities.",
    "Families are no longer moving here simply for more space.",
    "They are moving for more from life.",
  ],
};

export const reasons = [
  {
    num: "01",
    title: "A natural advantage",
    image: img("natural-advantage"),
    alt: "Densely forested green hills under a clear sky",
    lines: [
      "Few mature urban centres remain surrounded by natural assets of this scale.",
      "The Yeoor Hills and the forests of Sanjay Gandhi National Park give Thane something development alone can never create.",
      "A greener horizon. Cleaner surroundings.",
      "And the rare possibility of living close to a thriving city without feeling consumed by it.",
    ],
  },
  {
    num: "02",
    title: "A new measure of distance",
    image: img("measure-distance"),
    alt: "Aerial view of a looping flyover and bridge over water surrounded by greenery",
    lines: [
      "The future value of a location will not be determined only by how many kilometres separate it from the city.",
      "It will be determined by how many minutes.",
      "New highways, metro corridors, tunnels, bridges and regional connections are steadily changing the way Thane relates to Mumbai, Navi Mumbai and the western suburbs.",
      "The location remains where it is.",
      "The rest of the region moves closer.",
    ],
  },
  {
    num: "03",
    eyebrow: "Kasarvadavali",
    title: "Where Thane takes its next shape.",
    image: img("kasarvadavali-aerial"),
    alt: "Aerial view of a winding creek, mangroves and the city skyline",
    lines: [
      "Every successful city creates new centres for itself.",
      "Centres shaped not merely by available land, but by the way people will live, travel and work in the years ahead.",
      "As established parts of Thane become denser and large premium land parcels grow increasingly scarce, the city's residential centre of gravity is moving towards Kasarvadavali.",
      "Strategically positioned on Ghodbunder Road, it brings together the advantages of an established neighbourhood and the possibilities of an emerging premium destination.",
      "Schools, hospitals, shopping, dining and recreation are already part of its immediate ecosystem.",
      "The Yeoor Hills and Sanjay Gandhi National Park give it a natural setting that cannot be replicated.",
      "And a new generation of infrastructure is preparing to connect it more closely with the rest of the region.",
    ],
  },
];

export const axis = {
  eyebrow: "Kasarvadavali",
  title: ["The next premium", "residential axis"],
  image: img("residential-axis"),
  alt: "A couple walking past a café and mall with a metro line, hospital and green hills behind",
  lines: [
    "Kasarvadavali is not an isolated location waiting for the city to reach it.",
    "The city is already here.",
    "What is arriving now is a more powerful level of connectivity, visibility and demand.",
    "As major mobility projects progress and more professionals and families look towards Thane, Kasarvadavali is positioned to become one of the most significant residential destinations along the Ghodbunder Road corridor.",
  ],
};

export const ecosystem = {
  title: ["An established", "ecosystem"],
  image: img("ecosystem"),
  alt: "A street with a café, school, wellness store and healthcare building",
  note: "Distances and locations are indicative.",
  categories: [
    {
      id: "education",
      label: "Education",
      icon: "education",
      summary: "Schools and institutes already part of the neighbourhood.",
      items: [
        "EuroSchool",
        "A. P. Shah Institute of Technology",
        "New Horizon Institute of Technology and Management",
        "Gyan Ganga Educational Institutions",
      ],
      spot: { x: 46, y: 46 },
    },
    {
      id: "healthcare",
      label: "Healthcare",
      icon: "healthcare",
      summary: "Leading healthcare institutions close at hand.",
      items: [
        "TMC Hospital",
        "Fortune Plus ICU and Multispeciality Hospital",
        "Kevalya Hospital",
        "Noble Hospital",
      ],
      spot: { x: 90, y: 45 },
    },
    {
      id: "retail",
      label: "Retail and recreation",
      icon: "retail",
      summary: "Destination retail, dining and everyday conveniences.",
      items: [
        "The Walk",
        "High Street",
        "DMart",
        "Big Centre Mall",
        "Suraj Water Park",
        "Restaurants, cafés and everyday conveniences",
      ],
      spot: { x: 27, y: 53 },
    },
    {
      id: "nature",
      label: "Nature",
      icon: "nature",
      summary: "A natural setting that cannot be replicated.",
      items: ["Sanjay Gandhi National Park", "Yeoor Hills", "Expansive green surroundings"],
      spot: { x: 70, y: 60 },
    },
  ],
};

export const mapSection = {
  eyebrow: "Infrastructure",
  title: ["The map is", "being redrawn."],
  lines: [
    "Infrastructure does more than connect one place to another.",
    "It changes how a location is perceived.",
    "It changes how people experience distance.",
    "It changes where businesses grow, where families choose to live and where value begins to gather.",
    "Across Thane, a powerful network of metro corridors, tunnels, bridges and alternative transit routes is taking shape.",
    "Each project draws a different line across the map.",
    "Together, they reveal the future direction of the region.",
  ],
  source: "*Source: Google Maps. Map not to scale.",
  filters: [
    { id: "all", label: "All" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "retail", label: "Retail & leisure" },
    { id: "landmark", label: "Landmarks" },
    { id: "nature", label: "Nature" },
  ],
  // Positions traced from the brochure map (viewBox 1330 x 910)
  markers: [
    { name: ["AP Shah Institute", "of Technology"], cat: "education", x: 835, y: 88, lx: 30, ly: -6, anchor: "start" },
    { name: ["Big Centre", "Mall"], cat: "retail", x: 746, y: 124, lx: 0, ly: 40, anchor: "middle" },
    { name: ["Madhav", "Banquet Hall"], cat: "retail", x: 837, y: 157, lx: 30, ly: -6, anchor: "start" },
    { name: ["TMC Hospital"], cat: "healthcare", x: 639, y: 191, lx: -2, ly: 40, anchor: "middle" },
    { name: ["Fortune Plus ICU", "& MultiSpeciality", "Hospital"], cat: "healthcare", x: 861, y: 220, lx: 32, ly: -12, anchor: "start" },
    { name: ["MBC Park"], cat: "landmark", x: 770, y: 218, lx: 0, ly: 42, anchor: "middle" },
    { name: ["New Horizon Institute", "of Technology & Management"], cat: "education", x: 1175, y: 201, lx: -5, ly: 40, anchor: "middle" },
    { name: ["Grand Square", "Chowk"], cat: "landmark", x: 784, y: 353, lx: 0, ly: -52, anchor: "middle" },
    { name: ["Vijay Garden"], cat: "landmark", x: 1098, y: 369, lx: 0, ly: 30, anchor: "middle" },
    { name: ["Ranjeet Sports", "Ground"], cat: "landmark", x: 619, y: 374, lx: 0, ly: 40, anchor: "middle" },
    { name: ["Kevalya Hospital"], cat: "healthcare", x: 1070, y: 446, lx: -4, ly: 40, anchor: "middle" },
    { name: ["Gyan Ganga Education", "Trust's College"], cat: "education", x: 522, y: 459, lx: 0, ly: 40, anchor: "start" },
    { name: ["DMart"], cat: "retail", x: 892, y: 523, lx: -32, ly: 5, anchor: "end" },
    { name: ["Euro School Thane", "ICSE School"], cat: "education", x: 323, y: 541, lx: -12, ly: 40, anchor: "middle" },
    { name: ["Thane Noble", "Hospital"], cat: "healthcare", x: 906, y: 571, lx: -6, ly: 40, anchor: "middle" },
    { name: ["The Divine"], cat: "retail", x: 920, y: 647, lx: 0, ly: 42, anchor: "middle" },
    { name: ["Barbeque", "Nation"], cat: "retail", x: 1018, y: 761, lx: 26, ly: -4, anchor: "start" },
    { name: ["Suraj Water Park"], cat: "retail", x: 951, y: 828, lx: 0, ly: 42, anchor: "middle" },
    { name: ["Sanjay Gandhi", "National Park"], cat: "nature", x: 60, y: 656, lx: -4, ly: 44, anchor: "middle" },
  ],
  pin: { x: 717, y: 461 },
  roadLabels: [
    { text: "Vijay Vilas Rd.", x: 1218, y: 302, rotate: 14 },
    { text: "Waghbil Road", x: 1222, y: 560, rotate: -76 },
  ],
};

export const infrastructure = {
  title: ["Infrastructure", "moving forward"],
  intro: "Major mobility projects are progressing from plans on paper towards physical execution.",
  items: [
    {
      name: "Wadala-Kasarvadavali metro line",
      status: "Under construction",
      icon: "metro",
      text: "A major north-south metro corridor designed to connect Kasarvadavali with central Thane and Mumbai through an efficient mass-transit network.",
    },
    {
      name: "Thane-Borivali twin tunnel",
      status: "Under construction",
      icon: "tunnel",
      text: "A direct underground connection through Sanjay Gandhi National Park, designed to significantly reduce travel between Thane and the western suburbs.",
    },
    {
      name: "Thane-Bhiwandi-Kalyan metro line",
      status: "Proposed",
      icon: "metro2",
      text: "A future eastward connection intended to strengthen Thane's relationship with the rapidly developing Bhiwandi and Kalyan belt.",
    },
    {
      name: "Underground CST-Thane metro line",
      status: "Planned",
      icon: "underground",
      text: "A proposed high-speed transit corridor that could bring South Mumbai substantially closer to Thane.",
    },
    {
      name: "Two new bridges across Thane creek",
      status: "Proposed",
      icon: "bridge",
      text: "Additional cross-creek infrastructure intended to improve movement between Thane, Mumbai and Navi Mumbai.",
    },
    {
      name: "Kolshet-South Mumbai-Vasai waterway",
      status: "Planned",
      icon: "waterway",
      text: "An alternative regional mobility route connecting important residential and commercial destinations through water transport.",
    },
  ],
};

export const campaign = [
  { pre: "", word: "Six", post: "different routes.", image: img("six-routes"), alt: "Elevated metro train running past hills and towers at dusk" },
  { pre: "", word: "One", post: "clear direction.", image: img("one-direction"), alt: "Twin road tunnels entering a forested hill" },
  { pre: "A", word: "more", post: "connected Thane.", image: img("more-connected"), alt: "Rail and road bridges crossing a creek at sunset" },
];

export const opportunity = {
  eyebrow: "The opportunity",
  title: "When a city changes shape, value follows.",
  image: img("opportunity"),
  alt: "A futuristic illuminated skyline with an elevated metro and light trails at dusk",
  lines: [
    "Property values are not transformed by one announcement.",
    "They move when several forces begin working together.",
    "When infrastructure progresses.",
    "When travel times reduce.",
    "When social ecosystems mature.",
    "When end-user demand strengthens.",
    "When businesses and professionals move closer.",
    "And when large, well-connected land parcels become increasingly difficult to find.",
    "Thane is at the convergence of these forces.",
    "It is already an established residential market. Yet many of the infrastructure developments likely to shape its next phase are still progressing.",
    "The city has arrived.",
    "Its next phase of value is still taking shape.",
  ],
};

export const caseForThane = {
  title: ["The case", "for Thane"],
  items: [
    { title: "Infrastructure moving forward", icon: "metro", text: "Major mobility projects are progressing from plans on paper towards physical execution." },
    { title: "Limited premium land", icon: "land", text: "As central Thane becomes denser, large land parcels with strong connectivity and natural surroundings become increasingly difficult to recreate." },
    { title: "Strong end-user demand", icon: "family", text: "Thane's residential market is supported by families and professionals choosing the city for everyday living, not merely by speculative interest." },
    { title: "Growing rental potential", icon: "building", text: "An expanding professional population and improving regional access are expected to support demand for quality rental residences." },
    { title: "Long-term appreciation potential", icon: "growth", text: "Connectivity, scarcity, liveability and sustained end-user demand create the foundations for long-term value growth." },
    { title: "A mature urban ecosystem", icon: "city", text: "Education, healthcare, shopping, recreation and commercial activity are already well-established." },
  ],
};

export const residentialValues = {
  title: ["Indicative", "Residential Values"],
  axisLabel: "Average price (₹ per sq.ft.)",
  max: 18000,
  ticks: [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000],
  bars: [
    { period: "MID - 2000s", years: "(2006)", note: "Semi-urban / affordable rural-urban transition zone", min: 2500, maxV: 3500, label: "₹2,500 - ₹3,500", unit: "PER SQ.FT.", tone: "#D9B36E" },
    { period: "MID - 2010s", years: "(2015-2016)", note: "Planned high-rise launches accelerate", min: 5000, maxV: 9700, label: "₹5,000 - ₹9,700", unit: "PER SQ.FT.", tone: "#C3914A" },
    {
      period: "RECENT YEARS", years: "(2022-2026)", note: "Established residential market + premium inventory",
      min: 10000, maxV: 13850, label: "₹10,000 - ₹13,850", unit: "PER SQ.FT.", tone: "#8A5C24",
      premium: { min: 15000, maxV: 18000, label: "₹15,000 - ₹18,000", unit: "PER SQ.FT. PREMIUM PROJECTS" },
    },
  ],
  rental: { figure: "3.5% - 4.5%", text: "Expanding rental yields driven by an influx of corporate professionals." },
  source: "*Source: Market reports from Square Yards, Housing.com, CRE Matrix & PropertyWala. Figures can be independently verified.",
  disclaimer: "Indicative values. Refer to applicable source / disclaimer.",
};

export const whyArkade = {
  title: "Why Arkade chose Thane",
  image: img("why-arkade"),
  alt: "Green hills and lakes leading to the Thane skyline in soft morning haze",
  lines: [
    "At Arkade, we believe the most meaningful real-estate opportunities are found where a city is not merely growing, but changing character.",
    "Thane represents that change.",
    "A mature city entering a new phase of connectivity.",
    "A new generation of families seeking a more complete way to live.",
    "A premium residential corridor gathering strength.",
    "And a location where nature, infrastructure and aspiration are beginning to come together.",
    "Arkade's entry into Thane is not simply an expansion into another geography.",
    "It is a considered step towards the future of the Mumbai Metropolitan Region.",
  ],
};

export const legacy = {
  title: ["Four decades", "of shaping Mumbai."],
  image: img("mumbai-skyline"),
  alt: "Mumbai skyline along the waterfront in warm haze",
  lines: [
    "For more than forty years, Arkade has created homes around one enduring belief.",
    "Family First.",
  ],
  closing: [
    "That understanding has guided Arkade across Mumbai, through changing neighbourhoods, evolving aspirations and generations of families.",
    "Today, as Arkade enters Thane, it brings with it the experience of the past and a clear understanding of the future.",
  ],
  stats: [
    { value: "40+", label: "Years of crafting excellence" },
    { value: "5.5+", label: "Million sq.ft. developed" },
    { value: "3+", label: "Million sq.ft. under development" },
    { value: "5,500+", label: "Happy families" },
    { value: "33", label: "Projects completed" },
    { value: "7", label: "Projects ongoing" },
    { value: "10+", label: "Projects upcoming" },
    { value: "2024", label: "Listed on BSE and NSE", plain: true },
  ],
  timeline: [
    { mark: "40+ years", text: "For more than forty years, Arkade has created homes around one enduring belief. Family First." },
    { mark: "Across Mumbai", text: "Through changing neighbourhoods, evolving aspirations and generations of families." },
    { mark: "2024", text: "Listed on BSE and NSE." },
    { mark: "Today", text: "Arkade enters Thane, with the experience of the past and a clear understanding of the future." },
  ],
  footprint: [
    { region: "South Mumbai", places: ["Carmichael Road", "Tardeo", "Mazgaon"] },
    { region: "Western Suburbs", places: ["Virar", "Vasai", "Mira Road", "Dahisar", "Borivali", "Kandivali", "Malad", "Goregaon", "Andheri", "Vile Parle", "Santacruz"] },
    { region: "Eastern Suburbs", places: ["Mulund", "Bhandup", "Kanjurmarg"] },
    { region: "Central Suburbs", places: ["Thane"] },
  ],
};

export const developments = {
  title: ["Ongoing landmark", "developments across Mumbai"],
  note: "Artistic impression",
  items: [
    { name: "Arkade Pearl", place: "Vile Parle East", image: img("arkade-pearl") },
    { name: "Arkade Rare", place: "Bhandup West", image: img("arkade-rare") },
    { name: "Arkade Nest", place: "Mulund West", image: img("arkade-nest") },
    { name: "Arkade Evoke", place: "Goregaon West", image: img("arkade-evoke") },
    { name: "Arkade Sapphire", place: "Santacruz West", image: img("arkade-sapphire") },
    { name: "Arkade Vistas", place: "Goregaon East", image: img("arkade-vistas") },
  ],
};

export const testimonials = [
  { project: "Arkade Pearl", name: "Mr. Shreyas Suralkar", quote: "We had a very good experience with Arkade. Our property was redeveloped by Arkade, and they did a fantastic job. They even gave us possession before time! Based on all the information we have, the construction quality is truly top-notch. Highly recommended." },
  { project: "Arkade Nest", name: "Mr. Mehul Gandhi", quote: "The main reason for choosing Arkade was the location. As a Jain family, we wanted a home in the Sarvodaya Nagar area. We were looking for a good location, great amenities, and a fair price, and we found it all here in this excellent low density project." },
  { project: "Arkade Rare", name: "Mr. Patel", quote: "We couldn't find a project as good as this one, both in terms of locality and construction. There are great amenities to keep the kids busy, and it's wonderful for our senior parents too. We are getting everything in one place." },
  { project: "Arkade Aspire", name: "Mrs. Ketaki Phadke", quote: "Every month, you get those updates right on Instagram, and they share it with us. So that was always pleasing to know, okay, this is how it is progressing. So you have transparency where the builder himself is sending those updates to us." },
  { project: "Arkade Aura", name: "Mrs. Dholakiya", quote: "I love how thoughtfully everything is planned. The overall layout is fantastic, and we especially love what they've done with the EcoDeck and the gym - really, all of it! We are super excited to start this next chapter of our lives here. All the best to everyone and congratulations!" },
];

export const register = {
  eyebrow: "Register your interest",
  title: ["Discover", "more."],
  text: "Thane is taking its next shape. Share your details and the Arkade team will reach out with more about Arkade in Thane.",
  consent:
    "I agree to be contacted by Arkade and its authorised representatives by call, SMS, email or WhatsApp regarding this enquiry.",
};
