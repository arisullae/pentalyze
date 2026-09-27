import React, { useState, useEffect } from 'react';
import { APIConfig, LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { HybridTTSEngine } from '../services/tts';
import { 
  X, 
  Key, 
  Volume2, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  Sparkles,
  Info,
  Code2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Copy,
  Globe
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: APIConfig;
  onSaveConfig: (config: APIConfig) => void;
  currentLang?: LanguageCode;
}

const VERSION_UPDATE_PROMPT = `[Google Gemini AI 모델 버전 갱신 요청]
Pentalyze 프로젝트의 AI 문장 5단계 다각도 분석 및 다국어 번역에 사용되는 Google Gemini 모델을 최신 버전으로 갱신해 주세요.
1. server.ts의 POST /api/analyze, POST /api/translate, POST /api/test-key 및 generateGeminiWithFallback 함수 내 모델 목록을 최신 권장 모델(예: gemini-3.8-flash 또는 최신 Flash 모델)로 갱신해 주세요.
2. src/services/ai.ts의 클라이언트 사이드 폴백 모델도 최신 권장 모델로 동기화해 주세요.
3. 갱신 후 curl 테스트를 통해 /api/test-key 및 /api/analyze 종단이 정상 작동하는지 확인하고, compile_applet 및 lint_applet을 실행해 오류가 없도록 조치해 주세요.`;

const I18N_UPDATE_PROMPT = `[10개 국 언어 매칭 및 다국어 지원 동기화 요청]
Pentalyze 프로젝트의 10개 언어(한국어, 영어, 일본어, 힌디어, 스페인어, 프랑스어, 독일어, 이탈리아어, 포르투갈어, 러시아어) 대응 사전 및 UI 문구를 동기화해 주세요.
1. src/i18n/types.ts의 TranslationDict 인터페이스를 확인하고, 새로 추가되거나 변경된 키가 src/i18n/locales/ 내 10개 언어 파일(ko, en, ja, hi, es, fr, de, it, pt, ru) 모두에 정확히 반영되도록 해 주세요.
2. 각 언어별로 문화적 맥락에 맞는 자연스러운 어휘와 문장 구조를 사용해 주세요.
3. compile_applet 및 lint_applet을 통해 모든 로케일 파일의 타입 검증이 통과하도록 검수해 주세요.`;

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  currentLang = 'ko'
}) => {
  const [formData, setFormData] = useState<APIConfig>(config);
  const [nativeVoices, setNativeVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTestingVoice, setIsTestingVoice] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showDevGuide, setShowDevGuide] = useState<boolean>(false);
  const [hasServerKey, setHasServerKey] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [copiedPromptType, setCopiedPromptType] = useState<'version' | 'i18n' | null>(null);

  const handleCopyPrompt = (type: 'version' | 'i18n', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptType(type);
    setTimeout(() => {
      setCopiedPromptType(null);
    }, 2500);
  };

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['ko'];

  useEffect(() => {
    setFormData(config);
    setTestResult(null);
  }, [config, isOpen]);

  // 서버 환경변수 키 유무 확인
  useEffect(() => {
    if (isOpen) {
      fetch('/api/status')
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.hasServerGeminiKey === 'boolean') {
            setHasServerKey(data.hasServerGeminiKey);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      HybridTTSEngine.getAvailableNativeVoices().then((voices) => {
        setNativeVoices(voices);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleResetKeys = () => {
    const cleared: APIConfig = {
      ...formData,
      geminiKey: '',
      openaiKey: '',
      elevenLabsKey: ''
    };
    setFormData(cleared);
    onSaveConfig(cleared);
    setTestResult({
      success: true,
      message: '저장된 모든 API 키가 초기화되었습니다.'
    });
  };

  // API 연결 테스트
  const handleTestKeyConnection = async () => {
    setIsTestingKey(true);
    setTestResult(null);
    try {
      const activeKey = formData.provider === 'gemini' ? formData.geminiKey : formData.openaiKey;
      const res = await fetch('/api/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: formData.provider,
          apiKey: activeKey?.trim() || undefined
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({ success: true, message: data.message || 'API 연결에 성공했습니다.' });
      } else {
        setTestResult({ success: false, message: data.error || '연결에 실패했습니다. 키를 확인해 주세요.' });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || '네트워크 연결 오류' });
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleTestTTS = async () => {
    setIsTestingVoice(true);
    const testText = currentLang === 'en'
      ? 'Hello! This is the Pentalyze audio engine.'
      : '안녕하세요! Pentalyze 다섯결의 문장 낭독 오디오 엔진입니다.';
    await HybridTTSEngine.speak({
      text: testText,
      useElevenLabs: Boolean(formData.elevenLabsKey && formData.elevenLabsVoiceId),
      elevenLabsKey: formData.elevenLabsKey,
      elevenLabsVoiceId: formData.elevenLabsVoiceId,
      preferredVoiceURI: formData.preferredVoiceURI,
      onEnd: () => setIsTestingVoice(false),
      onError: () => setIsTestingVoice(false)
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#17181c] p-5 sm:p-6 shadow-2xl text-zinc-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-serif-kr text-white">
              {t.navSettings} (BYOK & Voice)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            입력하신 모든 API Key는 외부 데이터베이스에 저장되지 않으며, 사용자 본인의 브라우저 
            <strong> LocalStorage</strong>에만 보관됩니다. (MIT 오픈소스 BYOK 규약 준수)
          </p>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-6">
          {/* AI Model Provider */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              LLM 분석 엔진 선택
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, provider: 'gemini' })}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  formData.provider === 'gemini'
                    ? 'border-amber-500/60 bg-amber-500/10 text-white shadow-sm'
                    : 'border-white/10 bg-black/20 text-zinc-400 hover:bg-white/5'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Google Gemini 3.8 Flash</span>
                  {formData.provider === 'gemini' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">{t.aiModelDesc}</p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, provider: 'openai' })}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  formData.provider === 'openai'
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-white shadow-sm'
                    : 'border-white/10 bg-black/20 text-zinc-400 hover:bg-white/5'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>OpenAI GPT</span>
                  {formData.provider === 'openai' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">gpt-4o-mini 모델 호환</p>
              </button>
            </div>
          </div>

          {/* Gemini API Key */}
          {formData.provider === 'gemini' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-zinc-300">Gemini API Key</label>
                  {hasServerKey && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ✓ 서버 기본키 사용 가능
                    </span>
                  )}
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>키 무료 발급받기</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="password"
                value={formData.geminiKey}
                onChange={(e) => setFormData({ ...formData, geminiKey: e.target.value })}
                placeholder={
                  hasServerKey
                    ? "서버 키가 등록되어 있습니다 (개인 키를 입력하면 개인 키가 우선 적용됩니다)"
                    : "AIzaSy... 본인의 Gemini API 키를 입력하세요"
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-xs sm:text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/60"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleTestKeyConnection}
                  disabled={isTestingKey}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTestingKey ? '연결 확인 중...' : 'Gemini API 연결 테스트'}</span>
                </button>
              </div>
            </div>
          )}

          {/* OpenAI API Key */}
          {formData.provider === 'openai' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-medium text-zinc-300">OpenAI API Key</label>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>OpenAI 키 발급</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="password"
                value={formData.openaiKey}
                onChange={(e) => setFormData({ ...formData, openaiKey: e.target.value })}
                placeholder="sk-proj-..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-xs sm:text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60"
              />
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleTestKeyConnection}
                  disabled={isTestingKey}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTestingKey ? '연결 확인 중...' : 'OpenAI API 연결 테스트'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Connection Test Result Feedback */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-fadeIn ${
                testResult.success
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/15 border-red-500/30 text-red-300'
              }`}
            >
              {testResult.success ? (
                <Check className="w-4 h-4 shrink-0" />
              ) : (
                <Info className="w-4 h-4 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* ElevenLabs Section (개인 음성 복제 확장 기능) */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  개인 음성 복제 TTS (ElevenLabs 확장)
                </span>
                <span className="text-[11px] text-zinc-400">
                  내 목소리로 책을 읽어주는 모드를 활성화하려면 설정하세요.
                </span>
              </div>
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>ElevenLabs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">xi-api-key</label>
                <input
                  type="password"
                  value={formData.elevenLabsKey}
                  onChange={(e) => setFormData({ ...formData, elevenLabsKey: e.target.value })}
                  placeholder="ElevenLabs API Key"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/40 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Voice ID (학습된 목소리)</label>
                <input
                  type="text"
                  value={formData.elevenLabsVoiceId}
                  onChange={(e) => setFormData({ ...formData, elevenLabsVoiceId: e.target.value })}
                  placeholder="예: 21m00Tcm4TlvDq8ikWAM"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/40 text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60"
                />
              </div>
            </div>
          </div>

          {/* WebSpeech Engine Voice Preference & Test */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                기기 내장 기본 음성 (WebSpeech API)
              </span>
              <button
                type="button"
                onClick={handleTestTTS}
                disabled={isTestingVoice}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-300 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isTestingVoice ? '재생 중...' : '음성 테스트'}</span>
              </button>
            </div>

            {nativeVoices.length > 0 && (
              <select
                value={formData.preferredVoiceURI || ''}
                onChange={(e) => setFormData({ ...formData, preferredVoiceURI: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/40 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/60"
              >
                <option value="">시스템 기본 한국어 음성 (자동 선택)</option>
                {nativeVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Developer & Commercial Service Integration Guide (개발자 & 상용 API 연동 가이드) */}
          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowDevGuide(!showDevGuide)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  개발자 가이드: 상용 API 연결 & 버전 매칭 안내
                </span>
              </div>
              {showDevGuide ? (
                <ChevronUp className="w-4 h-4 text-zinc-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {showDevGuide && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs space-y-3 leading-relaxed text-zinc-300">
                <div>
                  <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    1. Google Gemini API 버전 매칭
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    기본 모델은 <code className="text-amber-200 bg-white/5 px-1 py-0.5 rounded">gemini-3.8-flash</code>이며, 구조화된 JSON 응답 및 빠른 5결 다각도 분석에 최적화되어 있습니다.
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-zinc-400 mt-1 space-y-0.5">
                    <li>코드 위치: <code className="text-zinc-200 font-mono">server.ts</code> 및 <code className="text-zinc-200 font-mono">src/services/ai.ts</code></li>
                    <li>호환 버전: <code className="text-zinc-300 font-mono">gemini-3.8-flash</code>, <code className="text-zinc-300 font-mono">gemini-3.1-pro-preview</code></li>
                    <li>무료 발급: Google AI Studio 콘솔에서 즉시 API 키 생성 가능</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    2. OpenAI GPT 모델 연동
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    비용 효율적인 <code className="text-emerald-200 bg-white/5 px-1 py-0.5 rounded">gpt-4o-mini</code> 모델을 기준으로 작성되었으며, 상용 환경에 따라 <code className="text-zinc-300 font-mono">gpt-4o</code> 등으로 손쉽게 교체할 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-zinc-400 mt-1 space-y-0.5">
                    <li>코드 위치: <code className="text-zinc-200 font-mono">src/services/ai.ts</code> 내 <code className="text-zinc-200 font-mono">analyzeWithOpenAI()</code></li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-indigo-300 flex items-center gap-1.5 mb-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    3. 하이브리드 음성 엔진 (WebSpeech & ElevenLabs)
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    추가 비용이 전혀 없는 브라우저 표준 WebSpeech API를 1차 기본 엔진으로 사용하며, 맞춤 복제 음성 필요 시 ElevenLabs를 지원합니다.
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-zinc-400 mt-1 space-y-0.5">
                    <li>코드 위치: <code className="text-zinc-200 font-mono">src/services/tts.ts</code></li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-blue-300 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    4. BYOK(Bring Your Own Key) 보안 정책 & 배포
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    모든 API 키는 사용자 로컬스토리지에만 저장되므로, 깃허브 공개 및 정적 호스팅(GitHub Pages, Vercel, Netlify) 시에도 비밀키 유출 위험이 없습니다.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    5. 타 사 LLM 확장 가이드 (Claude, DeepSeek, Mistral, Ollama)
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    이 프로젝트의 5결 분석 파이프라인은 정형화된 JSON 스키마를 따릅니다. 타 사 LLM을 도입하려면 <code className="text-zinc-200 font-mono">src/services/ai.ts</code>에 어댑터를 추가하세요.
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-zinc-400 mt-1 space-y-0.5">
                    <li><strong>OpenAI 호환 API (DeepSeek, Mistral, Ollama/로컬 LLM)</strong>: <code className="text-zinc-200 font-mono">analyzeWithOpenAI()</code>의 엔드포인트 URL(<code className="text-zinc-300 font-mono">baseURL</code>)과 모델명만 변경하면 즉시 연동됩니다.</li>
                    <li><strong>Anthropic Claude</strong>: <code className="text-zinc-200 font-mono">https://api.anthropic.com/v1/messages</code> 호출 어댑터 함수를 구현하고 프롬프트를 전달합니다.</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <h4 className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    6. 타 사 음성 API 확장 가이드 (OpenAI TTS, Azure Speech)
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    <code className="text-zinc-200 font-mono">src/services/tts.ts</code>의 <code className="text-zinc-200 font-mono">HybridTTSEngine.speak()</code> 메서드 내에서 OpenAI Audio API(<code className="text-zinc-300 font-mono">tts-1</code> / <code className="text-zinc-300 font-mono">tts-1-hd</code>)나 Azure Speech REST 엔드포인트를 호출하여 Blob 오디오를 수신한 뒤 <code className="text-zinc-300 font-mono">new Audio(URL.createObjectURL(blob))</code>로 재생하도록 확장할 수 있습니다.
                  </p>
                </div>

                {/* 7. AI 모델 버전 업그레이드 및 신규 기능 확장 개발 가이드 */}
                <div className="pt-3 border-t border-white/10 bg-amber-500/5 -mx-4 px-4 py-3 rounded-xl border border-amber-500/20">
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <h4 className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {t.devGuideVersionTitle}
                    </h4>
                    <a
                      href="https://aistudio.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/30 hover:from-amber-500/30 hover:to-amber-600/40 text-amber-200 text-[11px] font-semibold transition-all border border-amber-500/40 hover:scale-[1.02] shadow-sm"
                      title="Google AI Studio 개발 콘솔로 바로 이동"
                    >
                      <span>{t.devGuideStudioLink}</span>
                      <ExternalLink className="w-3 h-3 text-amber-300" />
                    </a>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                    AI 모델의 신규 버전 출시(예: gemini-3.8-flash 이후 새로운 버전 릴리스) 이슈가 발생하거나, 신규 기능 확장을 위해 처음 접근하는 개발자/사용자는 아래 템플릿을 복사하여 Google AI Studio 빌드 프롬프트 창에 바로 전송하시면 안전하고 완벽하게 최신 버전 갱신과 10개국 언어 동기화를 일괄 적용할 수 있습니다.
                  </p>

                  <div className="space-y-3">
                    {/* Prompt A: 모델 버전 갱신 요청 프롬프트 */}
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-emerald-300 text-[11px] flex items-center gap-1">
                          <Cpu className="w-3 h-3" />
                          [프롬프트 A] AI 모델 버전 갱신 요청 템플릿
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt('version', VERSION_UPDATE_PROMPT)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-200 text-[10px] font-medium transition-colors"
                        >
                          {copiedPromptType === 'version' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300">{t.devGuidePromptCopied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t.devGuidePromptCopy}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[10px] font-mono text-zinc-300 whitespace-pre-wrap bg-black/40 p-2 rounded border border-white/5 select-all leading-relaxed">
{VERSION_UPDATE_PROMPT}
                      </pre>
                    </div>

                    {/* Prompt B: 10개국 언어 매칭 및 동기화 요청 프롬프트 */}
                    <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-cyan-300 text-[11px] flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          [프롬프트 B] 10개 국 언어 매칭 및 다국어 동기화 템플릿
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPrompt('i18n', I18N_UPDATE_PROMPT)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-200 text-[10px] font-medium transition-colors"
                        >
                          {copiedPromptType === 'i18n' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-300">{t.devGuidePromptCopied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t.devGuidePromptCopy}</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-[10px] font-mono text-zinc-300 whitespace-pre-wrap bg-black/40 p-2 rounded border border-white/5 select-all leading-relaxed">
{I18N_UPDATE_PROMPT}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleResetKeys}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors underline underline-offset-4"
            >
              저장된 API 키 초기화
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-zinc-300 transition-colors"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-900/30"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>저장 완료</span>
                  </>
                ) : (
                  <span>설정 저장하기</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
