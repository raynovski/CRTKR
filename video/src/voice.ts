// Narration clip lengths in frames at 30 fps (public/voice/*.mp3).
// Generated with Kokoro TTS (voice "af_heart"); update when the clips change.
export const voiceFrames = {
  s1: 177,
  s2a: 119,
  s2b: 111,
  s3a: 89,
  s3b: 108,
  s4a: 119,
  s4b: 90,
  s5a: 103,
  s5b: 116,
  s6: 74,
} as const;

export type VoiceId = keyof typeof voiceFrames;
