import { Product, StylingPersona, QuizQuestion } from "./types";

export const PRODUCTS: Product[] = [
  // Baby Collection
  {
    id: "baby-knit-cardigan",
    name: "Heirloom Knit Cardigan",
    price: 48,
    category: "baby",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3F-1u1rU9qyjhLPJYl8Y-Ll61JRU6fz_LCVxBSs3A_DJQUTqmMOgtscWBkbj7spKSRU-olrmLg4clfKar_5my6kTY3gF-lskeee_Nb2RGz3LjTfmOz1ivscvivBmoxpjG16Pw8kTJjOu_05cS94cKfBYmt80SV3yKb6zCbebMdMCk3xJ7tKa2CjHTR7lmx8uCm5TFpYJThULlg5vl3x3Iv7UuoDRqJYwRA2-FsJxvdWMFlBIdM16JjYEh9UoXgxUckzbOKuEgaU",
    description: "Utterly soft organic waffle knit cardigan with wooden toggle buttons. Gentle on sensitive skin and designed to be passed down through generations.",
    colors: ["Oatmeal", "Warm Sand", "Sage", "Soft Clay"],
    sizes: ["0-3m", "3-6m", "6-12m", "12-18m"],
    isOrganic: true
  },
  {
    id: "organic-cotton-romper",
    name: "Playtime Ribbed Romper",
    price: 36,
    category: "baby",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600",
    description: "Designed for easy changes and maximum standard mobility. Made with premium certified ultra-soft organic cotton in custom pastel color washes.",
    colors: ["Soft Clay", "Lavender", "Pale Peach", "Sky Blue"],
    sizes: ["3-6m", "6-12m", "12-18m", "2T"],
    isOrganic: true
  },

  // Kids Clothing
  {
    id: "creative-dungarees",
    name: "Artisanal Canvas Dungarees",
    price: 64,
    category: "kids",
    imageUrl: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
    description: "Heavy-duty yet ultra-soft cotton denim canvas dungarees with paint-splatter accent details and deep pockets for rock collecting.",
    colors: ["Denim Blue", "Splatter Cream", "Forest Moss"],
    sizes: ["3Y", "4Y", "5Y", "6Y", "8Y"],
    isOrganic: false
  },
  {
    id: "retro-terry-polo",
    name: "Retro Terry-Cloth Polo Set",
    price: 52,
    category: "kids",
    imageUrl: "https://images.unsplash.com/photo-1621452773781-0f99279683c6?auto=format&fit=crop&q=80&w=600",
    description: "A super cozy, absorbent vintage-inspired matching shirt and shorts set. Pure comfort for beach days and playground adventures.",
    colors: ["Butter Yellow", "Royal Blue", "Coral Melon"],
    sizes: ["2T", "3T", "4Y", "6Y"],
    isOrganic: true
  },

  // Educational Products
  {
    id: "affirmation-journal-kit",
    name: "Creative Path Journal & Stencil Set",
    price: 29,
    category: "educational",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    description: "Encourage confidence and mindfulness with child-friendly reflection pages, positive stencils, and colorful custom-tipped sketch pencils.",
    colors: ["Pastel Palette", "Vibrant Primary"],
    sizes: ["One Size"],
    isOrganic: false
  },
  {
    id: "wood-arithmetic-blocks",
    name: "Heirloom Math & Geometry Blocks",
    price: 45,
    category: "educational",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=600",
    description: "24 solid birch wood blocks with soft-colored modern geometric overlays. Perfect for cognitive synthesis and design play.",
    colors: ["Rainbow Shoreline", "Earth & Sand"],
    sizes: ["Classic Wooden Box Set"],
    isOrganic: true
  },

  // Inclusive Dolls
  {
    id: "diversity-doll-kai",
    name: "Kai Soft-Sculpture Doll",
    price: 42,
    category: "dolls",
    imageUrl: "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&q=80&w=600",
    description: "Thoughtfully crafted inclusive plush companion wearing miniatures from our own clothing line. Gentle organic flax linen skin, coily hair texture.",
    colors: ["Original Outfit"],
    sizes: ["14 in"],
    isOrganic: true
  },
  {
    id: "diversity-doll-maya",
    name: "Maya Soft-Sculpture Doll",
    price: 42,
    category: "dolls",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
    description: "High-quality, lovable modern doll with textured braided crown, wearing the limited edition mustard yellow heirloom romper.",
    colors: ["Mustard Edition"],
    sizes: ["14 in"],
    isOrganic: true
  },

  // Accessories
  {
    id: "linen-boho-bonnet",
    name: "Sun-Drenched Flax Linen Bonnet",
    price: 24,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=600",
    description: "Airy, lightweight flax linen sun bonnet with soft ties and curved bill. Offers chemical-free UPF 50+ face protection.",
    colors: ["Oatmeal", "Mustard", "Sage"],
    sizes: ["0-6m", "6-12m", "12-24m"],
    isOrganic: true
  },
  {
    id: "pastel-slouch-socks-trio",
    name: "Ribbed Slouch Sock Set (Trio)",
    price: 18,
    category: "accessories",
    imageUrl: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600",
    description: "Premium thick cotton ribbed socks which stay on active babies. Set of three gorgeous tones: Olive, Rose, and Ochre.",
    colors: ["Soft Earth Triad", "Sunset Warmth Triad"],
    sizes: ["6-12m", "1-2Y", "2-4Y", "4-6Y"],
    isOrganic: true
  }
];

export const STYLING_PERSONAS: StylingPersona[] = [
  {
    id: "creative",
    title: "The Creative",
    subtitle: "Bold Colors & Splatter Patterns",
    description: "For the dreamers, finger-painters, and abstract storytellers. They express themselves through vibrant mixed colors, unusual pairings, and paint-splatter designs.",
    traits: ["Imaginative", "Expressive", "Artistic", "Spontaneous"],
    colorPalette: ["#0040e0", "#b80049", "#ffe087", "#2e5bff"],
    suggestedProducts: ["creative-dungarees", "affirmation-journal-kit", "organic-cotton-romper"],
    iconName: "Brush"
  },
  {
    id: "elegant",
    title: "The Elegant",
    subtitle: "Classic & Refined Textures",
    description: "For children who appreciate tactile premium knits, clean linear silhouettes, and quiet coordination. They love soft hand-feel textiles and classic European-inspired layouts.",
    traits: ["Thoughtful", "Mindful", "Observed", "Gentle"],
    colorPalette: ["#f3faff", "#e6f6ff", "#d1ecfa", "#ffe087"],
    suggestedProducts: ["baby-knit-cardigan", "linen-boho-bonnet", "diversity-doll-maya"],
    iconName: "Diamond"
  },
  {
    id: "adventurous",
    title: "The Adventurous",
    subtitle: "Durable & Active Outfits",
    description: "For climbers, sandcastle builders, and puddle-jumpers. Their outfits are reinforced in the knees, feature quick-dry organic weaves, and include deep utility pockets.",
    traits: ["Curious", "Coordinated", "Resilient", "Energetic"],
    colorPalette: ["#735c00", "#cbe7f5", "#747688", "#021f29"],
    suggestedProducts: ["retro-terry-polo", "pastel-slouch-socks-trio", "wood-arithmetic-blocks"],
    iconName: "Compass"
  },
  {
    id: "confident",
    title: "The Confident",
    subtitle: "Trend-Setting Statements",
    description: "For the little leaders who choose their own outfits from day one. They represent empowerment, high-contrast block styling, and love setting playground trends with bright confidence.",
    traits: ["Independent", "Outgoing", "Decisive", "Radiant"],
    colorPalette: ["#e2165f", "#0040e0", "#ebc23e", "#ffffff"],
    suggestedProducts: ["diversity-doll-kai", "creative-dungarees", "organic-cotton-romper"],
    iconName: "Sparkles"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where is your little explorer most content during a weekend afternoon?",
    options: [
      {
        label: "Covered in chalk on the driveway, painting a space castle",
        description: "Pure imagination on display.",
        persona: "creative",
        icon: "Palette"
      },
      {
        label: "Curled up in a quiet window nook with an beautifully illustrated storybook",
        description: "Quiet observations and calm focus.",
        persona: "elegant",
        icon: "BookOpen"
      },
      {
        label: "Climbing the highest oak branch or searching for frogs in the stream",
        description: "Hands-on play, no fear of soil.",
        persona: "adventurous",
        icon: "Map"
      },
      {
        label: "Leading a magical parade of dolls or directing an backyard play",
        description: "Confident storytelling and social shine.",
        persona: "confident",
        icon: "Volume2"
      }
    ]
  },
  {
    id: 2,
    question: "Which of these design styles immediately feels like 'home' to them?",
    options: [
      {
        label: "A playful clashing of bold, cheerful neon blocks and polka dots",
        description: "Rules are meant to be rewritten.",
        persona: "creative",
        icon: "Dribbble"
      },
      {
        label: "Soft cashmere cardigans, warm beige tones, and delicate textures",
        description: "Harmonious quality over flash.",
        persona: "elegant",
        icon: "Activity"
      },
      {
        label: "Earthy olive green jumpsuits with functional cargo pockets for tools",
        description: "Ready-for-action comfort.",
        persona: "adventurous",
        icon: "Compass"
      },
      {
        label: "Dramatically matching colors with a mini trench coat or premium booties",
        description: "Stellar fashion statements.",
        persona: "confident",
        icon: "Sparkles"
      }
    ]
  },
  {
    id: 3,
    question: "When picking out toys, which activity captures their heart for hours?",
    options: [
      {
        label: "Watercolors, modeling clay, and drawing custom comics",
        description: "Expressing original thought forms.",
        persona: "creative",
        icon: "Brush"
      },
      {
        label: "Inclusive diversity dolls with matching outfits and gentle accessories",
        description: "Empathetic, deep roleplaying.",
        persona: "elegant",
        icon: "Heart"
      },
      {
        label: "Laying out complex geometric wooden balance runs and gear stacks",
        description: "Mechanical curiosity.",
        persona: "adventurous",
        icon: "Grid"
      },
      {
        label: "A custom journal kit filled with stencils, affirmations and stamps",
        description: "Active record-keeping and pride.",
        persona: "confident",
        icon: "Star"
      }
    ]
  }
];
