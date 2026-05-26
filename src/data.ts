import { Product, StylingPersona, QuizQuestion } from "./types";

export const PRODUCTS: Product[] = [
  {
    "id": "rose-stripe-two-piece-set",
    "name": "Rose & Stripe Off-Shoulder Set",
    "price": 24,
    "category": "toddler",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/74c3a21a-d4d8-4f7b-88f9-c381b54be13d.jpg",
    "description": "Adorable two-piece set featuring a black and white striped off-the-shoulder top with a bold rose print, paired with matching black bloomers featuring a cute bow detail.",
    "colors": ["Black/White"],
    "sizes": ["12-18m", "18-24m", "2T", "3T"],
    "isOrganic": false
  },
  {
    "id": "ribbed-tank-denim-skirt-set",
    "name": "Ribbed Tank and Denim Skirt Set",
    "price": 28,
    "category": "toddler",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/b2a80f2e-8bd8-48b1-9320-1f0592c864d5.jpg",
    "description": "Casual and comfortable summer set including a soft, ribbed white tank top and a stylish blue denim wrap skirt with ruffle trim along the hem.",
    "colors": ["White/Denim"],
    "sizes": ["12-18m", "18-24m", "2T", "3T", "4T"],
    "isOrganic": false
  },
  {
    "id": "kids-affirmation-cards",
    "name": "Kids Affirmation Cards Box Set",
    "price": 18,
    "category": "accessories",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/ff82881f-1bd2-4155-b9fe-6174ba3d8d67.jpg",
    "description": "A beautiful pink box set containing 132 positive and faith-based affirmation cards designed to build confidence, resilience, and self-esteem in young children.",
    "colors": ["Pink"],
    "sizes": ["One Size"],
    "isOrganic": false
  },
  {
    "id": "floral-butterfly-sleeveless-dress",
    "name": "Floral & Butterfly Sleeveless Dress",
    "price": 22,
    "category": "toddler",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/c3b3a779-ef5a-454d-bde3-2d5404260d87.jpg",
    "description": "Bright and cheerful sleeveless dress featuring a vibrant print of colorful butterflies and spring flowers on a soft white background.",
    "colors": ["Multi"],
    "sizes": ["12-18m", "18-24m", "2T", "3T", "4T"],
    "isOrganic": false
  },
  {
    "id": "baby-distressed-denim-jacket",
    "name": "Distressed Denim Baby Jacket",
    "price": 32,
    "category": "baby",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/0a8baa08-e16e-462f-b0c9-12a20a0a98e9.jpg",
    "description": "Classic blue denim jacket with trendy distressed details, dual chest pockets, and silver-tone button closures. A versatile layering piece for any tiny wardrobe.",
    "colors": ["Medium Wash Denim"],
    "sizes": ["6-9m", "9-12m", "12-18m", "18-24m", "2T"],
    "isOrganic": true
  },
  {
    "id": "bella-tulle-polka-dot-dress",
    "name": "Bella Polka Dot Tulle Dress",
    "price": 26,
    "category": "toddler",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/f613895d-2b32-4231-a129-4eeb07dcd613.jpg",
    "description": "Navy blue dress featuring a cute character graphic named 'Bella' on the bodice, complete with flutter sleeves and a playful polka dot tulle skirt.",
    "colors": ["Navy Blue"],
    "sizes": ["12-18m", "18-24m", "2T", "3T", "4T"],
    "isOrganic": false
  },
  {
    "id": "flower-strap-mary-janes",
    "name": "Floral Strap Baby Mary Janes",
    "price": 16,
    "category": "baby",
    "imageUrl": "https://d22d06tte8psea.cloudfront.net/contributors/fd7cc6ef-87df-491b-a292-8c236fb30d33.jpg",
    "description": "Sweet white Mary Jane baby shoes featuring soft soles for early walkers and a delicate strap adorned with faux leather flowers and pearl centers.",
    "colors": ["White"],
    "sizes": ["0-3m", "3-6m", "6-12m", "12-18m"],
    "isOrganic": false
  }
]
;

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
