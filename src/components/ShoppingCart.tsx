import React from "react";
import { X, Minus, Plus, Trash2, Send, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: ShoppingCartProps) {
  const [isCheckedOut, setIsCheckedOut] = React.useState(false);
  const [whatsappSent, setWhatsappSent] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setIsCheckedOut(false);
      setWhatsappSent(false);
    }
  }, [isOpen]);

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const handleCheckoutSimulate = () => {
    setIsCheckedOut(true);
  };

  const handleSendToWhatsApp = () => {
    const listText = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} - $${item.product.price * item.quantity}`
      )
      .join("\n");
    const text = encodeURIComponent(
      `Hello Skirts 'n' Rompers! 🌸\n\nI would love to order these lovely items:\n\n${listText}\n\n*Total:* $${totalPrice}\n\nCould you please help me process my order? Thank you! ✨`
    );
    window.open(`https://wa.me/15550199?text=${text}`, "_blank");
    setWhatsappSent(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-bevietnam">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-surface-dim flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-brand" />
              <h2 className="font-quicksand font-bold text-lg text-on-surface">Your Playful Cart</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isCheckedOut ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-secondary-brand animate-bounce">
                  🌸
                </div>
                <h3 className="font-quicksand font-bold text-2xl text-on-surface">Making You Smile!</h3>
                <p className="text-sm text-on-surface-variant max-w-xs">
                  Your premium outfit selections are ready for our stylists. We've compiled your list perfectly.
                </p>
                
                <div className="bg-surface-container-low p-4 rounded-xl w-full border border-surface-dim mt-4">
                  <div className="text-left text-xs space-y-2 font-mono">
                    <p className="font-semibold text-on-surface">ORDER SUMMARY</p>
                    {cartItems.map((item, i) => (
                      <p key={i} className="text-on-surface-variant truncate">
                        {item.quantity}x {item.product.name} ({item.selectedColor})
                      </p>
                    ))}
                    <p className="border-t border-dashed border-outline-variant pt-2 font-bold text-on-surface flex justify-between">
                      <span>Total Approx:</span>
                      <span>${totalPrice}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full pt-4">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full bg-secondary-brand text-white py-3.5 px-4 rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-secondary-container transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {whatsappSent ? "Sent! Open WhatsApp Again" : "Send Order via WhatsApp"}
                  </button>
                  <button
                    onClick={() => {
                      onClearCart();
                      onClose();
                    }}
                    className="w-full text-on-surface-variant text-xs underline font-medium hover:text-on-surface"
                  >
                    Start a New Selection
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="text-4xl">🧸</div>
                <h3 className="font-quicksand font-semibold text-lg text-on-surface">Your cart is empty</h3>
                <p className="text-sm text-on-surface-variant max-w-xs">
                  Fill it with delightful organic outfits, dolls that represent every child, and confidence-building journals!
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary-brand text-white px-6 py-2.5 rounded-full font-semibold text-xs shadow-sm hover:bg-primary-container-brand transition-all mt-2"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 pb-6 border-b border-surface-container-high"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low shrink-0 border border-surface-dim">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-quicksand font-semibold text-sm text-on-surface truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs mt-1 text-on-surface-variant">
                        <span className="bg-surface px-2 py-0.5 rounded-full border border-surface-dim">
                          Color: {item.selectedColor}
                        </span>
                        <span className="bg-surface px-2 py-0.5 rounded-full border border-surface-dim">
                          Size: {item.selectedSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-surface-dim bg-surface rounded-full p-1">
                          <button
                            onClick={() => onUpdateQuantity(index, -1)}
                            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold px-1 text-on-surface">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, 1)}
                            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-quicksand font-bold text-sm text-on-surface">
                            ${item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-on-surface-variant hover:text-error transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && !isCheckedOut && (
            <div className="border-t border-surface-dim p-6 bg-surface-container-low space-y-4">
              <div className="flex items-center justify-between text-on-surface">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="font-quicksand font-bold text-xl">${totalPrice}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Free personal curation on all multi-item outfits. Hand-prepared inside our premium, sustainable canvas storage boxes.
              </p>
              <button
                onClick={handleCheckoutSimulate}
                className="w-full bg-primary-brand text-white py-4 px-4 rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-primary-container-brand transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Go to Curation Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
