# CareTaker product demo video

A 44-second, 1920×1080 product demo, with English voiceover and captions, of CareTaker, built with [Remotion](https://www.remotion.dev).

## Preview and render

```sh
npm i
npm run dev                      # opens Remotion Studio
npx remotion render CareTakerDemo out/caretaker-demo.mp4   # final 1080p MP4
```

The `CareTakerDemo` composition is the full video. Each scene is also registered on its own under **Scenes** in Studio:

| # | Scene | What it shows |
|---|-------|---------------|
| 1 | Problem | Why manual facility management is slow |
| 2 | Request | A tenant reports a cold radiator in the tenant chat (phone) |
| 3 | AI analysis | Case #1040: what the AI found, urgency, contract coverage, the cost limit |
| 4 | Technician match | The Technicians list: matched by specialty and building, then by rank and visit fee |
| 5 | Human approval | "Why the AI stopped", **Approve visit**, then the approval and audit log entry |
| 6 | Value | CareTaker: calm control for every repair |

## Where the visuals come from

Every UI image in `public/screens/` is a real screenshot of the CareTaker app
([skovachev/caretaker](https://github.com/skovachev/caretaker)). The app ran
locally against its own schema and seed data (`drizzle/migrations`), and
Playwright captured the screens at 2× (desktop) and 3× (phone). The
approval-step screens show the result of actually clicking **Approve visit**
in the app. Because the data is the demo seed, every product scene carries a
"Recorded in the CareTaker demo · sample data" label.

The analysis checklist (scene 3) and the matching steps (scene 4) are motion
graphics. They restate values shown on the captured screens and follow the
app's matching order in `src/lib/caretaker/engine.ts`. The app has no SLA
feature, so the video shows urgency/priority instead.

## Audio

The voiceover in `public/voice/` was generated locally with the open-source
[Kokoro](https://github.com/thewh1teagle/kokoro-onnx) TTS model (voice
`af_heart`). Each clip reads the caption shown with it (`<Narration>` in
`src/components/Caption.tsx`). Clip lengths are in `src/voice.ts`, so update
that file if you replace a clip, for example with an ElevenLabs recording.


The sound effects and the ambient bed in `public/sfx/` were synthesized with
ffmpeg for this video, so there are no licensing questions. The font in
`public/fonts/` is Plus Jakarta Sans (SIL Open Font License), the app's own
typeface.
