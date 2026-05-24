export interface Product {
  id: string;
  name: string;
  price: number;
  category: "baby" | "kids" | "educational" | "dolls" | "accessories";
  imageUrl: string;
  description: string;
  colors: string[];
  sizes: string[];
  isOrganic?: boolean;
}

export interface StylingPersona {
  id: "creative" | "elegant" | "adventurous" | "confident";
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  colorPalette: string[];
  suggestedProducts: string[];
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    description: string;
    persona: "creative" | "elegant" | "adventurous" | "confident";
    icon: string;
  }[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
