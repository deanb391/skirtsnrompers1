import React from "react";
import {
  Shirt, Smile, Palette, Users, BookOpen, ShoppingBag,
  ArrowRight, Sparkles, Heart, Compass, Check, Maximize2,
  Instagram, Star, MessageCircle, AlertCircle, ShoppingCart as CartIcon,
  HelpCircle, Sparkle, Diamond
} from "lucide-react";
import { PRODUCTS, STYLING_PERSONAS } from "./data";
import { Product, CartItem } from "./types";
import ShoppingCart from "./components/ShoppingCart";
import StyleQuizModal from "./components/StyleQuizModal";
import ProductQuickView from "./components/ProductQuickView";

export default function App() {
  // Shopping Cart & Modals State
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  // Home Screen State
  const [activeTab, setActiveTab] = React.useState<"all" | "baby" | "kids" | "educational" | "dolls" | "accessories">("all");
  const [activePersonaId, setActivePersonaId] = React.useState<"creative" | "elegant" | "adventurous" | "confident">("creative");
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);

  // Notification Banner
  const [notification, setNotification] = React.useState<string | null>(
    ""
  );

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity: 1 }];
      }
    });
    setNotification(`🌸 Added "${product.name}" to your Selection Tray!`);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const item = { ...prev[index] };
      item.quantity = Math.max(1, item.quantity + delta);
      const updated = [...prev];
      updated[index] = item;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorite handler
  const toggleFavorite = (id: string, name: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        setNotification(`Removed "${name}" from your wishlist closet.`);
        return prev.filter((item) => item !== id);
      } else {
        setNotification(`❤️ Appended "${name}" to your premium wishlist closet.`);
        return [...prev, id];
      }
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNotification("📬 Subscribed! Enjoy 15% off your first handcrafted organic order!");
    }
  };

  // Quick order handler
  const handleQuickAdd = (product: Product) => {
    const size = product.sizes[0] || "One Size";
    const color = product.colors[0] || "Default";
    handleAddToCart(product, size, color);
  };

  // Filtered Products
  const filteredProducts = activeTab === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  const activePersonaDetail = STYLING_PERSONAS.find(p => p.id === activePersonaId)!;

  // Custom icon map for personality slots
  const personaIcons: Record<string, any> = {
    creative: Palette,
    elegant: Diamond,
    adventurous: Compass,
    confident: Sparkles
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container-brand selection:text-white pb-0 relative overflow-x-hidden font-bevietnam">

      {/* 2026 Notification Bar */}
      {notification && (
        <div className="bg-secondary-container text-on-secondary-container px-6 py-2.5 text-center text-xs font-semibold flex items-center justify-center gap-2 relative z-50">
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="hover:scale-115 transition-transform p-0.5 ml-2 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating WhatsApp Message Button */}
      <a
        href="https://wa.me/15550199?text=Hello!%20I'd%20like%20to%20consult%20from%20Skirts%20'n'%20Rompers!%20🌸"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-secondary-brand hover:bg-secondary-container text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        id="floating-whatsapp"
        title="Message us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Navigation Bar */}
      <nav className="fixed top-4 left-4 right-4 z-40 flex justify-between items-center px-6 md:px-8 py-3.5 max-w-7xl mx-auto rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs border border-surface-dim/40">
        <div className="flex items-center gap-3">
          <img
            alt="Skirts 'n' Rompers Logo"
            className="h-9 w-9 rounded-full object-cover border border-surface-dim"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkCjOFsAl1i3lha3gkpzpVqMhj1hS75KzdEU4IX6yWI40QdtQTLXpeHKZtrCP1ehTfGmnMWY5cfRsWbC6FJq5Y_5nZRv7_7nEyygDBYJzdbpptAr40qEhCHFuI6uPYFoHwsPr5SYKpepzTbHRt35I-_wrq3o9G5jSguDvFSByWOxIsLqXsqBon8PO-6-I66PzPYzsr8lm7bpR7fR9nDBehpavgObN9k0qhl5P_8ySSBRKliMIOssOzO7RowIyehfzrWgD6LadNI3A"
            referrerPolicy="no-referrer"
          />
          <span className="font-quicksand font-bold text-lg md:text-xl tracking-tight">
            <span className="text-secondary-brand">Skirts</span>{" "}
            <span className="text-black">‘n’</span>{" "}
            <span className="text-primary-brand">Rompers</span>
          </span>
        </div>

        {/* Navigation Elements */}
        <div className="hidden lg:flex items-center gap-7">
          <a href="#" className="text-primary-brand font-bold text-xs tracking-wider uppercase border-b-2 border-primary-brand pb-0.5">Home</a>
          <a href="#shop" className="text-on-surface-variant hover:text-primary-brand transition-colors duration-200 text-xs tracking-wider uppercase">Shop</a>
          <a href="#styling" className="text-on-surface-variant hover:text-primary-brand transition-colors duration-200 text-xs tracking-wider uppercase">Styling Services</a>
          <a href="#about" className="text-on-surface-variant hover:text-primary-brand transition-colors duration-200 text-xs tracking-wider uppercase">About Us</a>
          <a href="#contact" className="text-on-surface-variant hover:text-primary-brand transition-colors duration-200 text-xs tracking-wider uppercase">Contact</a>
        </div>

        {/* Curation trigger triggers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="bg-secondary-brand hover:bg-secondary-container text-white text-[11px] font-bold px-4 py-2 rounded-full hidden sm:flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Sparkle className="w-3.5 h-3.5 fill-current" />
            Style Quiz
          </button>

          <button
            onClick={() => window.open("https://wa.me/15550199?text=Hello!%20I'd%20like%20to%20consult%20from%20Skirts%20'n'%20Rompers!%20🌸", "_blank")}
            className="bg-primary-brand max-md:p-2 max-md:rounded-full bg-primary text-white md:px-5 md:py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wide shadow-sm hover:translate-y-[-1px] active:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="max-md:hidden">WhatsApp</span>
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen pt-28 md:pt-36 pb-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
        <div className="absolute top-[8%] left-[-10%] w-[45%] h-[45%] bg-surface-container-high rounded-full blur-[100px] -z-10 opacity-60"></div>
        <div className="absolute bottom-[12%] right-[-10%] w-[45%] h-[45%] bg-secondary-fixed opacity-30 rounded-full blur-[100px] -z-10"></div>

        {/* Left Core Context */}
        <div className="space-y-6 md:space-y-8 lg:col-span-7 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full border border-surface-dim">
            <Heart className="w-4 h-4 text-secondary-brand fill-secondary-brand" />
            <span className="text-[11px] font-bold text-secondary-brand tracking-wider uppercase">Making Kids Smile</span>
          </div>

          <h1 className="font-quicksand font-bold text-4xl md:text-5xl lg:text-6xl text-on-surface leading-[1.1]">
            Helping Kids Dress <span className="text-primary-brand relative inline-block">Boldly<svg className="absolute -bottom-3 left-0 w-full h-3 text-secondary-fixed" preserveAspectRatio="none" viewBox="0 0 100 10"><path d="M0 5 Q 50 15 100 5" fill="none" stroke="currentColor" strokeWidth="5"></path></svg></span>, Learn Confidently &amp; Shine Bright
          </h1>

          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Discover a world where expressive clothing meets playful learning. Premium, certified skin-safe inclusive styles designed for modern families who celebrate every child's unique journey.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#shop"
              className="bg-primary-brand text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Shop Collection
            </a>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-surface-container text-on-surface px-8 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase hover:bg-surface-container-high transition-colors border border-outline-variant flex items-center gap-1.5"
            >
              Style My Child
              <Sparkles className="w-4 h-4 text-primary-brand" />
            </button>
          </div>
        </div>

        {/* Right Collage Frame */}
        <div className="lg:col-span-5 relative h-[380px] md:h-[480px] w-full rounded-3xl overflow-visible z-10 flex items-center justify-center pt-6 lg:pt-0">
          {/* Collage Frame Image Background */}
          <div
            className="absolute inset-2 rounded-[2.5rem] bg-cover bg-center shadow-xl rotate-[3deg] hover:rotate-0 transition-transform duration-500 border-4 border-white"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwkipFonQTB8vzgyApYZK_aut_J9VRsOOdl6gtYfkr7_4w0lUaxl4pIIYzfe98-V_h50FiJcqUkjlk8zluX5yAvpLYw-hQZI-uQMDbG-bY3CA_fM2Ff8SXlQhiEft8__JO7ISOJNu4R2gaSgK-tqGxYMtVgbD2HvBnj9RvAw8hGH7K7cPH5i5Ely1BNYGaoA3e7knqTHE19V_A2k8NnpjSKC0nA1FD89ME2t7dD-aowUkXsNGkhiML7c1Xwi-IU1BD2l8FT9qKSx0')`
            }}
            referrerPolicy="no-referrer"
          />
          {/* Floating dynamic tags as stickers */}
          <div className="absolute top-8 -left-2 bg-secondary-fixed text-on-secondary-fixed font-bold text-xs px-4 py-1.5 rounded-full rotate-[-12deg] shadow-lg sticker-hover z-20 border-2 border-white">
            🌸 New In!
          </div>
          <div className="absolute bottom-16 -right-2 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-4 py-1.5 rounded-full rotate-[8deg] shadow-lg sticker-hover z-20 border-2 border-white flex items-center gap-1">
            🌱 Organic Knit
          </div>
        </div>
      </section>

      {/* 2. INTRO STRIP (Divided organically) */}
      <section className="bg-surface-container-high py-14 relative overflow-hidden">
        {/* Curved Divider Top */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[30px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c15-5,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f3faff"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-14 relative z-10 py-4">
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary-brand group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Shirt className="w-6 h-6" />
            </div>
            <span className="font-quicksand font-bold text-xs text-on-surface">Kids Fashion</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary-brand group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Smile className="w-6 h-6" />
            </div>
            <span className="font-quicksand font-bold text-xs text-on-surface">Unlocking Confidence</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Palette className="w-6 h-6" />
            </div>
            <span className="font-quicksand font-bold text-xs text-on-surface">Design Creativity</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-primary-container text-primary-brand flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-quicksand font-bold text-xs text-on-surface">True Inclusivity</span>
          </div>

          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-surface-dim flex items-center justify-center text-on-surface group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-quicksand font-bold text-xs text-on-surface">Mindful Learning</span>
          </div>
        </div>

        {/* Curved Divider Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180 z-10">
          <svg className="relative block w-full h-[30px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c15-5,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f3faff"></path>
          </svg>
        </div>
      </section>

      {/* 3. BRAND STORY */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Story Context Block */}
          <div className="lg:col-span-6 relative order-2 lg:order-1 text-left">
            <div className="absolute -top-10 -left-6 text-primary-brand/10 select-none">
              <span className="font-serif text-[130px] leading-none">&ldquo;</span>
            </div>
            <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface mb-6 relative z-10">
              Where Style Meets Confidence
            </h2>
            <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 card-shadow relative z-10 border border-surface-dim">
              <p className="font-quicksand font-semibold text-lg md:text-xl text-primary-brand mb-4 italic leading-snug">
                &ldquo;Identity begins with expression.&rdquo;
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We believe that what a child wears is the first bold blueprint to telling their magnificent story to the world. Our mission is to provide premium apparel that isn't just worn, but felt—empowering kids to embrace their wonderful individuality with deep joy and unshakeable confidence throughout daily discoveries.
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-tertiary-fixed rounded-full opacity-35 -z-10 animate-pulse duration-[10s]"></div>
          </div>

          {/* Family Photo Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative w-full h-[320px] md:h-[450px]">
            <div
              className="absolute inset-0 rounded-[2.5rem] bg-cover bg-center shadow-lg transform lg:-rotate-2 border-4 border-white"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYNElSJAClddLwI07Efdrcn202OGoOMD5ecJCnSPrWlFSYZVSp18wnzXDieY280IbUQYTAwTLXu6Eoe_AlQGuCImGgsCO03GeM5hhxzyXp61hmj7gPJP6OLb2TrX-YwjLE78tfHyEtKxEbpQAX5gpRYFyj4iSK76t1nH4Zh5q6YL2iCuJ90_M5xT9_Pg_Hajz4t4uoWgwfknWam-f13B5tHRDl7G5C-TcpPoFbawPsQOyfA9HLg8ghMjxA9gi1f_UN4GtUx0iDLvE')`
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 right-6 bg-surface-container-lowest p-2.5 rounded-full shadow-md text-secondary-brand border border-surface-dim">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PLAYFUL BENTO CATEGORIES GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto bg-pastel-gradient rounded-[3rem] my-8 relative">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[10px] font-extrabold uppercase bg-primary-brand/10 text-primary-brand px-3 py-1 rounded-full border border-primary-brand/10 tracking-widest">
            Handpicked Selections
          </span>
          <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface mt-2">Explore Our World</h2>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-md mx-auto mt-2.5">
            Thoughtfully curated interactive categories for every playful step of their journey. Click to open.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[250px] md:auto-rows-[190px] lg:auto-rows-[170px] xl:auto-rows-[180px]">

          {/* Baby Card (Large) */}
          <div
            onClick={() => setActiveTab("baby")}
            className={`md:col-span-3 lg:col-span-6 md:row-span-2 rounded-[2rem] overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${activeTab === 'baby' ? 'border-primary-brand' : 'border-white'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBj3F-1u1rU9qyjhLPJYl8Y-Ll61JRU6fz_LCVxBSs3A_DJQUTqmMOgtscWBkbj7spKSRU-olrmLg4clfKar_5my6kTY3gF-lskeee_Nb2RGz3LjTfmOz1ivscvivBmoxpjG16Pw8kTJjOu_05cS94cKfBYmt80SV3yKb6zCbebMdMCk3xJ7tKa2CjHTR7lmx8uCm5TFpYJThULlg5vl3x3Iv7UuoDRqJYwRA2-FsJxvdWMFlBIdM16JjYEh9UoXgxUckzbOKuEgaU')` }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-left">
              <span className="text-[10px] uppercase text-tertiary-fixed font-black tracking-widest">Premium Weaves</span>
              <h3 className="font-quicksand font-bold text-2xl text-white mt-1">Baby Cardigans &amp; Rompers</h3>
              <p className="text-xs text-brand-surface-dim text-white/80 mt-1 max-w-xs">GOTS certified organic yarn for the softest beginnings.</p>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-primary-brand mt-4 group-hover:bg-primary-brand group-hover:text-white transition-colors duration-200">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Kids Clothing Block */}
          <div
            onClick={() => setActiveTab("kids")}
            className={`md:col-span-3 lg:col-span-3 rounded-[2rem] bg-primary-fixed cursor-pointer p-6 flex flex-col justify-between group transition-all duration-200 text-left relative overflow-hidden border-2 ${activeTab === 'kids' ? 'border-primary-brand shadow-md' : 'border-transparent'
              }`}
          >
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary-brand/10 rounded-full" />
            <div className="bg-surface-container-lowest text-primary-brand rounded-full w-9 h-9 flex items-center justify-center">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-quicksand font-bold text-lg text-on-primary-fixed leading-tight">Kids Clothing</h3>
              <p className="text-[11px] text-on-primary-fixed/80 mt-1">Resilient play-ready dungarees and heirloom polo layers.</p>
            </div>
          </div>

          {/* Educational Block */}
          <div
            onClick={() => setActiveTab("educational")}
            className={`md:col-span-3 lg:col-span-3 rounded-[2rem] bg-tertiary-fixed cursor-pointer p-6 flex flex-col justify-between group transition-all duration-200 text-left relative overflow-hidden border-2 ${activeTab === 'educational' ? 'border-tertiary shadow-md' : 'border-transparent'
              }`}
          >
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-tertiary-container/30 rounded-full" />
            <div className="bg-surface-container-lowest text-tertiary rounded-full w-9 h-9 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-quicksand font-bold text-lg text-on-tertiary-fixed leading-tight">Educational Tools</h3>
              <p className="text-[11px] text-on-tertiary-fixed/80 mt-1">Mindfulness journals, math shapes, and building blocks.</p>
            </div>
          </div>

          {/* Dolls block */}
          <div
            onClick={() => setActiveTab("dolls")}
            className={`md:col-span-3 lg:col-span-3 rounded-[2rem] bg-secondary-fixed cursor-pointer p-6 flex flex-col justify-between group transition-all duration-200 text-left relative overflow-hidden border-2 ${activeTab === 'dolls' ? 'border-secondary-brand shadow-md' : 'border-transparent'
              }`}
          >
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-secondary-brand/10 rounded-full" />
            <div className="bg-surface-container-lowest text-secondary-brand rounded-full w-9 h-9 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-quicksand font-bold text-lg text-on-secondary-fixed leading-tight">Inclusive Dolls</h3>
              <p className="text-[11px] text-on-secondary-fixed/80 mt-1">Linen plush soft play companions celebrating diversity.</p>
            </div>
          </div>

          {/* Accessories Block */}
          <div
            onClick={() => setActiveTab("accessories")}
            className={`md:col-span-6 lg:col-span-3 rounded-[2rem] bg-surface-container-high p-6 flex flex-col justify-center items-center text-center cursor-pointer group transition-all duration-200 border-2 ${activeTab === 'accessories' ? 'border-primary-brand shadow-md' : 'border-transparent'
              }`}
          >
            <h3 className="font-quicksand font-bold text-md text-on-surface">Accessories &amp; Extras</h3>
            <p className="text-[11px] text-on-surface-variant max-w-[130px] mt-1">Ribbed slouch sock sets and flax sun bonnets.</p>
            <button className="text-primary-brand font-bold text-xs mt-3 select-none flex items-center gap-1 group-hover:underline">
              <span>View Extras</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE PRODUCTS CATOLOG FILTER GRID */}
      <section id="shop" className="py-20 px-6 max-w-7xl mx-auto text-center scroll-mt-24">
        <div>
          <span className="text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed px-3.5 py-1 rounded-full border border-secondary-brand/10 uppercase tracking-widest">
            Aesthetic Closet Lookbook
          </span>
          <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface mt-2">
            Curated Play Closet
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-md mx-auto mt-2.5">
            Filter our premium products using the categories below. Select items to choose sizes or custom colors.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
          {(["all", "baby", "kids", "educational", "dolls", "accessories"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${activeTab === cat
                  ? "bg-primary-brand text-white shadow-md active:scale-95"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-surface-dim"
                }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>

        {/* Dynamic Clothes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <div
                key={p.id}
                className="bg-surface-container-lowest rounded-[2rem] p-4 card-shadow border border-surface-dim/75 flex flex-col justify-between group hover:-translate-y-1 transition-all text-left relative"
              >
                {/* Image panel */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container bg-surface-container-low border border-surface-dim">
                  <img
                    src={p.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    alt={p.name}
                    referrerPolicy="no-referrer"
                  />

                  {/* Heart button */}
                  <button
                    onClick={() => toggleFavorite(p.id, p.name)}
                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 backdrop-blur-xs shadow-xs hover:scale-110 active:scale-90 transition-all text-on-surface-variant z-10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${isFav ? 'text-secondary-brand fill-secondary-brand' : 'text-on-surface-variant/80 hover:text-secondary-brand'
                        }`}
                    />
                  </button>

                  {/* Quick view button */}
                  <button
                    onClick={() => setQuickViewProduct(p)}
                    className="absolute bottom-3.5 right-3.5 p-2 rounded-full bg-primary-brand text-white shadow-md hover:scale-110 active:scale-90 transition-all opacity-0 group-hover:opacity-100 max-md:opacity-100 z-10"
                    title="Quick Details"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {p.isOrganic && (
                    <span className="absolute bottom-3 left-3 bg-tertiary-fixed text-on-tertiary-fixed text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-white/60">
                      🌿 Organic
                    </span>
                  )}
                </div>

                {/* Meta details */}
                <div className="pt-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-brand">
                      {p.category}
                    </span>
                    <h3 className="font-quicksand font-bold text-sm text-on-surface line-clamp-1 group-hover:text-primary-brand transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2">
                    <button
                      onClick={() => window.open(`https://wa.me/15550199?text=Hello!%20I'd%20like%20to%20inquire%20about%20the%20${encodeURIComponent(p.name)}!%20🌸`, "_blank")}
                      className="w-full bg-secondary-brand hover:bg-secondary-container text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. INTERACTIVE STYLING SERVICES SECTION */}
      <section id="styling" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Styling Side Image Grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform lg:-rotate-1">
              <img
                alt="Stylish Kids Curation Setup"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS-lod5i_6L44YlJjtdWOi1-xcGq6ePYxH6JG0Z2C4Jy7v-EdGBKcObRuRxgQmOwLMum8LB7CYJghaXPhXq7FDFAsb4BlwCZ9mTLUE3bC3yUDiHcoB592DUaVemQEg319hJUIzrbVgv3AG34rgnEeJZNX84vvjvmvtujBsSsg1tKvYS3EIILvYj6lplg_xZD7kypz1sNNo4wKs7aU3vTqOkV1kdkNNCnIVqQ8QHoxBDroN5Dq4OgZf5AdCOUbhjFBVHylnoWC1nGw"
                referrerPolicy="no-referrer"
              />
              {/* Dynamic feedback sticker */}
              <div
                onClick={() => setIsQuizOpen(true)}
                className="absolute bottom-8 right-8 bg-primary-brand text-white font-bold text-xs px-5 py-3 rounded-full shadow-lg z-20 border-4 border-white cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>✨</span>
                Take Style Quiz
              </div>
            </div>
          </div>

          {/* Core Interactive Selector Block */}
          <div className="w-full lg:w-1/2 space-y-8 text-left">
            <div>
              <span className="text-[10px] font-bold bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full border border-primary-brand/10 uppercase tracking-widest">
                Personality Mapping
              </span>
              <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface mt-2.5">
                Personal Styling for Smart, Confident Kids
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mt-2">
                Every child has a unique storytelling personality. Our custom styling services translate who they are on the inside into matching outfits they love. Select a signature profile below:
              </p>
            </div>

            {/* Profile Selection Grid */}
            <div className="grid grid-cols-2 gap-3">
              {STYLING_PERSONAS.map((pers) => {
                const PersIcon = personaIcons[pers.id] || Palette;
                const isSelected = activePersonaId === pers.id;
                return (
                  <button
                    key={pers.id}
                    onClick={() => setActivePersonaId(pers.id)}
                    className={`p-4 md:p-5 rounded-[1.5rem] border text-left transition-all ${isSelected
                        ? "bg-surface-container-high border-primary-brand ring-2 ring-primary-brand/5 shadow-xs"
                        : "bg-surface-container-low border-surface-dim hover:bg-surface-container"
                      }`}
                  >
                    <PersIcon className={`w-6 h-6 mb-2.5 ${isSelected ? 'text-primary-brand' : 'text-on-surface-variant'}`} />
                    <h4 className="font-quicksand font-bold text-xs text-on-surface">{pers.title}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{pers.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Persona Details Visualizer */}
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] border border-surface-dim shadow-xs space-y-3.5 relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[9px] font-bold uppercase tracking-widest text-primary-brand/35">
                DETAILS BOARD
              </div>
              <h3 className="font-quicksand font-bold text-[15px] text-primary-brand flex items-center gap-1.5">
                <span>🌸</span> {activePersonaDetail.title} Curation Specs
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {activePersonaDetail.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-surface-container-high">
                <div className="flex gap-1.5 flex-wrap">
                  {activePersonaDetail.traits.map(t => (
                    <span key={t} className="bg-surface-container p-1 px-2.5 rounded-full text-[10px] font-bold border border-surface-dim">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Palette:</span>
                  <div className="flex gap-1">
                    {activePersonaDetail.colorPalette.map(col => (
                      <div key={col} className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: col }} title={col} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Standard actions block */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="bg-on-surface text-surface hover:bg-on-surface-variant font-bold text-xs px-8 py-3.5 rounded-full shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <span>📝</span>
                Diagnose Child Style Lookbook
              </button>

              <button
                onClick={() => window.open(`https://wa.me/15550199?text=Hello%20Skirts%20'n'%20Rompers!%20I%20am%20interested%20in%20obtaining%20a%20personal%20clothing%20capsule%20style:%20${activePersonaDetail.title}!`, "_blank")}
                className="bg-surface border border-outline-variant hover:bg-surface-container text-on-surface font-bold text-xs px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-1.5"
              >
                Request styling info for '{activePersonaDetail.title}'
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section className="bg-primary-container-brand text-on-primary-container-brand py-16 px-6 max-w-7xl mx-auto rounded-[3rem] my-10 relative overflow-hidden shadow-xl">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-surface-tint opacity-20 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-secondary-container opacity-20 rounded-full blur-xl" />

        <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-block p-2.5 rounded-full bg-white/10 text-white font-semibold text-lg animate-pulse">
            💌
          </span>
          <h2 className="font-quicksand font-bold text-3xl text-white">Join the Storyteller Circle</h2>
          <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-md mx-auto">
            Get 15% off your first handcrafted collection, exclusive personal styling invitations, and early updates on organic kids clothing catalog launches!
          </p>

          {newsletterSubscribed ? (
            <div className="bg-white/10 border border-white/20 p-5 rounded-2xl max-w-md mx-auto text-center space-y-1">
              <p className="font-bold text-sm text-white">🎉 You're in! Check your inbox shortly.</p>
              <p className="text-xs text-white/80">We sent you code: *SMILE15* for 15% off your initial premium order.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter parent's email address..."
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 font-medium rounded-full px-5 py-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button
                type="submit"
                className="bg-white text-primary-brand font-bold text-xs px-6 py-3 rounded-full hover:bg-surface-container transition-colors shadow-sm"
              >
                Join Now
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-surface-container dark:bg-inverse-surface w-full px-6 py-16 flex flex-col md:flex-row justify-between items-start gap-10 rounded-t-[3rem] mt-24">

        {/* Brand context info */}
        <div className="space-y-4 max-w-sm text-left">
          <h3 className="font-quicksand font-extrabold text-2xl text-secondary-brand">
            Skirts ‘n’ Rompers
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Expressive premium garments and organic soft companion dolls handcrafted for playful spirits. Making Kids Smile, every single magical step of the story.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => alert("Follow us on Instagram @skirtsnrompers for cute styling updates!")}
              className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-secondary-fixed flex items-center justify-center text-secondary-brand hover:scale-105 transition-all border border-surface-dim"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert("Join our VIP group to request exclusive fabric updates!")}
              className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-secondary-fixed flex items-center justify-center text-secondary-brand hover:scale-105 transition-all border border-surface-dim"
              title="VIP Club"
            >
              <Star className="w-4 h-4 fill-current text-[12px]" />
            </button>
          </div>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-2.5 min-w-[140px] text-left">
          <h4 className="font-quicksand font-bold text-xs text-on-surface uppercase tracking-wider mb-2">
            Care &amp; Shipping
          </h4>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">Organic Wool Care Guide</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">Sustainable Box Returns</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">GOTS Certifications</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">Delivery Timings</a>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-2.5 min-w-[140px] text-left">
          <h4 className="font-quicksand font-bold text-xs text-on-surface uppercase tracking-wider mb-2">
            Links
          </h4>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-on-surface-variant hover:text-secondary-brand transition-colors">F.A.Q.</a>
        </div>

        {/* Action Column */}
        <div className="flex flex-col gap-3 text-left">
          <h4 className="font-quicksand font-bold text-xs text-on-surface uppercase tracking-wider mb-1">
            Parent Support
          </h4>
          <button
            onClick={() => window.open("https://wa.me/15550199?text=Hello%20Skirts%20'n'%20Rompers!%20I%20have%20a%20question%20regarding%20my%20order%20status.🌸", "_blank")}
            className="bg-secondary-brand text-white px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wide hover:translate-y-[-1px] transition-all shadow-md flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Support
          </button>
          <p className="text-[10px] text-on-surface-variant/80 mt-6 md:mt-12">
            © 2026 Skirts ‘n’ Rompers Inc. All rights reserved.
          </p>
        </div>
      </footer>

      {/* MODAL OVERLAYS */}

      {/* Dynamic Style Quiz Wizard */}
      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddProductToCart={handleAddToCart}
      />

      {/* Dynamic Shopping Basket slide-over drawer */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product quick detailed drawer selection lookup */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
}
