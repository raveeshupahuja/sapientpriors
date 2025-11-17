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
  const [frustrationText, setFrustrationText] = useState("");

  // Typing state flags for "without" side
  const [isTypingWithoutMonday, setIsTypingWithoutMonday] = useState(false);
  const [isTypingWithoutTuesday, setIsTypingWithoutTuesday] = useState(false);
  const [isTypingWithoutTuesdayReminder, setIsTypingWithoutTuesdayReminder] = useState(false);
  const [isTypingWithoutWednesday, setIsTypingWithoutWednesday] = useState(false);
  const [isTypingFrustration, setIsTypingFrustration] = useState(false);

  // With SapientPriors animation states
  const [withStep, setWithStep] = useState(0);
  const [withMondayText, setWithMondayText] = useState("");
  const [withTuesdayAiText, setWithTuesdayAiText] = useState("");
  const [withTuesdayUserEdit, setWithTuesdayUserEdit] = useState("");
  const [withWednesdayText, setWithWednesdayText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingComplete, setEditingComplete] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [withSatisfaction, setWithSatisfaction] = useState(0);

  // Typing state flags for "with" side
  const [isTypingWithMonday, setIsTypingWithMonday] = useState(false);
  const [isTypingWithTuesday, setIsTypingWithTuesday] = useState(false);
  const [isTypingWithWednesday, setIsTypingWithWednesday] = useState(false);
  const [editCursorPosition, setEditCursorPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showClickPrompt, setShowClickPrompt] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const queueNextAnimationRef = useRef(false);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Refs for auto-scrolling email boxes
  const withoutTuesdayEmailRef = useRef<HTMLDivElement>(null);
  const withTuesdayEmailRef = useRef<HTMLDivElement>(null);
  const withWednesdayEmailRef = useRef<HTMLDivElement>(null);

  const clearAllIntervals = () => {
    intervalsRef.current.forEach(interval => clearTimeout(interval));
    intervalsRef.current = [];
  };

  // Common utility function to auto-scroll content to bottom
  const autoScrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const scrollToTop = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
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

  // Unified typing method with cursor tracking and state management
  const typeWithCursor = async (options: {
    text: string;
    setter: (text: string) => void;
    speed: number;
    startDelay?: number;
    soundType: 'user' | 'ai' | 'none';
    frustrationLevel?: number;
    typingStateSetter?: (isTyping: boolean) => void;
    cursorPositionSetter?: (position: number) => void;
    insertPosition?: number;
    baseText?: string;
  }) => {
    const {
      text,
      setter,
      speed,
      startDelay = 0,
      soundType,
      frustrationLevel = 0,
      typingStateSetter,
      cursorPositionSetter,
      insertPosition,
      baseText,
    } = options;

    // Set typing state to true
    if (typingStateSetter) {
      typingStateSetter(true);
    }

    // Wait for start delay
    if (startDelay > 0) {
      await new Promise<void>(resolve => {
        const checkPause = () => {
          if (isPausedRef.current) {
            const timeout = setTimeout(checkPause, 100);
            intervalsRef.current.push(timeout);
          } else {
            const timeout = setTimeout(resolve, startDelay);
            intervalsRef.current.push(timeout);
          }
        };
        checkPause();
      });
    }

    // Type character by character
    for (let i = 0; i <= text.length; i++) {
      // Wait while paused
      await new Promise<void>(resolve => {
        const checkPause = () => {
          if (isPausedRef.current) {
            const timeout = setTimeout(checkPause, 100);
            intervalsRef.current.push(timeout);
          } else {
            resolve();
          }
        };
        checkPause();
      });

      let newText: string;

      if (insertPosition !== undefined && baseText !== undefined) {
        // Inserting text at a specific position
        newText = baseText.substring(0, insertPosition) + text.substring(0, i) + baseText.substring(insertPosition);
      } else {
        // Normal typing from start
        newText = text.substring(0, i);
      }

      setter(newText);

      // Update cursor position if tracking
      if (cursorPositionSetter) {
        const cursorPos = insertPosition !== undefined ? insertPosition + i : i;
        cursorPositionSetter(cursorPos);
      }

      // Play typing sound for non-space characters
      if (soundType !== 'none' && i > 0 && text[i - 1] !== ' ' && text[i - 1] !== '\n') {
        if (soundType === 'user') {
          playUserTypingSound(frustrationLevel);
        } else if (soundType === 'ai') {
          playAITypingSound();
        }
      }

      // Wait before next character
      await new Promise<void>(resolve => {
        const checkPause = () => {
          if (isPausedRef.current) {
            const timeout = setTimeout(checkPause, 100);
            intervalsRef.current.push(timeout);
          } else {
            const timeout = setTimeout(resolve, speed);
            intervalsRef.current.push(timeout);
          }
        };
        checkPause();
      });
    }

    // Set typing state to false
    if (typingStateSetter) {
      typingStateSetter(false);
    }
  };

  const runAnimationSequence = async () => {
    if (isAnimating) {
      // If already animating, queue another round
      queueNextAnimationRef.current = true;
      return;
    }

    setIsAnimating(true);
    setIsPaused(false);
    isPausedRef.current = false;
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
    setFrustrationText("");
    setWithStep(0);
    setWithMondayText("");
    setWithTuesdayAiText("");
    setWithTuesdayUserEdit("");
    setWithWednesdayText("");
    setIsEditing(false);
    setEditingComplete(false);
    setShowHighlight(false);
    setWithSatisfaction(0);

    // Reset typing flags
    setIsTypingWithoutMonday(false);
    setIsTypingWithoutTuesday(false);
    setIsTypingWithoutTuesdayReminder(false);
    setIsTypingWithoutWednesday(false);
    setIsTypingFrustration(false);
    setIsTypingWithMonday(false);
    setIsTypingWithTuesday(false);
    setIsTypingWithWednesday(false);
    setEditCursorPosition(0);

    const wait = (ms: number) => new Promise<void>(resolve => {
      const checkPause = () => {
        if (isPausedRef.current) {
          const timeout = setTimeout(checkPause, 100);
          intervalsRef.current.push(timeout);
        } else {
          const timeout = setTimeout(resolve, ms);
          intervalsRef.current.push(timeout);
        }
      };
      checkPause();
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
      await typeWithCursor({
        text: '"I prefer concise emails"',
        setter: setWithoutMondayText,
        speed: 50,
        startDelay: 800,
        soundType: 'user',
        frustrationLevel: 0,
        typingStateSetter: setIsTypingWithoutMonday,
      });
      await wait(1200);

      // Tuesday - AI types verbose quarterly report analysis
      setWithoutStep(2);
      await typeWithCursor({
        text: 'Hi John,\n\nAfter conducting a comprehensive analysis of our Q4 performance data, I wanted to share my findings with you. Based on the revenue chart (Q4_Revenue_Chart.xlsx), we can observe a significant 12% increase compared to Q3. This growth trajectory is particularly noteworthy because it indicates strong market momentum heading into year-end.\n\nLooking at the Performance_Metrics.pdf, the underlying drivers show that customer acquisition costs decreased by 8% while retention rates improved to 94%. The reason for this improvement appears to be the product enhancements we rolled out in October, which according to the user feedback data, resonated well with our enterprise segment.\n\nThe Expense_Analysis.csv reveals that our operational efficiency improved as well. Marketing spend remained flat quarter-over-quarter, yet we achieved higher conversion rates. This suggests our targeting algorithms are working effectively. Additionally, I noticed that our infrastructure costs dropped 5% due to the cloud optimization initiative.\n\nGiven these positive indicators across multiple dimensions, I believe we should schedule a review meeting to discuss Q1 strategy. Does Friday at 2 PM work for your calendar?\n\n📊 Q4_Revenue_Chart.xlsx\n📈 Performance_Metrics.pdf\n📉 Expense_Analysis.csv\n\nThanks',
        setter: setWithoutTuesdayText,
        speed: 25,
        startDelay: 500,
        soundType: 'ai',
        typingStateSetter: setIsTypingWithoutTuesday,
      });
      await wait(800);
      setWithoutFrustration(1);
      await wait(500);
      // User has to remind again (frustrated - level 1)
      await typeWithCursor({
        text: '"Keep it concise!"',
        setter: setWithoutTuesdayReminderText,
        speed: 60,
        soundType: 'user',
        frustrationLevel: 1,
        typingStateSetter: setIsTypingWithoutTuesdayReminder,
      });
      await wait(500);
      playFrustratedKeyboardSound(); // Play frustrated sound when frustration increases
      await wait(1500);

      // Wednesday - Still long emails
      setWithoutStep(3);
      await typeWithCursor({
        text: 'Still generates long emails, user frustrated',
        setter: setWithoutWednesdayText,
        speed: 30,
        startDelay: 500,
        soundType: 'ai',
        typingStateSetter: setIsTypingWithoutWednesday,
      });
      await wait(800);
      setWithoutFrustration(2);
      playFrustratedKeyboardSound(); // Play frustrated sound again when frustration increases more
      await wait(1000);

      // Frustration indicator typing animation - step 4
      setWithoutStep(4);
      await typeWithCursor({
        text: "User frustration increases ↗",
        setter: setFrustrationText,
        speed: 60, // Average speed (will vary in real implementation)
        startDelay: 500,
        soundType: 'user',
        frustrationLevel: 2,
        typingStateSetter: setIsTypingFrustration,
      });
      await wait(1500);

      // === WITH SAPIENTPRIORS (RIGHT SIDE) ===

      // Monday - User types, system learns (calm)
      setWithStep(1);
      await typeWithCursor({
        text: '"I prefer concise emails"',
        setter: setWithMondayText,
        speed: 50,
        startDelay: 800,
        soundType: 'user',
        frustrationLevel: 0,
        typingStateSetter: setIsTypingWithMonday,
      });
      await wait(1500);

      // Tuesday - AI types suggestion (already more concise from learning)
      setWithStep(2);
      await typeWithCursor({
        text: 'Hi John,\n\nQ4 analysis: Revenue up 12% vs Q3, strong market momentum. Customer acquisition costs down 8%, retention at 94% thanks to October product updates. Operational efficiency improved—marketing ROI up, infrastructure costs down 5%.\n\nMeeting Friday 2pm to discuss Q1 strategy?\n\n📊 Q4_Revenue_Chart.xlsx\n📈 Performance_Metrics.pdf\n📉 Expense_Analysis.csv\n\nThanks',
        setter: setWithTuesdayAiText,
        speed: 25,
        startDelay: 500,
        soundType: 'ai',
        typingStateSetter: setIsTypingWithTuesday,
      });
      await wait(1200);

      // User edits the text (calm, no frustration) - just adds TLDR at top
      setIsEditing(true);

      // Initialize user edit text with the AI's concise text
      const aiConciseText = "Hi John,\n\nQ4 analysis: Revenue up 12% vs Q3, strong market momentum. Customer acquisition costs down 8%, retention at 94% thanks to October product updates. Operational efficiency improved—marketing ROI up, infrastructure costs down 5%.\n\nMeeting Friday 2pm to discuss Q1 strategy?\n\n📊 Q4_Revenue_Chart.xlsx\n📈 Performance_Metrics.pdf\n📉 Expense_Analysis.csv\n\nThanks";
      setWithTuesdayUserEdit(aiConciseText);
      await wait(500);

      // User simply adds TLDR at the top (after "Hi John,\n\n")
      await typeWithCursor({
        text: "TLDR: Q4 strong—revenue +12%, CAC -8%, retention 94%. Meeting Friday 2pm?\n\n",
        setter: setWithTuesdayUserEdit,
        speed: 50,
        soundType: 'user',
        frustrationLevel: 0,
        cursorPositionSetter: setEditCursorPosition,
        insertPosition: "Hi John,\n\n".length,
        baseText: aiConciseText,
      });

      setIsEditing(false);
      setEditingComplete(true);
      await wait(800);
      setWithStep(3);
      setWithSatisfaction(1);
      playSatisfactionSound(); // Play satisfaction sound
      await wait(2000);

      // Wednesday - AI uses learned preference
      setWithStep(4);
      await typeWithCursor({
        text: 'Hi Sarah,\n\nTLDR: Budget approved. Confirming by EOD.\n\nRe: Budget approval—Good news on the Q1 marketing budget request. Finance team reviewed the proposal during this morning\'s meeting and approved the full $50K allocation. They were particularly impressed with the ROI projections from our last campaign.\n\nI\'ll send the formal confirmation with fund codes by end of day. You can start the vendor outreach process.\n\nThanks',
        setter: setWithWednesdayText,
        speed: 25,
        startDelay: 500,
        soundType: 'ai',
        typingStateSetter: setIsTypingWithWednesday,
      });
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

  // Auto-scroll for red side Tuesday email (without SapientPriors)
  useEffect(() => {
    if (isTypingWithoutTuesday) {
      autoScrollToBottom(withoutTuesdayEmailRef);
    }
  }, [withoutTuesdayText, isTypingWithoutTuesday]);

  // Auto-scroll for green side Tuesday email (with SapientPriors)
  useEffect(() => {
    if (isEditing) {
      // When editing, scroll the text container to top so edit area is visible
      scrollToTop(withTuesdayEmailRef);
    } else if (isTypingWithTuesday) {
      autoScrollToBottom(withTuesdayEmailRef);
    }
  }, [withTuesdayAiText, withTuesdayUserEdit, isTypingWithTuesday, isEditing, editCursorPosition]);

  // Auto-scroll for green side Wednesday email
  useEffect(() => {
    if (isTypingWithWednesday) {
      autoScrollToBottom(withWednesdayEmailRef);
    }
  }, [withWednesdayText, isTypingWithWednesday]);

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
        {/* Demo Section First - No heading */}
        <div className="mb-20">
          {/* Before/After Visual Comparison */}
          <div
            ref={containerRef}
            className="mb-16 max-w-6xl mx-auto relative cursor-pointer"
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

            {/* Play/Pause button */}
            {hasUserInteracted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newPausedState = !isPaused;
                  setIsPaused(newPausedState);
                  isPausedRef.current = newPausedState;
                }}
                className="absolute top-4 right-4 z-20 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-200"
                aria-label={isPaused ? "Resume animation" : "Pause animation"}
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                )}
              </button>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Without */}
              <Card className="p-6 border-2 border-destructive/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`px-3 py-1 bg-destructive/10 text-destructive rounded-md text-sm font-semibold transition-all duration-500 ${showWithoutLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    Without SapientPriors
                  </div>
                </div>
                <div className="space-y-2">
                  {/* Monday */}
                  <div className={`bg-muted/50 rounded-lg p-3 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} ${withoutStep === 1 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Monday - User says:</p>
                    <p className="text-[11px] text-muted-foreground italic min-h-[16px]">
                      {withoutMondayText}
                      {withoutStep >= 1 && withoutMondayText.length < 27 && (
                        <>
                          <span className="animate-pulse">|</span>
                          <span className="ml-2 text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded">User</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-lg transition-all duration-500 ${withoutStep >= 2 ? 'scale-110 text-destructive' : 'scale-100 text-destructive/50'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-muted/50 rounded-lg p-3 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 2 ? 'opacity-100' : 'opacity-30'} ${withoutStep === 2 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Tuesday - AI suggests:</p>
                    <div ref={withoutTuesdayEmailRef} className="text-[10px] bg-background/50 p-2 rounded mb-2 font-mono whitespace-pre-wrap min-h-[200px] max-h-[200px] overflow-y-auto relative">
                      {withoutTuesdayText}
                      {isTypingWithoutTuesday && (
                        <>
                          <span className="animate-pulse">|</span>
                          <span className="ml-2 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">AI</span>
                        </>
                      )}
                      {withoutTuesdayText.length >= 350 && (
                        <p className={`text-destructive transition-all duration-300 mt-2 ${withoutFrustration >= 1 ? 'font-bold' : ''}`}>❌ Too long again!</p>
                      )}
                    </div>
                    {withoutFrustration >= 1 && (
                      <div className="text-[10px] text-muted-foreground italic mb-1.5">
                        <p className="mb-0.5">User has to remind:</p>
                        <p className="text-destructive font-semibold">
                          {withoutTuesdayReminderText}
                          {withoutTuesdayReminderText.length > 0 && withoutTuesdayReminderText.length < 18 && (
                            <>
                              <span className="animate-pulse">|</span>
                              <span className="ml-2 text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded">User</span>
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-lg transition-all duration-500 ${withoutStep >= 3 ? 'scale-110 text-destructive' : 'scale-100 text-destructive/50'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-muted/50 rounded-lg p-3 border-l-4 border-destructive/50 transition-all duration-500 ${withoutStep >= 3 ? 'opacity-100' : 'opacity-30'} ${withoutStep === 3 && withStep === 0 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Wednesday - Same problem:</p>
                    <p className="text-[11px] text-muted-foreground min-h-[16px]">
                      {withoutWednesdayText}
                      {withoutStep >= 3 && withoutWednesdayText.length < 45 && <span className="animate-pulse">|</span>}
                    </p>
                  </div>

                  {/* Frustration indicator */}
                  <div className={`mt-3 p-3 bg-destructive/5 rounded-lg transition-all duration-500 ${withoutFrustration >= 2 ? 'bg-destructive/20' : ''} ${withoutStep === 4 ? 'ring-2 ring-destructive ring-offset-2' : ''}`}>
                    {frustrationText && (
                      <p className={`text-xs text-destructive transition-all duration-300 ${withoutFrustration >= 2 ? 'font-bold text-sm' : 'font-semibold'}`}>
                        {frustrationText}
                        {withoutStep === 4 && frustrationText.length < 37 && <span className="animate-pulse">|</span>}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* With */}
              <Card className="p-6 border-2 border-green-500/20">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-md text-sm font-semibold transition-all duration-500 ${showWithLabel ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    With SapientPriors
                  </div>
                </div>
                <div className="space-y-2">
                  {/* Monday */}
                  <div className={`bg-background rounded-lg p-3 border-l-4 border-green-500/50 transition-all duration-500 ${withStep >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} ${withStep === 1 ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Monday - User says:</p>
                    <p className="text-[11px] text-muted-foreground italic mb-1.5 min-h-[16px]">
                      {withMondayText}
                      {withStep >= 1 && withMondayText.length < 27 && (
                        <>
                          <span className="animate-pulse">|</span>
                          <span className="ml-2 text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded">User</span>
                        </>
                      )}
                    </p>
                    {withMondayText.length >= 27 && (
                      <p className={`text-[10px] text-green-600 dark:text-green-400 transition-all duration-300 ${withStep >= 1 ? 'font-bold' : ''}`}>✓ Learned and stored</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-lg transition-all duration-500 ${withStep >= 2 ? 'scale-110 text-green-500' : 'scale-100 text-green-500/50'}`}>↓</div>

                  {/* Tuesday */}
                  <div className={`bg-background rounded-lg p-3 border-l-4 border-green-500/50 relative transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-30'} ${(withStep === 2 || withStep === 3) ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Tuesday - AI suggests:</p>
                    <div ref={withTuesdayEmailRef} className={`text-[10px] bg-muted/30 p-2 rounded mb-1.5 font-mono whitespace-pre-wrap relative min-h-[200px] max-h-[200px] overflow-y-auto ${isEditing ? 'shadow-lg' : ''}`}>
                      {!isEditing && !editingComplete ? (
                        <>
                          {withTuesdayAiText}
                          {isTypingWithTuesday && (
                            <>
                              <span className="animate-pulse">|</span>
                              <span className="ml-2 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded">AI</span>
                            </>
                          )}
                        </>
                      ) : isEditing ? (
                        <>
                          {withTuesdayUserEdit.substring(0, editCursorPosition)}
                          <span className="inline-block w-0.5 h-3 bg-green-500 animate-pulse ml-0.5" />
                          <span className="ml-2 text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded">User</span>
                          {withTuesdayUserEdit.substring(editCursorPosition)}
                          <span className="absolute -right-8 top-2 text-green-500 animate-pulse">✏️</span>
                        </>
                      ) : (
                        withTuesdayUserEdit
                      )}
                    </div>
                    {editingComplete && (
                      <div className={`transition-all duration-500 ${withStep >= 2 ? 'opacity-100' : 'opacity-60'}`}>
                        <p className="text-[10px] text-muted-foreground mb-1.5">
                          User condensed: <span className="line-through">verbose analysis</span> → <span className="font-bold text-green-600 dark:text-green-400">TLDR format</span>
                        </p>
                        {withStep >= 3 && (
                          <p className={`text-[10px] text-green-600 dark:text-green-400 transition-all duration-500 ${withStep >= 3 ? 'font-bold' : ''}`}>
                            ✓ Learns: user prefers concise TLDR summaries
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className={`text-center text-lg transition-all duration-500 ${withStep >= 4 ? 'scale-110 text-green-500' : 'scale-100 text-green-500/50'}`}>↓</div>

                  {/* Wednesday */}
                  <div className={`bg-background rounded-lg p-3 border-l-4 border-green-500/50 transition-all duration-500 ${withStep >= 4 ? 'opacity-100' : 'opacity-30'} ${withStep === 4 ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                    <p className="text-xs font-semibold mb-1.5">Wednesday - AI suggests:</p>
                    <div ref={withWednesdayEmailRef} className="text-[10px] bg-muted/30 p-2 rounded mb-1.5 font-mono whitespace-pre-wrap min-h-[120px] max-h-[200px] overflow-y-auto">
                      {withWednesdayText.includes('TLDR:') && showHighlight ? (
                        <>
                          {withWednesdayText.substring(0, withWednesdayText.indexOf('TLDR:'))}
                          <span className="bg-green-500/20 px-1 rounded font-bold">TLDR: Budget approved. Confirming by EOD.</span>
                          {withWednesdayText.substring(withWednesdayText.indexOf('TLDR:') + 'TLDR: Budget approved. Confirming by EOD.'.length)}
                        </>
                      ) : (
                        withWednesdayText
                      )}
                      {isTypingWithWednesday && <span className="animate-pulse">|</span>}
                    </div>
                    {!isTypingWithWednesday && withWednesdayText.length > 0 && (
                      <p className="text-[10px] text-green-600 dark:text-green-400">✓ Automatically applies: concise + TLDR format</p>
                    )}
                  </div>

                  {/* Satisfaction indicator */}
                  <div className={`mt-3 p-3 bg-green-500/10 rounded-lg transition-all duration-500 ${withSatisfaction >= 2 ? 'bg-green-500/20 ring-2 ring-green-500' : ''}`}>
                    <p className={`text-xs text-green-600 dark:text-green-400 transition-all duration-300 ${withSatisfaction >= 2 ? 'font-bold text-sm' : 'font-semibold'}`}>User satisfaction increases ↗</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Problem Explanation - After Demo */}
          <div className="text-center max-w-3xl mx-auto mb-12 mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The Problem: AI Applications Don't Learn
            </h2>
            <p className="text-lg text-muted-foreground">
              Your users have to repeat themselves in every conversation. Each session starts from scratch, creating a frustrating experience.
            </p>
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

        {/* What Is It Section */}
        <div className="text-center max-w-4xl mx-auto mt-32">
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
      </div>
    </section>
  );
}