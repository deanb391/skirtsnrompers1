import React from "react";
import { 
  X, ArrowLeft, ArrowRight, Brush, Compass, Sparkles, BookOpen, 
  Palette, Map, Volume2, Activity, Heart, Grid, Star, Sparkle, ShoppingCart 
} from "lucide-react";
import { QUIZ_QUESTIONS, STYLING_PERSONAS, PRODUCTS } from "../data";
import { Product } from "../types";

// Icon lookup map
const ICON_MAP: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Brush,
  Compass,
  Sparkles,
  BookOpen,
  Palette,
  Map,
  Volume2,
  Activity,
  Heart,
  Grid,
  Star,
  Sparkle
};

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProductToCart: (product: Product, size: string, color: string) => void;
}

export default function StyleQuizModal({
  isOpen,
  onClose,
  onAddProductToCart
}: StyleQuizModalProps) {
  const [currentStep, setCurrentStep] = React.useState<"intro" | number | "form" | "result">("intro");
  const [answers, setAnswers] = React.useState<Record<number, string>>({});
  const [childName, setChildName] = React.useState("");
  const [childAge, setChildAge] = React.useState("2-3 Years");
  const [calculatedPersonaId, setCalculatedPersonaId] = React.useState<
    "creative" | "elegant" | "adventurous" | "confident"
  >("creative");
  const [addedItems, setAddedItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!isOpen) {
      // reset states on close
      setCurrentStep("intro");
      setAnswers({});
      setChildName("");
      setCalculatedPersonaId("creative");
      setAddedItems([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: number, persona: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: persona }));
    // Automatically advance with a short delay for smooth feel
    setTimeout(() => {
      const currentQuestionIndex = QUIZ_QUESTIONS.findIndex((q) => q.id === questionId);
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep(QUIZ_QUESTIONS[currentQuestionIndex + 1].id);
      } else {
        setCurrentStep("form");
      }
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate dominant persona
    const tallies: Record<"creative" | "elegant" | "adventurous" | "confident", number> = {
      creative: 0,
      elegant: 0,
      adventurous: 0,
      confident: 0
    };

    Object.values(answers).forEach((val) => {
      const typedVal = val as "creative" | "elegant" | "adventurous" | "confident";
      if (typedVal in tallies) {
        tallies[typedVal] += 1;
      }
    });

    // Find persona with maximum count
    let dominant: "creative" | "elegant" | "adventurous" | "confident" = "creative";
    let maxCount = -1;

    (Object.keys(tallies) as Array<"creative" | "elegant" | "adventurous" | "confident">).forEach((key) => {
      const currentVal = tallies[key];
      if (currentVal > maxCount) {
        maxCount = currentVal;
        dominant = key;
      }
    });

    setCalculatedPersonaId(dominant);
    setCurrentStep("result");
  };

  const selectedPersona = STYLING_PERSONAS.find((p) => p.id === calculatedPersonaId)!;

  // Find products suggested by persona
  const suggestedItems = PRODUCTS.filter((p) =>
    selectedPersona.suggestedProducts.includes(p.id)
  );

  const handleAddOutfitToCart = () => {
    const toAdd = suggestedItems.filter(p => !addedItems.includes(p.id));
    toAdd.forEach((product) => {
      // Pick dynamic defaults for color/size
      const size = product.sizes[0] || "One Size";
      const color = product.colors[0] || "Default";
      onAddProductToCart(product, size, color);
    });
    setAddedItems(prev => [...prev, ...suggestedItems.map(p => p.id)]);
  };

  const handleResultWhatsApp = () => {
    const infoStr = childName ? `for my child ${childName} (${childAge})` : "";
    const itemsStr = suggestedItems.map(p => `• ${p.name}`).join("\n");
    const text = encodeURIComponent(
      `Hello Skirts 'n' Rompers! 🌸\n\nI just took the Style Quiz ${infoStr} and got the persona: *${selectedPersona.title}* (${selectedPersona.subtitle})!\n\nI am absolutely in love with these recommended styles:\n${itemsStr}\n\nCould you please pair a custom stylist capsule bag for us? Thank you! ✨`
    );
    window.open(`https://wa.me/15550199?text=${text}`, "_blank");
  };

  const renderBackArrow = () => {
    if (currentStep === "intro") return null;
    return (
      <button
        type="button"
        onClick={() => {
          if (currentStep === "result") {
            setCurrentStep("form");
          } else if (currentStep === "form") {
            setCurrentStep(QUIZ_QUESTIONS[QUIZ_QUESTIONS.length - 1].id);
          } else {
            const index = QUIZ_QUESTIONS.findIndex((q) => q.id === currentStep);
            if (index === 0) {
              setCurrentStep("intro");
            } else {
              setCurrentStep(QUIZ_QUESTIONS[index - 1].id);
            }
          }
        }}
        className="absolute left-6 top-5 flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors bg-surface-container/60 hover:bg-surface-container px-3 py-1.5 rounded-full"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto font-bevietnam flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main card */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-[2rem] shadow-2xl overflow-hidden border border-surface-dim/70 z-10 flex flex-col max-h-[90vh]">
        {/* Header background blob */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-surface-container-high rounded-full blur-[40px] opacity-60 -z-10" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary-fixed/30 rounded-full blur-[40px] opacity-60 -z-10" />

        {/* Floating cross to close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-5 p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back navigational assistance */}
        {renderBackArrow()}

        <div className="p-8 md:p-10 flex-1 overflow-y-auto mt-6">
          {/* STEP 1: WELCOME SLIDER */}
          {currentStep === "intro" && (
            <div className="flex flex-col items-center text-center space-y-6 py-6 scrollbar-none">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary-brand text-2xl font-black">
                ✨
              </div>
              <div className="space-y-2">
                <span className="bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider text-[10px] font-bold px-3 py-1 rounded-full">
                  Interactive Curation
                </span>
                <h2 className="font-quicksand font-bold text-3xl text-on-surface leading-tight">
                  Childhood Styling Quiz
                </h2>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  Discover how their distinct playful personality shapes their look. Our curation algorithm pairs skin-safe, premium materials to match their lifestyle traits.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md pt-2">
                <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-dim/60 text-left">
                  <span className="text-lg">🎨</span>
                  <h4 className="font-quicksand font-semibold text-xs text-on-surface mt-1">Creative or Classic</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Custom apparel based on expression preferences.</p>
                </div>
                <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-dim/60 text-left">
                  <span className="text-lg">🧸</span>
                  <h4 className="font-quicksand font-semibold text-xs text-on-surface mt-1">Organic & Skin-safe</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Selected textiles certified 100% fine organic cotton.</p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(QUIZ_QUESTIONS[0].id)}
                className="bg-primary-brand text-on-primary-brand-brand px-10 py-4 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,64,224,0.15)] hover:shadow-[0_8px_20px_rgba(0,64,224,0.25)] hover:-translate-y-0.5 transition-all flex items-center gap-2 mt-4"
              >
                Let’s Match Outfits
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: QUESTIONS */}
          {typeof currentStep === "number" && (() => {
            const questionIndex = QUIZ_QUESTIONS.findIndex((q) => q.id === currentStep);
            const question = QUIZ_QUESTIONS[questionIndex];
            if (!question) return null;

            return (
              <div className="space-y-6 py-6">
                {/* Step indicator */}
                <div className="flex justify-between items-center text-xs text-on-surface-variant">
                  <span className="font-semibold uppercase tracking-widest text-[10px]">
                    Step {questionIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex gap-1.5">
                    {QUIZ_QUESTIONS.map((q, idx) => (
                      <span 
                        key={q.id}
                        className={`w-5 h-1.5 rounded-full transition-all duration-300 ${
                          idx <= questionIndex ? 'bg-primary-brand' : 'bg-surface-container-high'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-quicksand font-bold text-xl md:text-2xl text-on-surface leading-snug">
                  {question.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  {question.options.map((opt, i) => {
                    const OptionIcon = ICON_MAP[opt.icon] || Brush;
                    const isSelected = answers[question.id] === opt.persona;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(question.id, opt.persona)}
                        className={`p-5 rounded-[1.5rem] border text-left transition-all relative ${
                          isSelected 
                            ? "bg-surface-container-high border-primary-brand ring-2 ring-primary-brand/10 transform scale-[0.99]" 
                            : "bg-surface-container-low border-surface-dim hover:border-outline hover:bg-surface-container-high/40"
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          <div className={`p-2.5 rounded-xl shrink-0 ${
                            isSelected ? 'bg-primary-brand text-white' : 'bg-surface-container-high text-primary-brand/80'
                          }`}>
                            <OptionIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-quicksand font-bold text-[14px] text-on-surface leading-snug">
                              {opt.label}
                            </h4>
                            <p className="text-[12px] text-on-surface-variant mt-1.5 leading-relaxed">
                              {opt.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* STEP 3: DETAILS FORM */}
          {currentStep === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-6 py-4">
              <div className="text-center max-w-md mx-auto space-y-2">
                <span className="text-2xl">📝</span>
                <h3 className="font-quicksand font-bold text-2xl text-on-surface">Almost Curation Time!</h3>
                <p className="text-xs text-on-surface-variant">
                  We customize size, styling lengths, and organic pairings to fit your little one's fit perfectly.
                </p>
              </div>

              <div className="space-y-4 max-w-md mx-auto pt-3">
                <div className="space-y-1.5">
                  <label htmlFor="child-name" className="text-xs font-bold uppercase tracking-wider text-on-surface">
                    Child's Name (Optional)
                  </label>
                  <input
                    id="child-name"
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Liam, Sophie"
                    className="w-full bg-surface-container-low border border-surface-dim font-medium rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="child-age" className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Age Range
                    </label>
                    <select
                      id="child-age"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full bg-surface-container-low border border-surface-dim font-medium rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-all"
                    >
                      <option>0-6 Months</option>
                      <option>6-12 Months</option>
                      <option>12-24 Months</option>
                      <option>2-3 Years</option>
                      <option>4-6 Years</option>
                      <option>7+ Years</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="clothing-size" className="text-xs font-bold uppercase tracking-wider text-on-surface">
                      Standard Size
                    </label>
                    <select
                      id="clothing-size"
                      className="w-full bg-surface-container-low border border-surface-dim font-medium rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand transition-all"
                    >
                      <option>Match Age Range</option>
                      <option>Slightly Slimmer Fit</option>
                      <option>Generous/Room to Grow</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-secondary-brand text-white px-10 py-4 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(184,0,73,0.15)] hover:shadow-[0_8px_20px_rgba(184,0,73,0.25)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  View Custom Curation Lookbook
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: RESULT */}
          {currentStep === "result" && (
            <div className="space-y-6 py-6 text-on-surface">
              {/* Header profile */}
              <div className="bg-pastel-gradient p-6 rounded-[2rem] border border-surface-dim text-center space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-4 text-xs font-bold text-primary-brand/40 uppercase tracking-widest">
                  LOOKBOOK
                </div>
                
                <span className="inline-block p-3 rounded-full bg-surface-container-lowest text-secondary-brand font-black text-2xl shadow-sm">
                  ✨
                </span>
                <h3 className="font-quicksand font-bold text-2xl text-on-surface">
                  {childName ? `${childName}'s Look:` : "Calculated Match:"} {selectedPersona.title}
                </h3>
                <p className="text-xs text-secondary-brand font-semibold italic">
                  &ldquo;{selectedPersona.subtitle}&rdquo;
                </p>
                <div className="flex justify-center gap-1.5 max-w-xs mx-auto pt-1">
                  {selectedPersona.traits.map((tr) => (
                    <span key={tr} className="bg-surface-container-lowest text-on-surface text-[10px] font-bold px-2.5 py-1 rounded-full border border-surface-dim">
                      #{tr}
                    </span>
                  ))}
                </div>
              </div>

              {/* Personality descriptive report */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Curation Insight</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedPersona.description} We recommend outfit weights that combine premium cotton resilience with beautiful aesthetic styling coordinates.
                </p>
              </div>

              {/* Recommended items grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider">Suggested Styling Outfit Mini-Capsule</h4>
                <div className="grid grid-cols-3 gap-3">
                  {suggestedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-surface-container-low p-2 rounded-2xl border border-surface-dim flex flex-col items-center text-center"
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container-high border border-surface-dim">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h5 className="font-quicksand font-bold text-[11px] text-on-surface mt-2 truncate w-full">
                        {item.name}
                      </h5>
                      <span className="text-[10px] font-bold text-primary-brand mt-0.5">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color swatches rendering */}
              <div className="flex items-center justify-between bg-surface-container-low p-3.5 rounded-2xl border border-surface-dim text-xs">
                <div className="font-semibold">Recommended Custom Wardrobe Swatches:</div>
                <div className="flex gap-2">
                  {selectedPersona.colorPalette.map((col) => (
                    <div 
                      key={col} 
                      className="w-5 h-5 rounded-full border border-white shadow-xs" 
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  ))}
                </div>
              </div>

              {/* Order triggers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <button
                  onClick={handleAddOutfitToCart}
                  disabled={suggestedItems.every(p => addedItems.includes(p.id))}
                  className={`py-3.5 px-6 rounded-full font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                    suggestedItems.every(p => addedItems.includes(p.id))
                      ? "bg-surface-container-high text-on-surface-variant/50 border border-surface-dim cursor-not-allowed"
                      : "bg-primary-brand hover:bg-primary-container-brand text-white"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {suggestedItems.every(p => addedItems.includes(p.id)) 
                    ? "Outfit Stack Added to Cart" 
                    : "Add Entire Matching Outfit to Cart"
                  }
                </button>
                <button
                  onClick={handleResultWhatsApp}
                  className="bg-surface-container text-on-surface border border-outline-variant py-3.5 px-6 rounded-full font-bold text-xs hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Consult a Personal Stylist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
