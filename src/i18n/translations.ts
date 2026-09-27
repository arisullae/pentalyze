import { LanguageCode, LanguageInfo } from '../types';
import { TranslationDict } from './types';
import { ko } from './locales/ko';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { hi } from './locales/hi';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { it } from './locales/it';
import { pt } from './locales/pt';
import { ru } from './locales/ru';

export type { TranslationDict } from './types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'ko', label: '한국어', nativeName: '한국어', flag: '🇰🇷', speechCode: 'ko-KR' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸', speechCode: 'en-US' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechCode: 'ja-JP' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'it', label: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speechCode: 'it-IT' },
  { code: 'pt', label: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', speechCode: 'pt-BR' },
  { code: 'ru', label: 'Russian', nativeName: 'Русский', flag: '🇷🇺', speechCode: 'ru-RU' },
];

export const TRANSLATIONS: Record<LanguageCode, TranslationDict> = {
  ko,
  en,
  ja,
  hi,
  es,
  fr,
  de,
  it,
  pt,
  ru
};
