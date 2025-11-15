import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Make Your AI Smarter With Every Conversation";

  useEffect(() => {
    let charIndex = 0;

    // Create audio context for typing sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playTypingSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.03);
    };

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex + 1));
        if (fullText[charIndex] !== ' ') {
          playTypingSound();
        }

        charIndex++;

        // Calculate delay for next character with emphasis on "Smarter" and "Conversation"
        let delay = 60; // Default typing speed

        // Add pause after typing "Smarter" (position 19)
        if (charIndex === 20) {
          delay = 400;
        }
        // Add pause after typing "Conversation" (ends at position 47)
        else if (charIndex === 48) {
          delay = 400;
        }
        // Slow down while typing "Smarter" (positions 13-19)
        else if (charIndex >= 13 && charIndex <= 19) {
          delay = 100;
        }
        // Slow down while typing "Conversation" (positions 36-47)
        else if (charIndex >= 36 && charIndex <= 47) {
          delay = 100;
        }

        setTimeout(typeNextChar, delay);
      } else {
        // Hide cursor after all text is typed
        setTimeout(() => setShowCursor(false), 500);
      }
    };

    typeNextChar();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProduct = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center pb-16">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight min-h-[200px] md:min-h-[240px] lg:min-h-[280px]">
          <span className="inline-block whitespace-pre-wrap">
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          AI that learns what your users mean, not just what they say
        </p>
        <p className="text-base text-muted-foreground/80 mb-10 max-w-xl mx-auto">
          Learns explicit preferences, discovers implicit ones, and adapts to each user's unique style
        </p>

        {/* Single CTA */}
        <Button
          size="lg"
          onClick={scrollToContact}
          className="px-8 text-lg"
          data-testid="button-hero-get-started"
        >
          Get Started
        </Button>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProduct}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer animate-bounce"
        aria-label="Scroll to learn more"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}