import { PresetItem } from './types';
import { koPresets } from './ko';
import { enPresets } from './en';
import { jaPresets } from './ja';
import { hiPresets } from './hi';
import { esPresets } from './es';
import { frPresets } from './fr';
import { dePresets } from './de';
import { itPresets } from './it';
import { ptPresets } from './pt';
import { ruPresets } from './ru';

export type { PresetItem } from './types';

export const SAMPLE_PRESETS: Record<string, PresetItem[]> = {
  ko: koPresets,
  en: enPresets,
  ja: jaPresets,
  hi: hiPresets,
  es: esPresets,
  fr: frPresets,
  de: dePresets,
  it: itPresets,
  pt: ptPresets,
  ru: ruPresets
};
