export type AnalysisMode = 'analysis' | 'correction';

export type LanguageCode =
  | 'ko' // 한국어
  | 'en' // English
  | 'ja' // 日本語
  | 'hi' // हिन्दी (Hindi)
  | 'es' // Español
  | 'fr' // Français
  | 'de' // Deutsch
  | 'it' // Italiano
  | 'pt' // Português
  | 'ru'; // Русский

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export interface StepData {
  title: string;
  subtitle: string;
  mainContent: string;
  details: string[];
  tags: string[];
  actionableAdvice?: string;
}

export interface StepsResult {
  step1: StepData; // 1단계: 해석
  step2: StepData; // 2단계: 요약
  step3: StepData; // 3단계: 상세 설명
  step4: StepData; // 4단계: 문법 수정
  step5: StepData; // 5단계: 단어 재조합
}

export interface SentenceRecord {
  id: string;
  createdAt: number;
  originalText: string;
  mode: AnalysisMode;
  summaryShort: string;
  steps: StepsResult;
  isFavorite?: boolean;
  language?: LanguageCode; // 생성 당시의 언어
  translations?: Partial<Record<LanguageCode, { summaryShort: string; steps: StepsResult }>>; // 다국어 캐시
}

export interface APIConfig {
  provider: 'gemini' | 'openai';
  geminiKey: string;
  openaiKey: string;
  elevenLabsKey: string;
  elevenLabsVoiceId: string;
  preferredVoiceURI?: string;
}

export interface TTSState {
  isPlaying: boolean;
  isContinuous: boolean;
  currentStepIndex: number;
  voiceType: 'webspeech' | 'elevenlabs';
  rate: number;
  pitch: number;
}
