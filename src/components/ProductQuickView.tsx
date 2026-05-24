import React from "react";
import { X, Heart, Shield, Sparkle, MessageCircle } from "lucide-react";
import { Product } from "../types";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({
  product,
  onClose
}: ProductQuickViewProps) {
  const [selectedColor, setSelectedColor] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedSize(product.sizes[0] || "");
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-bevietnam flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-[2rem] shadow-2xl overflow-hidden border border-surface-dim z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs hover:bg-surface-container-low text-on-surface-variant transition-colors z-20 shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square md:aspect-auto md:h-full bg-surface-container-low border-b md:border-b-0 md:border-r border-surface-dim">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.isOrganic && (
            <div className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] px-3 py-1 rounded-full shadow-md flex items-center gap-1 border-2 border-white">
              🌱 GOTS Organic
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-none">
          <div className="space-y-4">
            <div>
              <span className="text-secondary-brand font-bold text-[10px] uppercase tracking-wider">
                Skirts ‘n’ Rompers Premium
              </span>
              <h3 className="font-quicksand font-bold text-lg md:text-xl text-on-surface mt-0.5 leading-snug">
                {product.name}
              </h3>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Select Custom Tone
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                      selectedColor === color
                        ? "bg-primary-brand text-white shadow-xs"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-surface-dim"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Select Play Size
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                      selectedSize === size
                        ? "bg-on-surface text-surface shadow-xs"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-surface-dim"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-surface-container-high mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const text = `Hello! I'd like to inquire about the ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''}${selectedColor ? ` (Color: ${selectedColor})` : ''}. 🌸`;
                  window.open(`https://wa.me/15550199?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex-1 bg-secondary-brand hover:bg-secondary-container text-white py-3 rounded-full font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message via WhatsApp</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full border transition-all ${
                  isFavorite 
                    ? "bg-secondary-fixed border-secondary-brand/40 text-secondary-brand" 
                    : "bg-surface border-surface-dim text-on-surface-variant hover:text-secondary-brand"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-on-surface-variant/80 font-medium justify-center">
              <Shield className="w-3.5 h-3.5 text-secondary-brand shrink-0" />
              <span>Free styling replacements & organic wash care manuals included.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
