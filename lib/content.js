// All page copy and media live here so the page can be edited without touching layout code.

export const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const clinic = {
  name: "Simple Hearing & Speech Care",
  logo: "/logo.png",
  logoLight: "/logo-light.png",
  phoneDisplay: "+91 76667 73596",
  phoneHref: "tel:+917666773596",
  whatsapp: "917666773596",
  email: "info@simplehearingandspeechcare.in",
  address:
    "Office 702, 7th Floor, Commercial Building, Westwood Estates, opp. Mont Vert Tropez Road, Kaspate Wasti, Wakad, Pimpri-Chinchwad, Maharashtra 411057",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Simple+Hearing+and+Speech+Care+Wakad+Pune",
};

export const hero = {
  title: ["Top", "Hearing & Speech", "Care Clinic in", "Pune"],
  intro:
    "Every individual has unique needs. Discover personalized hearing care, therapy, and learning programs designed to support everyday progress.",
  body:
    "At Simple Hearing & Speech Care, we provide personalised care and structured programs designed around individual needs. From hearing aids and vertigo management to developmental therapies and brain learning skill development, our services focus on helping individuals build skills, improve daily functioning, and experience greater confidence.",
  note: "Get in touch with our team to explore the right service for your needs.",
  cta: "Book an Appointment",
  images: {
    main: { src: unsplash("1589169011402-8b2cbd1ee593"), alt: "A mother laughing with her young daughter at home" },
    adult: { src: unsplash("1533128361669-69c065857a13", 600), alt: "A smiling senior woman" },
    ear: { src: unsplash("1596088728260-08a654466a00", 600), alt: "Close-up of a behind-the-ear hearing aid" },
  },
};

export const services = [
  "Hearing Aids",
  "Vertigo Management",
  "Speech Therapy",
  "Occupational Therapy",
  "School Readiness",
  "Neuro Sensory Accelerator",
  "Cogniva Program",
];

export const adults = {
  heading: "Our Specialised Services For Adults",
  items: [
    {
      id: "hearing-aids",
      service: "Hearing Aids",
      title: "Hearing Aids",
      lead: "Experience clearer communication with hearing solutions tailored to your hearing needs.",
      body: "Our hearing aid services help you explore suitable devices, understand their features, and receive guidance on fitting and adjustments for everyday listening.",
      points: [
        "Guidance on suitable hearing aid options",
        "Assistance with fitting and adjustments",
        "Support for comfortable everyday hearing",
      ],
      cta: "Enquire About Hearing Aids",
      image: { src: unsplash("1667581278300-a4035a2a5cd8"), alt: "An audiologist fitting a hearing aid behind a patient's ear" },
    },
    {
      id: "vertigo",
      service: "Vertigo Management",
      title: "Vertigo Management Clinic",
      lead: "Get professional support for dizziness, balance difficulties, and vertigo-related concerns.",
      body: "Our Vertigo Management Clinic focuses on understanding your symptoms and guiding you towards appropriate management based on your individual needs.",
      points: [],
      cta: "Book a Vertigo Consultation",
      image: { src: unsplash("1496813146940-1601b02f81a4"), alt: "A senior woman resting her hand on her forehead" },
    },
  ],
};

export const pediatrics = {
  heading: "Our Specialised Services For Pediatrics",
  items: [
    {
      id: "speech-therapy",
      service: "Speech Therapy",
      title: "Speech Therapy",
      lead: "Communication plays an important role in learning, social interaction, and everyday life.",
      body: "Our speech therapy services focus on developing communication skills through personalised sessions and structured activities tailored to individual requirements.",
      points: ["Speech and language development", "Communication skill-building", "Individualised therapy support"],
      cta: "Enquire About Speech Therapy",
      tone: "magenta",
      image: { src: unsplash("1771765767087-ce71e4a7916a", 1000), alt: "A therapist counting on her fingers with a young boy" },
    },
    {
      id: "occupational-therapy",
      service: "Occupational Therapy",
      title: "Occupational Therapy",
      lead: "Build essential skills for everyday activities through structured, goal-oriented occupational therapy.",
      body: "Our approach focuses on supporting functional abilities, coordination, sensory processing, and participation in daily routines, depending on individual needs.",
      points: [
        "Development of everyday functional skills",
        "Support for coordination and motor skills",
        "Activities designed around individual goals",
      ],
      cta: "Book an Occupational Therapy Consultation",
      tone: "coral",
      image: { src: unsplash("1484820540004-14229fe36ca4", 1000), alt: "A child stacking colourful blocks" },
    },
    {
      id: "school-readiness",
      service: "School Readiness",
      title: "School Readiness Program",
      lead: "Help prepare children for a smoother transition into the school environment with a structured school readiness program.",
      body: "The program focuses on building foundational skills that support participation in classroom activities, learning routines, and everyday interactions.",
      points: [
        "Foundational learning skills",
        "Attention and task participation",
        "Communication and classroom readiness",
        "Activities that support independence and routines",
      ],
      cta: "Enquire About School Readiness",
      tone: "gold",
      image: { src: unsplash("1777056491418-d4ff81a4ad92", 1000), alt: "Young children working together at a classroom table" },
    },
  ],
};

export const neuro = {
  eyebrow: "Our Unique Program in Entire Maharashtra",
  title: "Simple Neuro Sensory Accelerator",
  tagline: "A specialised program designed to complement and boost therapy.",
  body: [
    "The Simple Neuro Sensory Accelerator is a focused program designed to support therapy through structured neuro-sensory activities tailored to individual requirements.",
    "It is intended to complement the therapy process and support progress towards personalised developmental and functional goals.",
  ],
  points: [
    "Structured neuro-sensory activities",
    "Individualised program planning",
    "Designed as a therapy booster",
    "Support aligned with individual therapy goals",
  ],
  cta: "Enquire About the Neuro Sensory Accelerator",
  service: "Neuro Sensory Accelerator",
  image: { src: unsplash("1631013002435-cad13fcf3603", 1200), alt: "A child's hand picking up colourful sensory beads" },
  image2: { src: unsplash("1786292949404-084cbd10c7b1", 800), alt: "A therapist cheering with a toddler during a session" },
};

export const cogniva = {
  eyebrow: "For All Kids",
  title: "Cogniva Program",
  subtitle: "Brain Learning Skill Development",
  lead: "Build stronger learning skills through a structured brain skill development program.",
  body: [
    "The Cogniva Program focuses on brain learning skills that support how children approach learning, process information, and engage with everyday academic tasks.",
    "The program is designed for children with different learning needs and aims to strengthen foundational learning abilities through structured skill development.",
  ],
  points: [
    "Brain learning skill development",
    "Activities focused on learning and information processing",
    "Support for attention and learning strategies",
    "Structured brain skill coaching",
  ],
  closing: "Help your child explore new ways to approach learning and build essential learning skills.",
  cta: "Enquire About the Cogniva Program",
  service: "Cogniva Program",
  image: { src: unsplash("1758612898788-38a249839c1d", 1200), alt: "A smiling boy in glasses studying at his desk" },
};

export const why = {
  heading: "Why Choose Simple Hearing & Speech Care?",
  items: [
    { icon: "grid", title: "Multiple specialised services", text: "Hearing care, vertigo management, therapy, and learning programs under one roof." },
    { icon: "target", title: "Individualised approach", text: "Services and programs planned around specific needs and goals." },
    { icon: "steps", title: "Structured support", text: "Focused sessions and activities designed to support skill development." },
    { icon: "compass", title: "Dedicated guidance", text: "Support to help you understand available services and the next steps." },
    { icon: "layers", title: "Comprehensive care options", text: "Explore the service or program that best fits your requirements." },
  ],
  images: [
    { src: unsplash("1781652458706-9576a77fa01a", 900), alt: "An audiologist guiding a patient through a hearing check" },
    { src: unsplash("1770096679916-2cd9c720d400", 900), alt: "A therapist and child drawing together" },
    { src: unsplash("1511684344724-cda927f1ba0e", 900), alt: "A senior woman in a blue sari" },
  ],
};

export const finalCta = {
  heading: "Take the First Step Towards the Right Support",
  body: "Whether you are exploring hearing aids, seeking vertigo management, looking for therapy services, or interested in specialised learning programs, our team is here to guide you.",
  note: "Connect with Simple Hearing & Speech Care to learn more about our services and find the appropriate next step.",
  image: { src: unsplash("1758598737547-666bce663667", 1200), alt: "A mother and son building with colourful blocks" },
};
