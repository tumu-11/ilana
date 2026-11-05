import heroBowl from "@/assets/hero-bowl.jpg";
import pregnancy from "@/assets/pregnancy.jpg";
import child from "@/assets/child.jpg";
import elder from "@/assets/elder.jpg";
import consult from "@/assets/consult.jpg";
import fit from "@/assets/fit.jpg";
import fit1 from "@/assets/fit1.jpg";
import fitness from "@/assets/fitness.jpg";
import sports from "@/assets/sports.jpg";
/** Business contact details - edit here to update the whole site. */
export const CONTACT = {
  phoneDisplay: "0787 519 840",
  phoneTel: "+256787519840",
  whatsapp: "+256787519840",
  email: "jtfrancesca@gmail.com",
};

export const whatsappLink = (text = "Hello ILANA, I'd like to book a nutrition consultation.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const SPORTS_IMAGES = [fit, fit1, fitness, sports];

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  forWho: string[];
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "weight",
    title: "Weight Management",
    short: "Sustainable weight loss and healthy weight gain - without extremes.",
    long: "Whether your goal is to lose or gain weight, we build an approach around real meals, realistic habits and the way you actually live - so changes feel manageable and can last.",
    forWho: ["Adults wanting a healthier weight", "Anyone tired of restrictive diets", "People seeking healthy weight gain"],
    image: heroBowl,
    alt: "A colourful grain bowl with roasted squash, avocado and greens",
  },
  {
    slug: "sports",
    title: "Sports & Fitness Nutrition",
    short: "Fuel for training, muscle development, performance and recovery.",
    long: "Practical guidance on what, when and how much to eat to support your training - from everyday gym-goers to committed athletes working towards an event.",
    forWho: ["Gym members and runners", "Athletes in training", "Anyone building strength"],
    image: fit,
    alt: "A black man in workout attire lifting dumbbells in a gym",
  },
  {
    slug: "pregnancy",
    title: "Pregnancy & Postpartum",
    short: "Gentle nutritional support through pregnancy, recovery and breastfeeding.",
    long: "Supportive, evidence-informed guidance to help you nourish yourself through pregnancy, the recovery months that follow, and breastfeeding.",
    forWho: ["Expecting mothers", "New mothers in recovery", "Breastfeeding parents"],
    image: pregnancy,
    alt: "A pregnant woman holding a bowl of fresh fruit by a sunny window",
  },
  {
    slug: "children",
    title: "Child Nutrition",
    short: "Healthy growth, development and positive eating habits from the start.",
    long: "Help for families navigating picky eating, school lunches and growing appetites - with ideas that make healthy food feel normal, enjoyable and doable.",
    forWho: ["Parents and caregivers", "Families with picky eaters", "Schools and childcare settings"],
    image: child,
    alt: "A smiling child eating sliced fruit and vegetables with a parent",
  },
  {
    slug: "older-adults",
    title: "Older Adult Nutrition",
    short: "Nourishment, strength and wellbeing as we age.",
    long: "Nutrition that adapts to changing needs - supporting energy, strength, appetite and enjoyment of food in later life.",
    forWho: ["Older adults", "Families caring for ageing parents", "Care homes and caregivers"],
    image: elder,
    alt: "An older couple preparing a fresh salad together in their kitchen",
  },
  {
    slug: "health-conditions",
    title: "Nutrition for Health Conditions",
    short: "Individualised dietary support for concerns such as hypertension and diabetes.",
    long: "Personalised dietary guidance that complements the care you receive from your doctor - always within professional scope, and never as a replacement for medical treatment.",
    forWho: ["People managing hypertension", "People managing diabetes", "Anyone advised to change their diet"],
    image: consult,
    alt: "Hands writing a personal nutrition plan beside fresh vegetables",
  },
];
