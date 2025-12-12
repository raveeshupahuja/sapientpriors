import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Make Your AI Smarter With Every Conversation";
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const queueReplayRef = useRef(false);

  // Create audio context for typing sound
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Resume audio context if it's suspended (required by browser autoplay policies)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
    return audioContextRef.current;
  }, []);

  const playTypingSound = useCallback(() => {
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        return; // Skip sound if context not available
      }

      // Mechanical keyboard click sound - two quick frequencies for click
      const frequencies = [1200, 800];
      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq + Math.random() * 100;
        oscillator.type = 'triangle'; // Warmer sound

        const startTime = ctx.currentTime + (i * 0.005);
        gainNode.gain.setValueAtTime(i === 0 ? 0.04 : 0.03, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.025);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.025);
      });
    } catch (error) {
      // Silently fail if audio doesn't work
      console.log('Audio playback failed:', error);
    }
  }, [initAudioContext]);

  const startTypingAnimation = useCallback(() => {
    if (isTyping) {
      // If already typing, queue another round
      queueReplayRef.current = true;
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTyping(true);
    setDisplayedText("");
    setShowCursor(true);

    let charIndex = 0;

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

        timeoutRef.current = setTimeout(typeNextChar, delay);
      } else {
        // Hide cursor after all text is typed
        timeoutRef.current = setTimeout(() => {
          setShowCursor(false);
          setIsTyping(false);

          // Check if another animation was queued
          if (queueReplayRef.current) {
            queueReplayRef.current = false;
            startTypingAnimation();
          }
        }, 500);
      }
    };

    typeNextChar();
  }, [isTyping, playTypingSound, fullText]);

  // Auto-start animation on mount
  useEffect(() => {
    startTypingAnimation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle click to replay animation
  const handleHeroClick = () => {
    // Initialize audio context on first interaction
    const ctx = initAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        console.log('Hero audio context resumed');
      });
    }

    // Start or queue animation
    startTypingAnimation();
  };

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
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center pb-16">
        {/* Main Headline */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight min-h-[200px] md:min-h-[240px] lg:min-h-[280px] cursor-pointer"
          onClick={handleHeroClick}
          title="Click to replay animation"
        >
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
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={scrollToProduct}
            className="px-8 text-lg"
            data-testid="button-hero-view-demo"
          >
            View Demo
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToProduct}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer animate-bounce flex items-center justify-center"
          aria-label="Scroll to learn more"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}