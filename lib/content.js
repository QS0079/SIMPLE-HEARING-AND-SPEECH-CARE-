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
    main: {
      src: "/images/hero-child-therapy.jpg",
      alt: "Indian child smiling during speech and hearing care session at Simple Hearing & Speech Care Clinic",
    },
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
        "Support for comfortable everyday listening",
      ],
      cta: "Enquire About Hearing Aids",
      image: { src: unsplash("1667581278300-a4035a2a5cd8"), alt: "An audiologist fitting a hearing aid behind a patient's ear" },
    },
    {
      id: "vertigo",
      service: "Vertigo Management",
      title: "Vertigo Management Clinic",
      lead: "Find support for balance and dizziness issues through structured assessment and guidance.",
      body: "Our vertigo management services help identify balance challenges and provide personalized guidance to improve stability and confidence in daily life.",
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
      lead: "Supporting communication development through structured, engaging sessions.",
      body: "",
      points: [
        "Clear speech articulation",
        "Language comprehension and expression",
        "Confidence in everyday interaction",
      ],
      cta: "Book a Speech Therapy Consultation",
      tone: "magenta",
      image: { src: "/images/hero-pediatric-therapy.jpg", alt: "Pediatric speech and development therapy session at Simple Hearing & Speech Care Clinic" },
    },
    {
      id: "occupational-therapy",
      service: "Occupational Therapy",
      title: "Occupational Therapy",
      lead: "Helping children build essential everyday skills through purposeful activities.",
      body: "",
      points: [
        "Fine and gross motor skills",
        "Sensory processing support",
        "Everyday independence and focus",
      ],
      cta: "Book an Occupational Therapy Consultation",
      tone: "coral",
      image: { src: unsplash("1484820540004-14229fe36ca4", 1000), alt: "A child stacking colourful blocks" },
    },
    {
      id: "school-readiness",
      service: "School Readiness",
      title: "School Readiness Program",
      lead: "Preparing children for classroom environments with foundational learning and social skills.",
      body: "",
      points: [
        "Listening and classroom attention",
        "Social interaction and participation",
        "Early learning and routine adaptation",
        "Confidence in school routines",
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
  tagline: "Supporting children with complex sensory and developmental needs through an advanced, structured approach.",
  body: [
    "The Simple Neuro Sensory Accelerator is an innovative program combining specialised equipment and multi-sensory techniques to enhance sensory processing, motor planning, and body awareness.",
    "Designed to create positive neurological adaptations, this program helps children develop the foundational sensory and motor skills needed for learning, communication, and emotional regulation.",
  ],
  points: [
    "Multi-sensory stimulation for better sensory integration",
    "Targeted motor planning and coordination activities",
    "Support for focus, calm, and body awareness",
    "A modern facility equipped for specialised therapy",
  ],
  cta: "Learn More About Neuro Sensory Accelerator",
  service: "Neuro Sensory Accelerator",
  image: { src: unsplash("1631013002435-cad13fcf3603", 1200), alt: "A child's hand picking up colourful sensory beads" },
  image2: { src: unsplash("1786292949404-084cbd10c7b1", 800), alt: "A therapist cheering with a toddler during a session" },
};

export const cogniva = {
  eyebrow: "For All Kids",
  title: "Cogniva Program",
  subtitle: "Brain Learning Skill Development",
  lead: "Building stronger cognitive and learning foundations for academic success and daily confidence.",
  body: [
    "Cogniva is a structured brain learning skill development program designed to strengthen the core cognitive abilities essential for learning, thinking, and problem-solving.",
    "Through engaging, research-backed cognitive exercises, the program helps children enhance attention, memory retention, processing speed, and logical reasoning—helping them perform better in school and everyday tasks.",
  ],
  points: [
    "Attention and focus training",
    "Memory and information retention",
    "Visual and auditory processing skills",
    "Cognitive speed and problem-solving ability",
  ],
  closing: "Empowering children to learn with greater ease, speed, and confidence.",
  cta: "Enquire About Cogniva Program",
  service: "Cogniva Program",
  image: { src: unsplash("1758612898788-38a249839c1d", 1200), alt: "A smiling boy in glasses studying at his desk" },
};

export const why = {
  heading: "Why Choose Simple Hearing & Speech Care?",
  items: [
    "Personalised care plans designed around individual needs",
    "Experienced team of specialists dedicated to progress",
    "Modern therapy facilities with specialised equipment",
    "Comprehensive approach covering hearing, therapy, and learning",
    "Warm, supportive environment for children and adults",
  ],
  images: [
    { src: unsplash("1781652458706-9576a77fa01a", 900), alt: "An audiologist guiding a patient through a hearing check" },
    { src: unsplash("1770096679916-2cd9c720d400", 900), alt: "A therapist and child drawing together" },
    { src: unsplash("1511684344724-cda927f1ba0e", 900), alt: "A senior woman in a blue sari" },
  ],
};

export const finalCta = {
  heading: "Take the First Step Towards the Right Support",
  body: "Whether you are exploring hearing solutions, developmental therapies, or brain learning programs, our team is here to guide you.",
  note: "Consultations available by appointment. Contact us today to discuss how we can support you or your child.",
  primaryCta: "Book an Appointment",
  secondaryCta: "Contact Our Team",
  image: { src: unsplash("1758598737547-666bce663667", 1200), alt: "A mother and son building with colourful blocks" },
};

export const privacyPolicy = {
  title: "Privacy & Policy",
  tagline: "Learn how we protect your personal information and ensure your privacy",
  lastUpdated: "October 26, 2026",
  intro:
    "At Simple Hearing & Speech Care, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when using our website https://simplehearingandspeechcare.in.",
  points: [
    "We may collect personal details such as your name, email, phone number, or address when you contact us, fill out a form, or make an inquiry.",
    "This information is used solely to respond to your queries, process service requests, send updates (with your consent), and improve our services.",
    "We do not sell or share your data with third parties for marketing purposes.",
    "Our website may use cookies to enhance your browsing experience and analyze site performance; you can manage or disable cookies in your browser settings.",
    "While we take reasonable measures to protect your data, no online system is completely secure.",
    "Our site may include links to third-party websites, and we are not responsible for their privacy practices.",
    "Users under 14 years of age should not share personal information without parental consent.",
    "By using our website, you agree to the terms of this Privacy Policy and consent to the collection and use of information as described herein.",
  ],
};

export const termsAndConditions = {
  title: "Therapy Centre – Terms & Conditions for Parents/Guardians",
  tagline: "Important guidelines to keep therapy sessions smooth, consistent, and effective for every child",
  lastUpdated: "October 26, 2026",
  intro:
    "To help us keep things smooth, respectful, and honestly pretty effective for every child, we ask that each parent or guardian read the policies below and then confirm them.",
  sections: [
    {
      num: "1",
      title: "Arrival & Session Time",
      body: "Please make sure your child comes in on time for each session. The sessions will wrap up at the time that was planned originally, even if you arrive a bit late. Late arrivals won't get any extra minutes, because it messes with the timetable for the children booked right after them, and honestly that can get unruly.",
    },
    {
      num: "2",
      title: "Rescheduling of Regular Session Slots",
      body: "A modification to your child's usual day/time, or the weekly cadence, may be requested once every 3 months. These requests have to be sent with at least 7 working days' notice before the change can become active.",
    },
    {
      num: "3",
      title: "Respect and confidentiality between parents",
      body: "We have noticed a few occasional remarks made by parents about other children, or even other families inside the centre premises. We kindly ask that all parents refrain from gossip, comparisons, or personal comments concerning other children or parents. Every child develops at a different rhythm, so we ask everyone to help keep a more supportive and non-judgmental environment for all families, really.",
    },
    {
      num: "4",
      title: "Monthly renewal procedure",
      body: "Therapy sessions run on a monthly subscription format. Before your final scheduled session for the month, a renewal reminder will be sent out to you. Renewal has to be completed on, or no later than the last session of the current month, otherwise services can be interrupted. For renewals finished after the due date, a late renewal charge of ₹400 per day will apply.",
    },
    {
      num: "5",
      title: "Validity of Sessions",
      body: "If you book sessions within a month, they have to be used within that same month, and no, they cannot be quietly shifted. Any unused or unattended sessions are not eligible to be carried forward to the next month.",
    },
    {
      num: "6",
      title: "Rescheduling Individual Sessions",
      body: "If you want to reschedule one particular session, do let us know at least 4 hours in advance. Also, each monthly subscription includes a maximum of 3 rescheduled sessions, but this is always subject to therapist availability and open slots.",
    },
    {
      num: "7",
      title: "Cancellations & Refunds",
      body: "All sessions are pre booked, meaning they are reserved ahead of time for your child. Because of this, no refunds will be provided for sessions that are missed, cancelled, or stopped, regardless of the reason given.",
    },
    {
      num: "8",
      title: "Continuation of Therapy",
      body: "To keep therapy uninterrupted, you need to follow the renewal timeline, plus the payment schedule mentioned above without breaks. If you keep on joining the program, it kind of depends on whether you follow these terms and conditions, in full.",
    },
  ],
};

