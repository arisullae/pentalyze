import React, { useState } from 'react';
import { SentenceRecord, AnalysisMode, LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { 
  Library, 
  Trash2, 
  Search, 
  BookOpen, 
  Calendar, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  Upload, 
  AlertTriangle,
  Lightbulb,
  PenTool,
  Sparkles,
  Settings,
  Check,
  Info
} from 'lucide-react';

interface BookshelfProps {
  records: SentenceRecord[];
  onSelectRecord: (record: SentenceRecord) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onToggleFavorite: (id: string) => void;
  onImportRecords: (records: SentenceRecord[]) => void;
  onNewAnalysis: () => void;
  onOpenSettings?: () => void;
  currentLang: LanguageCode;
}

export const Bookshelf: React.FC<BookshelfProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onClearAll,
  onToggleFavorite,
  onImportRecords,
  onNewAnalysis,
  onOpenSettings,
  currentLang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'correction' | 'analysis' | 'favorite'>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang];

  const showToast = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  // 검색 및 필터링
  const filteredRecords = records.filter((r) => {
    if (filterMode === 'analysis' && r.mode !== 'analysis') return false;
    if (filterMode === 'correction' && r.mode !== 'correction') return false;
    if (filterMode === 'favorite' && !r.isFavorite) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.originalText.toLowerCase().includes(q) ||
      r.summaryShort.toLowerCase().includes(q) ||
      r.steps.step1.title.toLowerCase().includes(q)
    );
  });

  // JSON 백업 다운로드
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pentalyze_library_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // JSON 복원 불러오기
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          onImportRecords(parsed);
          showToast(`✓ ${parsed.length}개 서재 기록을 성공적으로 복원했습니다.`);
        } else {
          showToast('올바르지 않은 JSON 파일 형식입니다.');
        }
      } catch (err) {
        showToast('JSON 파일을 읽는 도중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
      {/* Toast Notice */}
      {feedbackNotice && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2 animate-fadeIn">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Library className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-kr text-white">
              {t.bookshelfTitle}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 font-mono">
              {records.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {t.bookshelfDesc}
          </p>
        </div>

        {/* Right Tools: Settings, Backup & Clear */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 transition-colors"
              title={t.navSettings}
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.navSettings}</span>
            </button>
          )}

          <label 
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 cursor-pointer transition-colors"
            title={t.importLibrary}
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.importLibrary}</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            type="button"
            onClick={handleExportJSON}
            disabled={records.length === 0}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title={t.exportLibrary}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.exportLibrary}</span>
          </button>

          {records.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-300 transition-colors"
              title={t.clearAll}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.clearAll}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="my-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* 필터 탭 (본인 문장 교정이 왼쪽으로 오도록 정렬) */}
        <div className="grid grid-cols-4 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-amber-500 text-black font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.bookshelfAll}
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('correction')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === 'correction'
                ? 'bg-indigo-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ✍️ Own
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('analysis')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === 'analysis'
                ? 'bg-amber-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            💡 Quote
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('favorite')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterMode === 'favorite'
                ? 'bg-amber-400 text-black font-semibold shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.bookshelfFavorite}
          </button>
        </div>

        {/* 검색창 */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.bookshelfSearchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Grid of Books */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-16 sm:py-20 border border-dashed border-white/10 rounded-2xl bg-[#121316]">
          <Library className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-zinc-300 font-serif-kr">
            {t.bookshelfEmpty}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            {searchQuery ? t.bookshelfEmpty : t.bookshelfDesc}
          </p>
          <button
            type="button"
            onClick={onNewAnalysis}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            {t.newAnalysis}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecords.map((item) => {
            const isItemAnalysis = item.mode === 'analysis';
            return (
              <div
                key={item.id}
                onClick={() => onSelectRecord(item)}
                className="group relative rounded-2xl border border-white/10 bg-[#15161a] hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
              >
                {/* Book Spine Accent Line */}
                <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-b from-amber-500/60 to-amber-700/60 rounded-l-2xl" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        isItemAnalysis
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                      }`}
                    >
                      {isItemAnalysis
                        ? `💡 ${t.modeOther}`
                        : `✍️ ${t.modeOwn}`}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(item.id);
                        }}
                        className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-amber-400 transition-colors"
                      >
                        {item.isFavorite ? (
                          <BookmarkCheck className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRecord(item.id);
                        }}
                        className="p-1 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Original Text Preview */}
                  <p className="font-serif-kr text-sm text-zinc-100 font-semibold line-clamp-2 mb-2 group-hover:text-amber-300 transition-colors">
                    "{item.originalText}"
                  </p>

                  {/* Summary Snippet */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.summaryShort}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="flex items-center gap-1 text-amber-400/80 group-hover:text-amber-300 font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.navReading}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full rounded-2xl bg-[#18191c] border border-red-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-kr">
                서재의 모든 기록을 삭제하시겠습니까?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              총 {records.length}권의 모든 분석 기록이 로컬 저장소에서 완전히 삭제됩니다.
              필요한 경우 먼저 [백업 다운로드]를 진행해 주세요.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-white/5"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-lg shadow-red-600/30"
              >
                네, 전체 삭제합니다
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
