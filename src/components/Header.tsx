import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Library, Settings, Sparkles, Feather, Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: 'write' | 'reading' | 'bookshelf';
  onSelectTab: (tab: 'write' | 'reading' | 'bookshelf') => void;
  onOpenSettings: () => void;
  savedCount: number;
  hasCurrentRecord: boolean;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  savedCount,
  hasCurrentRecord,
  currentLang,
  onSelectLang
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLang];
  const activeLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#121316]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2.5 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <div 
          onClick={() => onSelectTab('write')}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-md shadow-amber-900/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Feather className="h-4 w-4 sm:h-5 sm:w-5 text-amber-50" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-white font-serif-kr whitespace-nowrap">
                Pentalyze
              </span>
              <span className="hidden sm:inline-block text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium whitespace-nowrap">
                다섯결
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 hidden lg:block whitespace-nowrap">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Actions */}
        <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('write')}
            className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 shrink-0 whitespace-nowrap ${
              currentTab === 'write'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
            title={t.navWrite}
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">{t.navWrite}</span>
          </button>

          {hasCurrentRecord && (
            <button
              type="button"
              onClick={() => onSelectTab('reading')}
              className={`flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 shrink-0 whitespace-nowrap ${
                currentTab === 'reading'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
              title={t.navReading}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="hidden lg:inline whitespace-nowrap">{t.navReading}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onSelectTab('bookshelf')}
            className={`relative flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 shrink-0 whitespace-nowrap ${
              currentTab === 'bookshelf'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
            title={t.navBookshelf}
          >
            <Library className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">{t.navBookshelf}</span>
            {savedCount > 0 && (
              <span className="sm:ml-0.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 text-[9px] sm:text-[10px] font-bold rounded-full bg-amber-500/25 text-amber-300 border border-amber-500/40 shrink-0">
                {savedCount}
              </span>
            )}
          </button>

          {/* 10개국 언어 선택 드롭다운 버튼 */}
          <div className="relative shrink-0" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-2 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-xs sm:text-sm font-medium shrink-0 whitespace-nowrap"
              title="10개국 언어 선택 / Language"
            >
              <span className="text-sm shrink-0">{activeLangInfo.flag}</span>
              <span className="hidden lg:inline font-medium whitespace-nowrap">{activeLangInfo.nativeName}</span>
              <span className="hidden sm:inline lg:hidden font-mono uppercase font-bold text-[11px] whitespace-nowrap">{activeLangInfo.code}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
            </button>

            {/* 드롭다운 메뉴 (10개국 언어 리스트) */}
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#18191f] border border-white/15 p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn divide-y divide-white/5">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  <span>10 Languages / 다국어 선택</span>
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onSelectLang(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 font-semibold'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-medium">{lang.nativeName}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">({lang.label})</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* PWA Install Button */}
          <PWAInstallButton currentLang={currentLang} />

          {/* Settings / BYOK Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            title={t.navSettings}
            className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-2 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-200 hover:text-white hover:bg-amber-500/15 transition-all text-xs sm:text-sm font-medium shadow-sm shrink-0 whitespace-nowrap"
          >
            <Settings className="h-4 w-4 shrink-0 text-amber-400" />
            <span className="hidden xl:inline font-medium whitespace-nowrap">{t.navSettings}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
