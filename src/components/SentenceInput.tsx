import React, { useState } from 'react';
import { AnalysisMode, LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { SAMPLE_PRESETS } from './presets';
import { Sparkles, ArrowRight, Clipboard, RotateCcw, Lightbulb, PenTool, CheckCircle2 } from 'lucide-react';

interface SentenceInputProps {
  onAnalyze: (text: string, mode: AnalysisMode) => void;
  isLoading: boolean;
  onOpenSettings: () => void;
  hasApiKey: boolean;
  currentLang: LanguageCode;
}

export const SentenceInput: React.FC<SentenceInputProps> = ({
  onAnalyze,
  isLoading,
  onOpenSettings,
  hasApiKey,
  currentLang
}) => {
  const [mode, setMode] = useState<AnalysisMode>('correction');
  const [text, setText] = useState('');

  const t = TRANSLATIONS[currentLang];
  const isAnalysis = mode === 'analysis';
  const placeholderText = isAnalysis ? t.placeholderOther : t.placeholderOwn;

  const presets = SAMPLE_PRESETS[currentLang] || SAMPLE_PRESETS['ko'];

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText.trim());
      }
    } catch {
      // ignore
    }
  };

  const handleSelectPreset = (presetText: string, presetMode: AnalysisMode) => {
    setMode(presetMode);
    setText(presetText);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;
    onAnalyze(text.trim(), mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 py-6 sm:py-10">
      {/* Hero Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.heroBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-serif-kr">
          {t.heroTitle}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.heroDesc}
        </p>
      </div>

      {/* Main Card */}
      <div className="relative rounded-2xl border border-white/10 bg-[#17181c]/90 p-4 sm:p-7 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {/* ① 문장 출처 구분 토글 세그먼트 버튼 (본인 문장 우선 배치) */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              {t.sourceSelection}
            </span>
            <div className="grid grid-cols-2 w-full sm:w-auto p-1 bg-black/40 rounded-xl border border-white/10">
              {/* 왼쪽: [본인 문장 교정] */}
              <button
                type="button"
                onClick={() => setMode('correction')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  !isAnalysis
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-900/40 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300 shrink-0" />
                <span className="truncate">{t.modeOwn}</span>
              </button>

              {/* 오른쪽: [타인 문장 분석] */}
              <button
                type="button"
                onClick={() => setMode('analysis')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isAnalysis
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-900/40 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
                <span className="truncate">{t.modeOther}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            maxLength={1000}
            placeholder={placeholderText}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-serif-kr resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
                title={t.paste}
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.paste}</span>
              </button>
              {text && (
                <button
                  type="button"
                  onClick={() => setText('')}
                  className="inline-flex items-center gap-1 hover:text-zinc-300 transition-colors"
                  title={t.clear}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.clear}</span>
                </button>
              )}
            </div>
            <div className="font-mono">
              <span className={text.length > 850 ? 'text-amber-400' : 'text-zinc-400'}>
                {text.length}
              </span>
              /1000 {t.charCount} <span className="hidden sm:inline">{t.ctrlEnterHint}</span>
            </div>
          </div>
        </div>

        {/* Sample Presets */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-[11px] font-semibold text-zinc-400 block mb-2">
            {t.presetTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p.text, p.mode)}
                className="text-left text-xs px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 transition-colors flex items-center gap-1.5 group max-w-full truncate"
              >
                <span className="text-zinc-400 group-hover:text-amber-300 shrink-0 font-medium">
                  {p.label}
                </span>
                <span className="text-zinc-500 truncate max-w-[200px] sm:max-w-[340px]">
                  "{p.text}"
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs">
            {hasApiKey ? (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 px-2.5 py-1 rounded-full border border-emerald-500/30 transition-colors cursor-pointer text-xs"
                title="클릭하여 API 설정을 확인하거나 변경합니다"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.apiKeyRegistered}</span>
                <span className="text-[10px] text-emerald-300 underline ml-0.5 font-medium">(설정 변경)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline cursor-pointer font-medium"
                title="클릭하여 API 키 설정 열기"
              >
                <span>⚙️ {t.byokNotice}</span>
              </button>
            )}
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <span className="text-zinc-500 text-[11px] hidden sm:inline">
              {t.analyzeTimeNotice}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!text.trim() || isLoading}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg ${
              !text.trim() || isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>{t.analyzeBtnLoading}</span>
              </>
            ) : (
              <>
                <span>{t.analyzeBtnIdle}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Step Process Preview */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-left">
        {[
          { num: '1결', name: t.step1Name, desc: isAnalysis ? t.step1DescOther : t.step1DescOwn, color: 'border-blue-500/30 text-blue-300' },
          { num: '2결', name: t.step2Name, desc: isAnalysis ? t.step2DescOther : t.step2DescOwn, color: 'border-amber-500/30 text-amber-300' },
          { num: '3결', name: t.step3Name, desc: isAnalysis ? t.step3DescOther : t.step3DescOwn, color: 'border-emerald-500/30 text-emerald-300' },
          { num: '4결', name: t.step4Name, desc: isAnalysis ? t.step4DescOther : t.step4DescOwn, color: 'border-purple-500/30 text-purple-300' },
          { num: '5결', name: t.step5Name, desc: isAnalysis ? t.step5DescOther : t.step5DescOwn, color: 'border-rose-500/30 text-rose-300' }
        ].map((item, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl bg-[#141518] border ${item.color} flex flex-col justify-between ${
              i === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                {item.num}
              </span>
              <span className="text-xs font-bold text-white font-serif-kr">
                {item.name}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-tight">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
