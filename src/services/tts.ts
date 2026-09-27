// 하이브리드 TTS 엔진 (WebSpeech API + ElevenLabs Voice Cloning)

export interface TTSVoiceOption {
  voiceURI: string;
  name: string;
  lang: string;
}

export class HybridTTSEngine {
  private static currentAudio: HTMLAudioElement | null = null;
  private static isSpeakingNative = false;
  private static onEndCallback: (() => void) | null = null;

  public static getAvailableNativeVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return resolve([]);
      }

      let voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        return resolve(voices);
      }

      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };

      setTimeout(() => {
        resolve(window.speechSynthesis.getVoices());
      }, 500);
    });
  }

  public static stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.isSpeakingNative = false;
    this.onEndCallback = null;
  }

  public static async speak(options: {
    text: string;
    useElevenLabs?: boolean;
    elevenLabsKey?: string;
    elevenLabsVoiceId?: string;
    rate?: number;
    pitch?: number;
    preferredVoiceURI?: string;
    speechCode?: string; // 예: ko-KR, en-US, ja-JP 등
    onEnd?: () => void;
    onError?: (err: any) => void;
  }): Promise<void> {
    const {
      text,
      useElevenLabs,
      elevenLabsKey,
      elevenLabsVoiceId,
      rate = 1.0,
      pitch = 1.0,
      preferredVoiceURI,
      speechCode = 'ko-KR',
      onEnd,
      onError
    } = options;

    this.stop();
    this.onEndCallback = onEnd || null;

    // 1. ElevenLabs 확장 기능 (개인 음성 복제 모드)
    if (useElevenLabs && elevenLabsKey && elevenLabsVoiceId) {
      try {
        const response = await fetch('/api/tts/elevenlabs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            apiKey: elevenLabsKey,
            voiceId: elevenLabsVoiceId
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `ElevenLabs HTTP ${response.status}`);
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          if (this.onEndCallback) this.onEndCallback();
        };

        audio.onerror = (e) => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          if (onError) onError(e);
        };

        await audio.play();
        return;
      } catch (elevenErr) {
        console.warn('ElevenLabs TTS failed, falling back to WebSpeech API:', elevenErr);
      }
    }

    // 2. 브라우저 내장 WebSpeech API (10개 언어 네이티브 대응)
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError(new Error('현재 브라우저에서는 음성 합성(TTS)을 지원하지 않습니다.'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = Math.max(0.6, Math.min(rate, 1.6));
    utterance.pitch = Math.max(0.7, Math.min(pitch, 1.4));
    utterance.lang = speechCode;

    const voices = await this.getAvailableNativeVoices();
    if (preferredVoiceURI) {
      const found = voices.find((v) => v.voiceURI === preferredVoiceURI);
      if (found) utterance.voice = found;
    } else {
      // 지정된 언어 코드 기반 매칭 (예: ja, zh, en, fr 등)
      const langPrefix = speechCode.split('-')[0].toLowerCase();
      const matchedVoice = voices.find(
        (v) => v.lang.toLowerCase().startsWith(langPrefix) || v.lang.toLowerCase().includes(speechCode.toLowerCase())
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onend = () => {
      this.isSpeakingNative = false;
      if (this.onEndCallback) this.onEndCallback();
    };

    utterance.onerror = (e) => {
      this.isSpeakingNative = false;
      if (onError) onError(e);
    };

    this.isSpeakingNative = true;
    window.speechSynthesis.speak(utterance);
  }
}
