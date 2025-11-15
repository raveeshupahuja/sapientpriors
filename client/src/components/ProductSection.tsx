import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

export default function ProductSection() {
  // Without SapientPriors animation states
  const [withoutStep, setWithoutStep] = useState(0);
  const [withoutMondayText, setWithoutMondayText] = useState("");
  const [withoutTuesdayText, setWithoutTuesdayText] = useState("");
  const [withoutWednesdayText, setWithoutWednesdayText] = useState("");
  const [withoutFrustration, setWithoutFrustration] = useState(0);

  // With SapientPriors animation states
  const [withStep, setWithStep] = useState(0);
  const [withMondayText, setWithMondayText] = useState("");
  const [withTuesdayAiText, setWithTuesdayAiText] = useState("");
  const [withTuesdayUserEdit, setWithTuesdayUserEdit] = useState("");
  const [withWednesdayText, setWithWednesdayText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [withSatisfaction, setWithSatisfaction] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(interval => clearTimeout(interval));
    intervalsRef.current = [];
  };

  // Helper function to type out text character by character
  const typeText = (text: string, setter: (text: string) => void, speed: number, startDelay: number) => {
    return new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index <= text.length) {
            setter(text.substring(0, index));
            index++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, speed);
        intervalsRef.current.push(interval);
      }, startDelay);
      intervalsRef.current.push(timeout);
    });
  };

  const runAnimationSequence = async () => {
    clearAllIntervals();

    // Reset all states
    setWithoutStep(0);
    setWithoutMondayText("");
    setWithoutTuesdayText("");
    setWithoutWednesdayText("");
    setWithoutFrustration(0);
    setWithStep(0);
    setWithMondayText("");
    setWithTuesdayAiText("");
    setWithTuesdayUserEdit("");
    setWithWednesdayText("");
    setIsEditing(false);
    setShowHighlight(false);
    setWithSatisfaction(0);

    const wait = (ms: number) => new Promise(resolve => {
      const timeout = setTimeout(resolve, ms);
      intervalsRef.current.push(timeout);
    });

    try {
      // === WITHOUT SAPIENTPRIORS (LEFT SIDE) ===

      // Monday - User types preference
      setWithoutStep(1);
      await typeText('"I prefer concise emails"', setWithoutMondayText, 30, 500);
      await wait(800);

      // Tuesday - AI types long email
      setWithoutStep(2);
      await wait(300);
      await typeText('Hi John,\n\nI hope this email finds you well and you\'re having a great week so far. I wanted to reach out regarding the quarterly report...', setWithoutTuesdayText, 15, 0);
      await wait(500);
      setWithoutFrustration(1);
      await wait(1000);

      // Wednesday - Still long emails
      setWithoutStep(3);
      await wait(300);
      await typeText('Still generates long emails, user frustrated', setWithoutWednesdayText, 20, 0);
      await wait(500);
      setWithoutFrustration(2);
      await wait(1500);

      // === WITH SAPIENTPRIORS (RIGHT SIDE) ===

      // Monday - User types, system learns
      setWithStep(1);
      await typeText('"I prefer concise emails"', setWithMondayText, 30, 500);
      await wait(1000);

      // Tuesday - AI types suggestion
      setWithStep(2);
      await wait(300);
      await typeText('Hi John,\n\nQuick update on the Q4 report...', setWithTuesdayAiText, 15, 0);
      await wait(800);

      // User edits the text
      setIsEditing(true);
      await wait(300);

      // Delete "on the Q4 report"
      const fullText = "Quick update on the Q4 report...";
      for (let i = fullText.length; i >= 13; i--) {
        setWithTuesdayUserEdit(fullText.substring(0, i));
        await wait(40);
      }

      // Type "re: Q4 report..."
      const newText = "Quick update re: Q4 report...";
      for (let i = 14; i <= newText.length; i++) {
        setWithTuesdayUserEdit(newText.substring(0, i));
        await wait(60);
      }

      setIsEditing(false);
      await wait(500);
      setWithStep(3);
      setWithSatisfaction(1);
      await wait(1500);

      // Wednesday - AI uses learned preference
      setWithStep(4);
      await wait(300);
      await typeText('Hi Sarah,\n\nRe: Budget approval—approved. Will confirm by EOD.', setWithWednesdayText, 15, 0);
      await wait(500);
      setShowHighlight(true);
      setWithSatisfaction(2);
      await wait(3000);

      // Restart animation
      if (isInView) {
        runAnimationSequence();
      }
    } catch (error) {
      // Animation was interrupted, ignore
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Section in view - starting animation');
            setIsInView(true);
            runAnimationSequence();
          } else {
            console.log('Section out of view - stopping animation');
            setIsInView(false);
            clearAllIntervals();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearAllIntervals();
    };
  }, []);
  return (
    <section id="product" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            What Is It?
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-4 font-medium">
            A REST API that doesn't just remember—it learns. Discovers what your users want, even when they don't say it.
          </p>
          <p className="text-base lg:text-lg text-muted-foreground mb-6">
            Learns explicit preferences your users tell it, discovers implicit ones they don't, and adapts to each user's unique style.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-8">
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">POST /api/learn</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg font-mono">GET /api/context</span>
            <span className="px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground">2 Endpoints</span>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground">
            Works with OpenAI, Anthropic, Google, or any AI provider. No fine-tuning required.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
            The Problem: AI Applications Don't Remember
          </h3>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Your users have to repeat themselves in every conversation. Each session starts from scratch, creating a frustrating experience.
          </p>

          {/* Before/After Visual Comparison */}
          <div ref={containerRef} className="mb-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Without */}
              <Card className="p-8 border-2 border-destructive/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-semibold">
                    Without SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Monday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground transition-all duration-500 ${withoutStep >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic min-h-[20px]">
                      {withoutMondayText}
                      {withoutStep >= 1 && withoutMondayText.length < 27 && <span className="animate-pulse">|</span>}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl text-muted-foreground transition-all duration-500 ${withoutStep >= 2 ? 'scale-110' : 'scale-100'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground transition-all duration-500 ${withoutStep >= 2 ? 'opacity-100 ring-2 ring-destructive ring-offset-2' : 'opacity-30'}`}>
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className="text-xs bg-background/50 p-3 rounded mb-2 font-mono whitespace-pre-wrap min-h-[80px]">
                      {withoutTuesdayText}
                      {withoutStep >= 2 && withoutTuesdayText.length < 150 && <span className="animate-pulse">|</span>}
                      {withoutTuesdayText.length >= 150 && (
                        <p className={`text-destructive transition-all duration-300 mt-2 ${withoutFrustration >= 1 ? 'font-bold' : ''}`}>❌ Too long again!</p>
                      )}
                    </div>
                    {withoutFrustration >= 1 && (
                      <p className={`text-xs text-muted-foreground italic transition-all duration-300 ${withoutFrustration >= 1 ? 'font-semibold' : ''}`}>User has to remind: "Keep it concise!"</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl text-muted-foreground transition-all duration-500 ${withoutStep >= 3 ? 'scale-110' : 'scale-100'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground transition-all duration-500 ${withoutStep >= 3 ? 'opacity-100 ring-2 ring-destructive ring-offset-2' : 'opacity-30'}`}>
                    <p className="text-sm font-semibold mb-2">Wednesday - Same problem:</p>
                    <p className="text-xs text-muted-foreground min-h-[20px]">
                      {withoutWednesdayText}
                      {withoutStep >= 3 && withoutWednesdayText.length < 45 && <span className="animate-pulse">|</span>}
                    </p>
                  </div>

                  {/* Frustration indicator */}
                  <div className={`mt-4 p-4 bg-destructive/5 rounded-lg transition-all duration-500 ${withoutFrustration >= 2 ? 'bg-destructive/20 ring-2 ring-destructive' : ''}`}>
                    <p className={`text-sm text-destructive transition-all duration-300 ${withoutFrustration >= 2 ? 'font-bold text-lg' : 'font-semibold'}`}>User frustration increases ↗</p>
                  </div>
                </div>
              </Card>

              {/* With */}
              <Card className="p-8 border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-semibold">
                    With SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Monday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-primary transition-all duration-500 ${withStep >= 1 ? 'opacity-100 scale-100 ring-2 ring-primary ring-offset-2' : 'opacity-30 scale-95'}`}>
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic mb-2 min-h-[20px]">
                      {withMondayText}
                      {withStep >= 1 && withMondayText.length < 27 && <span className="animate-pulse">|</span>}
                    </p>
                    {withMondayText.length >= 27 && (
                      <p className={`text-xs text-primary transition-all duration-300 ${withStep >= 1 ? 'font-bold' : ''}`}>✓ Learned and stored</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl text-primary transition-all duration-500 ${withStep >= 2 ? 'scale-110' : 'scale-100'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-primary relative transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-30'} ${isEditing ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className={`text-xs bg-muted/30 p-3 rounded mb-2 font-mono whitespace-pre-wrap relative ${isEditing ? 'shadow-lg' : ''} min-h-[60px]`}>
                      {!isEditing ? withTuesdayAiText : withTuesdayUserEdit}
                      {withStep >= 2 && !isEditing && withTuesdayAiText.length < 45 && <span className="animate-pulse">|</span>}
                      {isEditing && (
                        <>
                          <span className="inline-block w-0.5 h-3 bg-primary animate-pulse ml-0.5" />
                          <span className="absolute -right-8 top-2 text-primary animate-pulse">✏️</span>
                        </>
                      )}
                    </div>
                    {withTuesdayAiText.length >= 40 && (
                      <div className={`transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-60'}`}>
                        <p className="text-xs text-muted-foreground mb-2">
                          User edits: <span className="line-through">on the Q4 report</span> → <span className="font-bold text-primary">re: Q4 report</span>
                        </p>
                        {withStep >= 3 && (
                          <p className={`text-xs text-primary transition-all duration-500 ${withStep >= 3 ? 'font-bold' : ''}`}>
                            ✓ Learns: user prefers "re:" over "regarding/about"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl text-primary transition-all duration-500 ${withStep >= 4 ? 'scale-110' : 'scale-100'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-primary transition-all duration-500 ${withStep >= 4 ? 'opacity-100 ring-2 ring-primary ring-offset-2' : 'opacity-30'}`}>
                    <p className="text-sm font-semibold mb-2">Wednesday - AI suggests:</p>
                    <div className="text-xs bg-muted/30 p-3 rounded mb-2 font-mono whitespace-pre-wrap min-h-[60px]">
                      {withWednesdayText.includes('Re:') && showHighlight ? (
                        <>
                          {withWednesdayText.substring(0, withWednesdayText.indexOf('Re:'))}
                          <span className="bg-primary/20 px-1 rounded font-bold">Re:</span>
                          {withWednesdayText.substring(withWednesdayText.indexOf('Re:') + 3)}
                        </>
                      ) : (
                        withWednesdayText
                      )}
                      {withStep >= 4 && withWednesdayText.length < 55 && <span className="animate-pulse">|</span>}
                    </div>
                    {withWednesdayText.length >= 50 && (
                      <p className="text-xs text-primary">✓ Automatically applies: concise + "re:" style</p>
                    )}
                  </div>

                  {/* Satisfaction indicator */}
                  <div className={`mt-4 p-4 bg-primary/10 rounded-lg transition-all duration-500 ${withSatisfaction >= 2 ? 'bg-primary/20 ring-2 ring-primary' : ''}`}>
                    <p className={`text-sm text-primary transition-all duration-300 ${withSatisfaction >= 2 ? 'font-bold text-lg' : 'font-semibold'}`}>User satisfaction increases ↗</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">Without Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Users repeat preferences every conversation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>No memory of past interactions or corrections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Each session starts from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Frustrating, repetitive user experience</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 border-2 border-primary/20 bg-primary/5">
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-4">With Our API</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Learns explicit preferences your users tell it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Discovers implicit preferences they don't mention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Adapts to each user's unique style and patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Gets smarter with every conversation</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}