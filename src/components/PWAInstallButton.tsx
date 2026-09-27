import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Monitor, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface PWAInstallButtonProps {
  currentLang?: LanguageCode;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ currentLang = 'ko' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const t = TRANSLATIONS[currentLang];

  // 이미 PWA 독립 창(Standalone)으로 실행 중인 경우
  if (isInstalled) {
    return (
      <div 
        className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium"
        title="PWA 전용 독립 창으로 실행 중입니다"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden xl:inline">App Installed</span>
      </div>
    );
  }

  const handleButtonClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        // 사용자가 취소했거나 프롬프트가 즉시 뜨지 않을 경우 가이드 모달 표시
        setShowGuideModal(true);
      }
    } else {
      // 프롬프트가 지원되지 않는 환경이거나 iOS인 경우 가이드 모달 표시
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {/* 헤더에 항상 확실히 보이는 [앱 설치] 버튼 */}
      <button
        type="button"
        onClick={handleButtonClick}
        className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-2 rounded-lg border transition-all text-xs sm:text-sm font-semibold shadow-sm shrink-0 whitespace-nowrap ${
          isInstallable
            ? 'border-amber-500/50 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 ring-1 ring-amber-400/30'
            : 'border-white/15 bg-white/[0.06] text-zinc-200 hover:bg-white/10 hover:text-white'
        }`}
        title={t.installAppTooltip}
      >
        <Download className={`w-3.5 h-3.5 shrink-0 ${isInstallable ? 'animate-bounce text-amber-400' : 'text-amber-300'}`} />
        <span className="hidden xl:inline font-medium whitespace-nowrap">{t.installApp}</span>
      </button>

      {/* PWA 설치 안내 통합 모달 */}
      {showGuideModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowGuideModal(false)}
        >
          <div 
            className="w-full max-w-md rounded-2xl bg-[#17181c] border border-white/15 p-6 shadow-2xl text-zinc-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.pwaModalTitle}
                  </h3>
                  <span className="text-[11px] text-amber-400/90 font-medium">
                    Progressive Web App
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Benefit Highlights */}
            <div className="space-y-2 p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.pwaBenefitSpeed}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Monitor className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t.pwaBenefitStandalone}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.pwaBenefitOffline}</span>
              </div>
            </div>

            {/* Conditional Platform Guides */}
            {isIOS ? (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Smartphone className="w-4 h-4" />
                  <h4>{t.iosInstallGuideTitle}</h4>
                </div>
                <ul className="space-y-1 text-zinc-300 leading-relaxed list-none pl-1">
                  <li>{t.iosInstallStep1}</li>
                  <li>{t.iosInstallStep2}</li>
                  <li>{t.iosInstallStep3}</li>
                </ul>
              </div>
            ) : isInstallable ? (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-3">
                <p className="text-zinc-200">
                  브라우저의 원클릭 설치 준비가 완료되었습니다. 아래 버튼을 눌러 앱을 설치하세요.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    await install();
                    setShowGuideModal(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.pwaInstallNow}</span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-zinc-200">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <h4>{t.desktopInstallGuideTitle}</h4>
                </div>
                <div className="space-y-1.5 text-zinc-300 leading-relaxed">
                  <p>{t.desktopInstallStep1}</p>
                  <p>{t.desktopInstallStep2}</p>
                </div>
              </div>
            )}

            {/* Bottom Close / Confirm */}
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 py-2.5 text-xs font-semibold transition-colors"
            >
              {t.confirm}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
