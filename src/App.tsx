import React, { useState, useEffect } from 'react';
import { SentenceRecord, AnalysisMode, APIConfig, LanguageCode } from './types';
import { 
  loadRecords, 
  saveRecords, 
  addRecord, 
  deleteRecord, 
  clearAllRecords, 
  toggleFavorite, 
  loadAPIConfig, 
  saveAPIConfig,
} from './services/storage';
import { analyzeSentence } from './services/ai';
import { TRANSLATIONS } from './i18n/translations';
import { Header } from './components/Header';
import { SentenceInput } from './components/SentenceInput';
import { Book3D } from './components/Book3D';
import { Bookshelf } from './components/Bookshelf';
import { SettingsModal } from './components/SettingsModal';
import { ExportModal } from './components/ExportModal';
import { AlertCircle, X, BookOpen } from 'lucide-react';

const LANG_STORAGE_KEY = 'pentalyze_preferred_language';

export default function App() {
  const [records, setRecords] = useState<SentenceRecord[]>([]);
  const [activeRecord, setActiveRecord] = useState<SentenceRecord | null>(null);
  const [currentTab, setCurrentTab] = useState<'write' | 'reading' | 'bookshelf'>('write');
  const [apiConfig, setApiConfig] = useState<APIConfig>(loadAPIConfig());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [exportRecord, setExportRecord] = useState<SentenceRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasServerGeminiKey, setHasServerGeminiKey] = useState<boolean>(false);

  // 서버 환경변수 키 유무 확인
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hasServerGeminiKey === 'boolean') {
          setHasServerGeminiKey(data.hasServerGeminiKey);
        }
      })
      .catch(() => {});
  }, []);

  // 10개국 언어 설정 (LocalStorage 캐시 지원)
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as LanguageCode;
      if (saved) return saved;
    }
    return 'ko';
  });

  const t = TRANSLATIONS[currentLang];

  // 언어 변경 핸들러
  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
  };

  // 초기 서재 로드
  useEffect(() => {
    const loaded = loadRecords();
    setRecords(loaded);
    if (loaded.length > 0) {
      setActiveRecord(loaded[0]);
    }
  }, []);

  // API 설정 저장
  const handleSaveConfig = (newConfig: APIConfig) => {
    setApiConfig(newConfig);
    saveAPIConfig(newConfig);
  };

  // 분석 실행 (현재 선택된 언어로 생성 요청)
  const handleAnalyze = async (text: string, mode: AnalysisMode) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await analyzeSentence({
        text,
        mode,
        provider: apiConfig.provider,
        apiKey: apiConfig.provider === 'gemini' ? apiConfig.geminiKey : apiConfig.openaiKey,
        language: currentLang
      });

      const newRecord: SentenceRecord = {
        id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: Date.now(),
        originalText: text,
        mode,
        language: currentLang,
        summaryShort: result.summaryShort,
        steps: result.steps,
        isFavorite: false
      };

      const updatedRecords = addRecord(newRecord);
      setRecords(updatedRecords);
      setActiveRecord(newRecord);
      setCurrentTab('reading');
    } catch (err: any) {
      console.error('Analyze failed', err);
      setErrorMessage(
        err.message || '문장 분석 중 오류가 발생했습니다. API 설정을 확인해 주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 기록 업데이트 (예: 번역 결과 캐싱 저장)
  const handleUpdateRecord = (updated: SentenceRecord) => {
    const newRecords = records.map((r) => (r.id === updated.id ? updated : r));
    setRecords(newRecords);
    saveRecords(newRecords);
    setActiveRecord(updated);
  };

  // 서재에서 선택
  const handleSelectRecord = (record: SentenceRecord) => {
    setActiveRecord(record);
    setCurrentTab('reading');
  };

  // 개별 삭제
  const handleDeleteRecord = (id: string) => {
    const updated = deleteRecord(id);
    setRecords(updated);
    if (activeRecord?.id === id) {
      setActiveRecord(updated.length > 0 ? updated[0] : null);
      if (updated.length === 0) {
        setCurrentTab('write');
      }
    }
  };

  // 전체 삭제
  const handleClearAll = () => {
    clearAllRecords();
    setRecords([]);
    setActiveRecord(null);
    setCurrentTab('write');
  };

  // 즐겨찾기 토글
  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavorite(id);
    setRecords(updated);
    if (activeRecord?.id === id) {
      setActiveRecord((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  // JSON 복원 가져오기
  const handleImportRecords = (newRecords: SentenceRecord[]) => {
    setRecords(newRecords);
    saveRecords(newRecords);
    if (newRecords.length > 0) {
      setActiveRecord(newRecords[0]);
    }
  };

  // 내보내기 모달 열기
  const handleOpenExport = (record: SentenceRecord) => {
    setExportRecord(record);
    setIsExportOpen(true);
  };

  const hasEffectiveGeminiKey = Boolean(apiConfig.geminiKey || hasServerGeminiKey);
  const hasApiKey = Boolean(
    (apiConfig.provider === 'gemini' && hasEffectiveGeminiKey) ||
    (apiConfig.provider === 'openai' && Boolean(apiConfig.openaiKey))
  );

  return (
    <div className="min-h-screen bg-[#0f1013] text-zinc-100 flex flex-col selection:bg-amber-800 selection:text-white">
      {/* Header with 10 Languages Selector */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        savedCount={records.length}
        hasCurrentRecord={Boolean(activeRecord)}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="mx-auto w-full max-w-4xl px-4 pt-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm shadow-lg">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setIsSettingsOpen(true);
                }}
                className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium text-xs transition-colors"
              >
                API 설정 열기
              </button>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="p-1 text-red-400 hover:text-red-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Views */}
      <main className="flex-1">
        {currentTab === 'write' && (
          <SentenceInput
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onOpenSettings={() => setIsSettingsOpen(true)}
            hasApiKey={hasApiKey}
            currentLang={currentLang}
          />
        )}

        {currentTab === 'reading' && (
          <div className="py-4">
            {activeRecord ? (
              <Book3D
                record={activeRecord}
                onToggleFavorite={handleToggleFavorite}
                apiConfig={apiConfig}
                hasApiKey={hasApiKey}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenExport={handleOpenExport}
                currentLang={currentLang}
                onUpdateRecord={handleUpdateRecord}
                onSelectLang={handleSelectLang}
              />
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">{t.selectBookPrompt}</p>
                <button
                  type="button"
                  onClick={() => setCurrentTab('write')}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs"
                >
                  {t.navWrite}
                </button>
              </div>
            )}
          </div>
        )}

        {currentTab === 'bookshelf' && (
          <Bookshelf
            records={records}
            onSelectRecord={handleSelectRecord}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearAll}
            onToggleFavorite={handleToggleFavorite}
            onImportRecords={handleImportRecords}
            onNewAnalysis={() => setCurrentTab('write')}
            onOpenSettings={() => setIsSettingsOpen(true)}
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#0b0c0e] py-6 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-400 font-serif-kr">Pentalyze : 다섯결</span>
            <span>—</span>
            <span>{t.brandSubtitle}</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>BYOK Open-Source Architecture</span>
            <span>•</span>
            <span>Zero-Cost Local Archive</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="text-amber-400 hover:underline"
            >
              {t.navSettings}
            </button>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={apiConfig}
        onSaveConfig={handleSaveConfig}
        currentLang={currentLang}
      />

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        record={exportRecord}
      />
    </div>
  );
}
