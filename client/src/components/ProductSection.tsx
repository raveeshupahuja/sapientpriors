import { Card } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";

export default function ProductSection() {
  // Label animation states
  const [showWithoutLabel, setShowWithoutLabel] = useState(false);
  const [showWithLabel, setShowWithLabel] = useState(false);

  // Without SapientPriors animation states
  const [withoutStep, setWithoutStep] = useState(0);
  const [withoutMondayText, setWithoutMondayText] = useState("");
  const [withoutTuesdayText, setWithoutTuesdayText] = useState("");
  const [withoutTuesdayReminderText, setWithoutTuesdayReminderText] = useState("");
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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showClickPrompt, setShowClickPrompt] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const queueNextAnimationRef = useRef(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(interval => clearTimeout(interval));
    intervalsRef.current = [];
  };

  // Initialize audio context for typing sounds
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Resume audio context if it's suspended (required by browser autoplay policies)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
    return audioContextRef.current;
  };

  const playUserTypingSound = (frustrationLevel: number = 0) => {
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        return; // Skip sound if context not available
      }

      // Sharp, crisp typing - like a modern laptop keyboard
      const frustrationMultiplier = 1 + (frustrationLevel * 0.6); // 1x, 1.6x, 2.2x volume

      // Primary click
      const oscillator1 = ctx.createOscillator();
      const gainNode1 = ctx.createGain();

      oscillator1.connect(gainNode1);
      gainNode1.connect(ctx.destination);

      // Higher, sharper frequency for modern keyboard feel
      oscillator1.frequency.value = 1800 + Math.random() * 400;
      oscillator1.type = frustrationLevel > 0 ? 'sawtooth' : 'sine';

      const volume1 = 0.05 * frustrationMultiplier;
      gainNode1.gain.setValueAtTime(volume1, ctx.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015);

      oscillator1.start(ctx.currentTime);
      oscillator1.stop(ctx.currentTime + 0.015);

      // Secondary resonance for depth
      const oscillator2 = ctx.createOscillator();
      const gainNode2 = ctx.createGain();

      oscillator2.connect(gainNode2);
      gainNode2.connect(ctx.destination);

      oscillator2.frequency.value = 600 + Math.random() * 200;
      oscillator2.type = 'triangle';

      const volume2 = 0.02 * frustrationMultiplier;
      gainNode2.gain.setValueAtTime(volume2, ctx.currentTime + 0.003);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.02);

      oscillator2.start(ctx.currentTime + 0.003);
      oscillator2.stop(ctx.currentTime + 0.02);

      // Add aggressive impact when frustrated
      if (frustrationLevel > 0) {
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.015, ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
          noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseData.length * 0.3));
        }

        const noiseSource = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const noiseFilter = ctx.createBiquadFilter();

        noiseSource.buffer = noiseBuffer;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 800;

        const impactVolume = 0.06 * frustrationLevel;
        noiseGain.gain.setValueAtTime(impactVolume, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015);

        noiseSource.start(ctx.currentTime);
      }
    } catch (error) {
      console.log('User typing sound failed:', error);
    }
  };

  const playAITypingSound = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        return;
      }

      // Warm mechanical keyboard click - like the old user sound
      const frequencies = [1200, 800];

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq + Math.random() * 100;
        oscillator.type = 'triangle'; // Warmer sound

        const startTime = ctx.currentTime + (i * 0.005);
        gainNode.gain.setValueAtTime(i === 0 ? 0.025 : 0.015, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.025);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.025);
      });
    } catch (error) {
      console.log('AI typing sound failed:', error);
    }
  };

  const playFrustratedKeyboardSound = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        return;
      }

      // Aggressive keyboard hammering - multiple keys hit hard and fast
      const times = [0, 0.06, 0.11, 0.15, 0.19, 0.24, 0.3];
      times.forEach((time, index) => {
        // Each keystroke has multiple harmonics for harsh, impactful sound
        const fundamentalFreq = 300 + Math.random() * 400;
        const harmonics = [fundamentalFreq, fundamentalFreq * 1.5, fundamentalFreq * 2.2];

        harmonics.forEach((freq, harmIndex) => {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);

          // Mix of sawtooth and square for harsh, aggressive tone
          oscillator.frequency.value = freq;
          oscillator.type = harmIndex === 0 ? 'sawtooth' : 'square';

          const startTime = ctx.currentTime + time;
          // Louder attack, quick decay - simulates hard key strike
          const volume = harmIndex === 0 ? 0.12 : 0.06 / (harmIndex + 1);
          gainNode.gain.setValueAtTime(volume, startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.04);

          oscillator.start(startTime);
          oscillator.stop(startTime + 0.04);
        });

        // Add percussive "thunk" for key bottoming out
        if (index % 2 === 0) {
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
          const noiseData = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseData.length * 0.3));
          }

          const noiseSource = ctx.createBufferSource();
          const noiseGain = ctx.createGain();
          const noiseFilter = ctx.createBiquadFilter();

          noiseSource.buffer = noiseBuffer;
          noiseSource.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(ctx.destination);

          noiseFilter.type = 'lowpass';
          noiseFilter.frequency.value = 200 + Math.random() * 100;

          noiseGain.gain.setValueAtTime(0.08, ctx.currentTime + time);
          noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.03);

          noiseSource.start(ctx.currentTime + time);
        }
      });
    } catch (error) {
      console.log('Frustrated keyboard sound failed:', error);
    }
  };

  const playSatisfactionSound = () => {
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state === 'suspended') {
        return;
      }

      // Pleasant ascending chime sound
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)
      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const startTime = ctx.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0.06, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (error) {
      console.log('Satisfaction sound failed:', error);
    }
  };

  // Helper function to type out text character by character
  const typeText = (text: string, setter: (text: string) => void, speed: number, startDelay: number, soundType: 'user' | 'ai' | 'none' = 'none', frustrationLevel: number = 0) => {
    return new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index <= text.length) {
            setter(text.substring(0, index));
            // Play typing sound for non-space characters when enabled
            if (soundType !== 'none' && index > 0 && text[index - 1] !== ' ' && text[index - 1] !== '\n') {
              if (soundType === 'user') {
                playUserTypingSound(frustrationLevel);
              } else if (soundType === 'ai') {
                playAITypingSound();
              }
            }
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
    if (isAnimating) {
      // If already animating, queue another round
      queueNextAnimationRef.current = true;
      return;
    }

    setIsAnimating(true);
    clearAllIntervals();

    // Reset all states
    setShowWithoutLabel(false);
    setShowWithLabel(false);
    setWithoutStep(0);
    setWithoutMondayText("");
    setWithoutTuesdayText("");
    setWithoutTuesdayReminderText("");
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
      // Show labels first
      await wait(300);
      setShowWithoutLabel(true);
      setShowWithLabel(true);
      await wait(500);

      // === WITHOUT SAPIENTPRIORS (LEFT SIDE) ===

      // Monday - User types preference (calm)
      setWithoutStep(1);
      await typeText('"I prefer concise emails"', setWithoutMondayText, 50, 800, 'user', 0); // User typing - no frustration yet
      await wait(1200);

      // Tuesday - AI types long email
      setWithoutStep(2);
      await wait(500);
      await typeText('Hi John,\n\nI hope this email finds you well and you\'re having a great week so far. I wanted to reach out regarding the quarterly report that we discussed in our last meeting. I think it would be beneficial if we could schedule some time to review the key findings and discuss the next steps in detail. Please let me know your availability for next week, and I\'ll send over a calendar invite. Looking forward to hearing from you soon.\n\nBest regards', setWithoutTuesdayText, 25, 0, 'ai'); // AI typing - slower
      await wait(800);
      setWithoutFrustration(1);
      await wait(500);
      // User has to remind again (frustrated - level 1)
      await typeText('"Keep it concise!"', setWithoutTuesdayReminderText, 60, 0, 'user', 1); // Frustrated typing - louder, harsher
      await wait(500);
      playFrustratedKeyboardSound(); // Play frustrated sound when frustration increases
      await wait(1500);

      // Wednesday - Still long emails
      setWithoutStep(3);
      await wait(500);
      await typeText('Still generates long emails, user frustrated', setWithoutWednesdayText, 30, 0, 'ai'); // AI/narrator text - slower
      await wait(800);
      setWithoutFrustration(2);
      playFrustratedKeyboardSound(); // Play frustrated sound again when frustration increases more
      await wait(2000);

      // === WITH SAPIENTPRIORS (RIGHT SIDE) ===

      // Monday - User types, system learns (calm)
      setWithStep(1);
      await typeText('"I prefer concise emails"', setWithMondayText, 50, 800, 'user', 0); // User typing - no frustration
      await wait(1500);

      // Tuesday - AI types suggestion
      setWithStep(2);
      await wait(500);
      await typeText('Hi John,\n\nQuick update on Q4 report: Numbers look good. Review meeting this Friday.\n\nThanks', setWithTuesdayAiText, 25, 0, 'ai'); // AI typing - slower
      await wait(1200);

      // User edits the text (calm, no frustration)
      setIsEditing(true);

      // Initialize user edit text with the AI's full text
      const fullText = "Hi John,\n\nQuick update on Q4 report: Numbers look good. Review meeting this Friday.\n\nThanks";
      setWithTuesdayUserEdit(fullText);
      await wait(500);

      // Delete from "report:" onwards and replace with "Re:"
      const deleteToIndex = fullText.indexOf("report:") + 6; // Keep up to "report"
      for (let i = fullText.length; i >= deleteToIndex; i--) {
        setWithTuesdayUserEdit(fullText.substring(0, i));
        // Play user sound on delete (backspace sound) - no frustration
        if (fullText[i] !== ' ' && fullText[i] !== '\n') {
          playUserTypingSound(0);
        }
        await wait(30);
      }

      // Type new concise version
      const newText = "Hi John,\n\nRe: Q4 report—Numbers look good. Meeting Friday.\n\nThanks";
      const startTyping = fullText.substring(0, deleteToIndex);
      for (let i = startTyping.length; i <= newText.length; i++) {
        setWithTuesdayUserEdit(newText.substring(0, i));
        // Play user sound when typing new characters - no frustration
        if (i > 0 && newText[i - 1] !== ' ' && newText[i - 1] !== '\n') {
          playUserTypingSound(0);
        }
        await wait(50);
      }

      setIsEditing(false);
      await wait(800);
      setWithStep(3);
      setWithSatisfaction(1);
      playSatisfactionSound(); // Play satisfaction sound
      await wait(2000);

      // Wednesday - AI uses learned preference
      setWithStep(4);
      await wait(500);
      await typeText('Hi Sarah,\n\nRe: Budget approval—Approved. Will confirm by EOD.\n\nThanks', setWithWednesdayText, 25, 0, 'ai'); // AI typing - slower
      await wait(800);
      setShowHighlight(true);
      setWithSatisfaction(2);
      playSatisfactionSound(); // Play satisfaction sound again
      await wait(4000);

      setIsAnimating(false);

      // Auto-replay after a pause if still in view
      if (isInView) {
        await wait(3000); // Pause for 3 seconds before restarting
        if (isInView && !queueNextAnimationRef.current) {
          runAnimationSequence();
        }
      }

      // Check if another animation was queued
      if (queueNextAnimationRef.current && isInView) {
        queueNextAnimationRef.current = false;
        runAnimationSequence();
      }
    } catch (error) {
      // Animation was interrupted, ignore
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Section in view');
            setIsInView(true);
            setShowClickPrompt(true);
          } else {
            console.log('Section out of view - stopping animation');
            setIsInView(false);
            setShowClickPrompt(false);
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

  // Handle user interaction to start animation
  useEffect(() => {
    if (isInView && hasUserInteracted) {
      console.log('User has interacted - starting animation');
      setShowClickPrompt(false);
      runAnimationSequence();
    }
  }, [isInView, hasUserInteracted]);

  const handleContainerClick = () => {
    if (!hasUserInteracted && isInView) {
      // First click - initialize audio context and start first animation
      initAudioContext();
      setHasUserInteracted(true);
    } else if (hasUserInteracted && isInView) {
      // Subsequent clicks - queue another animation round
      runAnimationSequence();
    }
  };
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
          <div
            ref={containerRef}
            className="mb-12 max-w-6xl mx-auto relative cursor-pointer"
            onClick={handleContainerClick}
          >
            {/* Click prompt overlay */}
            {showClickPrompt && !hasUserInteracted && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg border-2 border-primary/50 animate-pulse">
                <div className="text-center p-8">
                  <p className="text-2xl font-bold mb-2">Click to start demo</p>
                  <p className="text-muted-foreground">Interactive demonstration with sound</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Without */}
              <Card className="p-8 border-2 border-destructive/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-semibold transition-all duration-500 ${showWithoutLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    Without SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Monday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic min-h-[20px]">
                      {withoutMondayText}
                      {withoutStep >= 1 && withoutMondayText.length < 27 && <span className="animate-pulse">|</span>}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl transition-all duration-500 ${withoutStep >= 2 ? 'scale-110 text-destructive' : 'scale-100 text-destructive/50'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 2 ? 'opacity-100' : 'opacity-30'} ${withoutStep === 2 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className="text-xs bg-background/50 p-3 rounded mb-2 font-mono whitespace-pre-wrap min-h-[80px]">
                      {withoutTuesdayText}
                      {withoutStep >= 2 && withoutTuesdayText.length < 150 && <span className="animate-pulse">|</span>}
                      {withoutTuesdayText.length >= 150 && (
                        <p className={`text-destructive transition-all duration-300 mt-2 ${withoutFrustration >= 1 ? 'font-bold' : ''}`}>❌ Too long again!</p>
                      )}
                    </div>
                    {withoutFrustration >= 1 && (
                      <div className="text-xs text-muted-foreground italic mb-2">
                        <p className="mb-1">User has to remind:</p>
                        <p className="text-destructive font-semibold">
                          {withoutTuesdayReminderText}
                          {withoutTuesdayReminderText.length > 0 && withoutTuesdayReminderText.length < 18 && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl transition-all duration-500 ${withoutStep >= 3 ? 'scale-110 text-destructive' : 'scale-100 text-destructive/50'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-muted/50 rounded-lg p-4 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 3 ? 'opacity-100' : 'opacity-30'} ${withoutStep === 3 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
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
              <Card className="p-8 border-2 border-green-500/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md text-sm font-semibold transition-all duration-500 ${showWithLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    With SapientPriors
                  </div>
                </div>
                <div className="space-y-6">
                  {/* Monday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-green-500/50 transition-all duration-500 ${withStep >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} ${withStep === 1 ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-sm font-semibold mb-2">Monday - User says:</p>
                    <p className="text-xs text-muted-foreground italic mb-2 min-h-[20px]">
                      {withMondayText}
                      {withStep >= 1 && withMondayText.length < 27 && <span className="animate-pulse">|</span>}
                    </p>
                    {withMondayText.length >= 27 && (
                      <p className={`text-xs text-green-600 dark:text-green-400 transition-all duration-300 ${withStep >= 1 ? 'font-bold' : ''}`}>✓ Learned and stored</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl transition-all duration-500 ${withStep >= 2 ? 'scale-110 text-green-500' : 'scale-100 text-green-500/50'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-green-500/50 relative transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-30'} ${isEditing ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-sm font-semibold mb-2">Tuesday - AI suggests:</p>
                    <div className={`text-xs bg-muted/30 p-3 rounded mb-2 font-mono whitespace-pre-wrap relative ${isEditing ? 'shadow-lg' : ''} min-h-[60px]`}>
                      {!isEditing ? withTuesdayAiText : withTuesdayUserEdit}
                      {withStep >= 2 && !isEditing && withTuesdayAiText.length < 45 && <span className="animate-pulse">|</span>}
                      {isEditing && (
                        <>
                          <span className="inline-block w-0.5 h-3 bg-green-500 animate-pulse ml-0.5" />
                          <span className="absolute -right-8 top-2 text-green-500 animate-pulse">✏️</span>
                        </>
                      )}
                    </div>
                    {withTuesdayAiText.length >= 40 && (
                      <div className={`transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-60'}`}>
                        <p className="text-xs text-muted-foreground mb-2">
                          User edits: <span className="line-through">on the Q4 report</span> → <span className="font-bold text-green-600 dark:text-green-400">re: Q4 report</span>
                        </p>
                        {withStep >= 3 && (
                          <p className={`text-xs text-green-600 dark:text-green-400 transition-all duration-500 ${withStep >= 3 ? 'font-bold' : ''}`}>
                            ✓ Learns: user prefers "re:" over "regarding/about"
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-2xl transition-all duration-500 ${withStep >= 4 ? 'scale-110 text-green-500' : 'scale-100 text-green-500/50'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-background rounded-lg p-4 border-l-4 border-green-500/50 transition-all duration-500 ${withStep >= 4 ? 'opacity-100' : 'opacity-30'} ${withStep === 4 ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-sm font-semibold mb-2">Wednesday - AI suggests:</p>
                    <div className="text-xs bg-muted/30 p-3 rounded mb-2 font-mono whitespace-pre-wrap min-h-[60px]">
                      {withWednesdayText.includes('Re:') && showHighlight ? (
                        <>
                          {withWednesdayText.substring(0, withWednesdayText.indexOf('Re:'))}
                          <span className="bg-green-500/20 px-1 rounded font-bold">Re:</span>
                          {withWednesdayText.substring(withWednesdayText.indexOf('Re:') + 3)}
                        </>
                      ) : (
                        withWednesdayText
                      )}
                      {withStep >= 4 && withWednesdayText.length < 55 && <span className="animate-pulse">|</span>}
                    </div>
                    {withWednesdayText.length >= 50 && (
                      <p className="text-xs text-green-600 dark:text-green-400">✓ Automatically applies: concise + "re:" style</p>
                    )}
                  </div>

                  {/* Satisfaction indicator */}
                  <div className={`mt-4 p-4 bg-green-500/10 rounded-lg transition-all duration-500 ${withSatisfaction >= 2 ? 'bg-green-500/20 ring-2 ring-green-500' : ''}`}>
                    <p className={`text-sm text-green-600 dark:text-green-400 transition-all duration-300 ${withSatisfaction >= 2 ? 'font-bold text-lg' : 'font-semibold'}`}>User satisfaction increases ↗</p>
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