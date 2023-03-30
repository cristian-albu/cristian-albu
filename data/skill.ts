export interface TechUsed {
  title: string;
  icon: string;
  category:
    | "Frontend"
    | "Backend"
    | "Frontend & Backend"
    | "Deployment"
    | "DevOps"
    | "CMS"
    | "Design";
  experience: number;
  currentStack: boolean;
}

export interface TechUsedObj {
  [key: string]: TechUsed;
}

export const techUsedObj: TechUsedObj = {
  nextjs: {
    title: "NextJs",
    icon: "/assets/tech-icons/nextjs_logo.png",
    category: "Frontend & Backend",
    experience: 1,
    currentStack: true,
  },
  react: {
    title: "ReactJs",
    icon: "/assets/tech-icons/React.svg",
    category: "Frontend",
    experience: 2,
    currentStack: false,
  },
  tailwindcss: {
    title: "Tailwindcss",
    icon: "/assets/tech-icons/tailwindcss_logo.png",
    category: "Frontend",
    experience: 0,
    currentStack: true,
  },
  typescript: {
    title: "TypeScript",
    icon: "/assets/tech-icons/Typescript_logo.png",
    category: "Frontend & Backend",
    experience: 1,
    currentStack: true,
  },
  javascript: {
    title: "JavaScript",
    icon: "/assets/tech-icons/JavaScript.svg",
    category: "Frontend & Backend",
    experience: 3,
    currentStack: false,
  },
  prisma: {
    title: "Prisma",
    icon: "/assets/tech-icons/prisma_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: true,
  },
  python: {
    title: "Python",
    icon: "/assets/tech-icons/Python.svg",
    category: "Backend",
    experience: 1,
    currentStack: false,
  },
  nodejs: {
    title: "NodeJs",
    icon: "/assets/tech-icons/nodejs_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: false,
  },
  nextauth: {
    title: "NextAuth",
    icon: "/assets/tech-icons/nextauth_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: false,
  },
  firebase: {
    title: "Firebase",
    icon: "/assets/tech-icons/firebase_logo.png",
    category: "Backend",
    experience: 1,
    currentStack: false,
  },
  supabase: {
    title: "Supabase",
    icon: "/assets/tech-icons/supabase_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: false,
  },
  pocketbase: {
    title: "Pocketbase",
    icon: "/assets/tech-icons/pocketbase_logo.svg",
    category: "Backend",
    experience: 0,
    currentStack: false,
  },
  postgresql: {
    title: "PostgreSQL",
    icon: "/assets/tech-icons/postgresql_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: true,
  },
  stripe: {
    title: "Stripe",
    icon: "/assets/tech-icons/stripe_logo.png",
    category: "Backend",
    experience: 0,
    currentStack: false,
  },
  webflow: {
    title: "Webflow",
    icon: "/assets/tech-icons/webflow_logo.png",
    category: "CMS",
    experience: 5,
    currentStack: false,
  },
  sanity: {
    title: "Sanity",
    icon: "/assets/tech-icons/sanity_logo.png",
    category: "CMS",
    experience: 1,
    currentStack: false,
  },
  contentful: {
    title: "Contentful",
    icon: "/assets/tech-icons/contentful_logo.png",
    category: "CMS",
    experience: 0,
    currentStack: true,
  },
  shopify: {
    title: "Shopify",
    icon: "/assets/tech-icons/shopify_logo.png",
    category: "CMS",
    experience: 0,
    currentStack: false,
  },
  github: {
    title: "GitHub",
    icon: "/assets/tech-icons/github_logo.png",
    category: "DevOps",
    experience: 2,
    currentStack: true,
  },
  vercel: {
    title: "Vercel",
    icon: "/assets/tech-icons/vercel_logo.svg",
    category: "Deployment",
    experience: 1,
    currentStack: true,
  },
  netlify: {
    title: "Netlify",
    icon: "/assets/tech-icons/netlify_logo.png",
    category: "Deployment",
    experience: 2,
    currentStack: false,
  },
  railway: {
    title: "Railway",
    icon: "/assets/tech-icons/railway_logo.svg",
    category: "Deployment",
    experience: 1,
    currentStack: true,
  },
  illustrator: {
    title: "Illustrator",
    icon: "/assets/tech-icons/Adobe Illustrator.svg",
    category: "Design",
    experience: 9,
    currentStack: false,
  },
  photoshop: {
    title: "Photoshop",
    icon: "/assets/tech-icons/Adobe Photoshop.svg",
    category: "Design",
    experience: 9,
    currentStack: false,
  },
  premiere: {
    title: "Premiere Pro",
    icon: "/assets/tech-icons/Adobe Premiere Pro.svg",
    category: "Design",
    experience: 7,
    currentStack: false,
  },
  aftereffects: {
    title: "After Effects",
    icon: "/assets/tech-icons/Adobe After Effects.svg",
    category: "Design",
    experience: 5,
    currentStack: false,
  },
  xd: {
    title: "Xd",
    icon: "/assets/tech-icons/Adobe Xd.svg",
    category: "Design",
    experience: 5,
    currentStack: true,
  },
  figma: {
    title: "Figma",
    icon: "/assets/tech-icons/Figma.svg",
    category: "Design",
    experience: 1,
    currentStack: false,
  },
  blender: {
    title: "Blender",
    icon: "/assets/tech-icons/Blender.svg",
    category: "Design",
    experience: 8,
    currentStack: false,
  },
};

export const techUsedArr = Object.values(techUsedObj);
