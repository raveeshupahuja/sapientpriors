# Voice Over Audio Setup

## Current Audio Configuration

The product demo uses **voice-over narration only** (no background music).

## Audio Files

Voice over is split into 8 chunks, located in `client/public/`:

```
sapientpriors-website/
├── client/
│   ├── public/
│   │   ├── demo-voice-over.mp3      (Full narration - 1.3MB)
│   │   ├── voice-chunk-1.mp3        (0-2s intro)
│   │   ├── voice-chunk-2.mp3        (2-6s Monday Without)
│   │   ├── voice-chunk-3.mp3        (6-10s Monday With)
│   │   ├── voice-chunk-4.mp3        (10-18s Tuesday Without)
│   │   ├── voice-chunk-5.mp3        (18-33s Tuesday With)
│   │   ├── voice-chunk-6.mp3        (33-36s Learning moment)
│   │   ├── voice-chunk-7.mp3        (36-50s Wednesday Without)
│   │   └── voice-chunk-8.mp3        (50-68s Wednesday With)
│   └── src/
```

## How It Works

- Voice chunks play sequentially during the animation
- Each chunk waits to finish before the next animation step
- Voice pauses/resumes with the pause button
- Voice stops when the demo section scrolls out of view
- Volume is set to 100% (full volume)
- Only ONE voice chunk plays at a time

## Changing Settings

To adjust voice volume, edit `ProductSection.tsx`:

```typescript
voiceChunksRef.current[chunkNumber].volume = 1.0; // Change value between 0.0 and 1.0
```

## Regenerating Voice Chunks

If you need to re-split the audio with different timings:

```bash
cd client/public

# Example: Extract chunk 1 (0-2 seconds)
ffmpeg -i demo-voice-over.mp3 -ss 0 -t 2 -acodec copy voice-chunk-1.mp3
```
