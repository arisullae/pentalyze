import React, { useState, useEffect, useRef } from 'react';
import { SentenceRecord, StepData, APIConfig, LanguageCode } from '../types';
import { HybridTTSEngine } from '../services/tts';
import { soundFX } from '../services/sound';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { translateSentenceRecord } from '../services/ai';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Volume2,
  Square,
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  Check,
  Sparkles,
  Maximize2,
  Minimize2,
  BookOpen,
  Headphones,
  Sliders,
  Compass,
  Rotate3d,
  Glasses,
  Smartphone,
  Layers,
  Hand,
  Globe,
  Loader2,
  Columns,
  Settings,
  AlertCircle,
  Repeat,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface Book3DProps {
  record: SentenceRecord;
  onToggleFavorite: (id: string) => void;
  apiConfig: APIConfig;
  hasApiKey?: boolean;
  onOpenSettings: () => void;
  onOpenExport: (record: SentenceRecord) => void;
  currentLang: LanguageCode;
  onUpdateRecord?: (updated: SentenceRecord) => void;
  onSelectLang?: (lang: LanguageCode) => void;
}

export type ViewAngleMode = 'flat' | 'spatial' | 'xr';

export const Book3D: React.FC<Book3DProps> = ({
  record,
  onToggleFavorite,
  apiConfig,
  hasApiKey: hasApiKeyProp,
  onOpenSettings,
  onOpenExport,
  currentLang,
  onUpdateRecord,
  onSelectLang
}) => {
  // 총 7개 페이지: 0: 표지, 1~5: 1~5결, 6: 마지막 총람 맺음말
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBookLangDropdownOpen, setIsBookLangDropdownOpen] = useState<boolean>(false);
  const bookLangRef = useRef<HTMLDivElement>(null);

  // 3D 뷰 앵글 모드: flat(평면 독서) | spatial(3D 입체) | xr(XR 공간)
  const [viewMode, setViewMode] = useState<ViewAngleMode>('spatial');
  const [isMotionTrackingEnabled, setIsMotionTrackingEnabled] = useState<boolean>(false);
  const [motionTilt, setMotionTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 디바이스 환경 & 방향(Portrait / Landscape) 및 뷰포트 상태
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [isMobilePortrait, setIsMobilePortrait] = useState<boolean>(false);
  const [canDisplayTwoPageSpread, setCanDisplayTwoPageSpread] = useState<boolean>(false);
  const [forceFlipAxis, setForceFlipAxis] = useState<'auto' | 'horizontal' | 'vertical'>('auto');

  // 책장 잡고 넘기기 (Grip & Drag Flip Mode) 상태
  const [isGripModeActive, setIsGripModeActive] = useState<boolean>(false);
  const [isHoldingPage, setIsHoldingPage] = useState<boolean>(false);
  const [dragProgress, setDragProgress] = useState<number>(0); // 0.0 ~ 1.0
  const [dragTargetDir, setDragTargetDir] = useState<'next' | 'prev'>('next');
  const [gripHintNotice, setGripHintNotice] = useState<string | null>(null);
  const buttonDragOccurredRef = useRef<boolean>(false);
  const isDraggingFromButtonRef = useRef<boolean>(false);
  const isHoldingPageRef = useRef<boolean>(false);
  const dragProgressRef = useRef<number>(0);
  const dragTargetDirRef = useRef<'next' | 'prev'>('next');

  // 다국어 실시간 번역 진행 상태
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // 원문-번역/교정 대조 듀얼 뷰 (Bilingual Split-View) 상태
  const [isSplitView, setIsSplitView] = useState<boolean>(false);

  // 오디오/TTS 상태
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAutoPlayMode, setIsAutoPlayMode] = useState<boolean>(false);
  const [ttsRate, setTtsRate] = useState<number>(1.0);
  const [useElevenLabs, setUseElevenLabs] = useState<boolean>(
    Boolean(apiConfig.elevenLabsKey && apiConfig.elevenLabsVoiceId)
  );
  const [showTtsPanel, setShowTtsPanel] = useState<boolean>(false);

  // 대조 뷰(Split-View) 맞춤형 오디오 & 낭독 설정 상태
  const [splitAudioTarget, setSplitAudioTarget] = useState<'original' | 'translated' | 'alternate'>('alternate');
  const [splitAudioFilter, setSplitAudioFilter] = useState({
    includeTitle: true,
    includeMain: true,
    includeDetails: false,
    includeAdvice: false
  });
  const [showSplitFilterPopover, setShowSplitFilterPopover] = useState<boolean>(false);
  const splitFilterRef = useRef<HTMLDivElement>(null);
  const [activeSpeakingSide, setActiveSpeakingSide] = useState<'left' | 'right' | null>(null);

  // 터치/마우스 좌표 추적
  const touchStartCoord = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPointerDownRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 헤더의 currentLang = 사용자의 모국어/국적 베이스 UI 언어
  const t = TRANSLATIONS[currentLang];
  const activeUiLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  // 3D 책장 내부의 bookTargetLang = 사용자가 책을 다른 언어로 번역 및 열람하기 위한 도서 전용 타겟 언어
  // 기본값: 책이 작성된 언어 또는 사용자의 베이스 언어
  const [bookTargetLang, setBookTargetLang] = useState<LanguageCode>(() => {
    return (record.language as LanguageCode) || currentLang;
  });

  const activeBookLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === bookTargetLang) || SUPPORTED_LANGUAGES[0];
  const recordOriginalLang = (record.language as LanguageCode) || 'ko';
  const recordOriginalLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === recordOriginalLang) || SUPPORTED_LANGUAGES[0];

  // 국가 코드 (예: KR, US, JP, IN, ES 등) 추출 헬퍼
  const getLanguageCountryCode = (lang: typeof SUPPORTED_LANGUAGES[number]): string => {
    if (lang.speechCode && lang.speechCode.includes('-')) {
      return lang.speechCode.split('-')[1].toUpperCase();
    }
    return lang.code.toUpperCase();
  };

  const recordOriginalCountryCode = getLanguageCountryCode(recordOriginalLangInfo);
  const targetCountryCode = getLanguageCountryCode(activeBookLangInfo);

  const isOriginalLang = bookTargetLang === recordOriginalLang;
  const hasTargetTranslation = Boolean(record.translations?.[bookTargetLang]);
  const isContentInTargetLang = isOriginalLang || hasTargetTranslation;

  const isAnalysis = record.mode === 'analysis';
  const totalPages = 6; // 0 to 6
  const stepKeys: (keyof typeof record.steps)[] = ['step1', 'step2', 'step3', 'step4', 'step5'];

  // 현재 책장 타겟 언어에 따른 본문 데이터 (원문 또는 번역 캐시)
  const displaySteps = isOriginalLang
    ? record.steps
    : record.translations?.[bookTargetLang]?.steps || record.steps;
  const displaySummary = isOriginalLang
    ? record.summaryShort
    : record.translations?.[bookTargetLang]?.summaryShort || record.summaryShort;

  const [translationError, setTranslationError] = useState<string | null>(null);

  // API 키 등록 여부 검증 (서버 키 인식 포함)
  const hasApiKey = hasApiKeyProp !== undefined
    ? hasApiKeyProp
    : Boolean(apiConfig.geminiKey || (apiConfig.provider === 'openai' && apiConfig.openaiKey));

  // 디바이스 화면 크기 및 방향(Portrait / Landscape) 정밀 감지
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const portrait = h >= w || window.matchMedia('(orientation: portrait)').matches;
      const mobile = w <= 768;
      setIsPortraitMode(portrait);
      setIsMobileScreen(mobile);
      setIsMobilePortrait(portrait && mobile);
      // 화면 가로 폭이 920px 이상이고 가로 모드일 때만 2페이지 양면 펼침(Spread) 허용
      setCanDisplayTwoPageSpread(!portrait && w >= 920 && h >= 480);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // 3D 책장 내부 언어 드롭다운 및 대조 뷰 필터 팝오버 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (bookLangRef.current && !bookLangRef.current.contains(event.target as Node)) {
        setIsBookLangDropdownOpen(false);
      }
      if (splitFilterRef.current && !splitFilterRef.current.contains(event.target as Node)) {
        setShowSplitFilterPopover(false);
      }
    };
    if (isBookLangDropdownOpen || showSplitFilterPopover) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isBookLangDropdownOpen, showSplitFilterPopover]);

  // 단일 페이지 뷰 vs 2페이지 양면 펼침 모드 결정
  const effectiveLayoutMode: 'single' | 'spread' =
    forceFlipAxis === 'vertical'
      ? 'single'
      : forceFlipAxis === 'horizontal'
      ? canDisplayTwoPageSpread ? 'spread' : 'single'
      : canDisplayTwoPageSpread ? 'spread' : 'single';

  const effectiveFlipAxis = effectiveLayoutMode === 'single' ? 'vertical' : 'horizontal';

  const getPageStepData = (pageNum: number): { stepData: StepData; stepNum: number } | null => {
    if (pageNum >= 1 && pageNum <= 5) {
      const key = stepKeys[pageNum - 1];
      return { stepData: displaySteps[key], stepNum: pageNum };
    }
    return null;
  };

  const getCoverLabel = () => (currentLang === 'ko' ? '표지' : currentLang === 'ja' ? '表紙' : 'Cover');
  const getSummaryLabel = () => (currentLang === 'ko' ? '총람' : currentLang === 'ja' ? '総覧' : 'Summary');

  const getPageBadge = (pageNum: number) => {
    const stepName =
      pageNum === 1 ? t.step1Name :
      pageNum === 2 ? t.step2Name :
      pageNum === 3 ? t.step3Name :
      pageNum === 4 ? t.step4Name :
      pageNum === 5 ? t.step5Name : '';

    const label =
      currentLang === 'ko' ? `${pageNum}결 · ${stepName}` :
      currentLang === 'ja' ? `${pageNum}結 · ${stepName}` :
      `Step ${pageNum} · ${stepName}`;

    switch (pageNum) {
      case 1:
        return { name: label, color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 2:
        return { name: label, color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 3:
        return { name: label, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 4:
        return { name: label, color: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 5:
        return { name: label, color: 'bg-rose-100 text-rose-900 border-rose-300' };
      default:
        return { name: label || t.step2Name, color: 'bg-zinc-100 text-zinc-800 border-zinc-300' };
    }
  };

  // 실물 종이 말림 애니메이션 페이지 이동
  const goToPage = (nextPage: number) => {
    if (isFlipping || nextPage === currentPage) return;
    if (nextPage < 0 || nextPage > totalPages) return;

    const dir = nextPage > currentPage ? 'next' : 'prev';
    setFlipDirection(dir);
    setIsFlipping(true);

    soundFX.playPageTurnSound();

    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsFlipping(false);
      setIsHoldingPage(false);
      setDragProgress(0);

      if (nextPage === 5 || nextPage === 6) {
        try {
          confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.85 }
          });
        } catch {}
      }
    }, 720);
  };

  const nextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      goToPage(currentPage - 1);
    }
  };

  // 자이로 모션 (모바일 자이로 센서 & PC 마우스 패럴랙스 틸트 지원)
  useEffect(() => {
    if (!isMotionTrackingEnabled) {
      setMotionTilt({ x: 0, y: 0 });
      return;
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltX = Math.max(-15, Math.min(15, e.gamma / 2.2));
        const tiltY = Math.max(-15, Math.min(15, (e.beta - 45) / 2.2));
        setMotionTilt({ x: tiltX, y: tiltY });
      }
    };

    // PC 데스크톱 환경에서도 틸트 효과를 체감할 수 있도록 마우스 위치 기반 미세 틸트 연동
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined') return;
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const offsetY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMotionTilt({ x: offsetX * 7, y: offsetY * 7 });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMotionTrackingEnabled]);

  // 키보드 조작
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        (effectiveFlipAxis === 'vertical' && e.key === 'ArrowDown')
      ) {
        nextPage();
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp' ||
        (effectiveFlipAxis === 'vertical' && e.key === 'ArrowUp')
      ) {
        prevPage();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAudio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping, effectiveFlipAxis]);

  // 잡고 넘기기 안내 힌트 토스트 발동
  const showGripDragHint = () => {
    const hintMsg =
      effectiveFlipAxis === 'vertical'
        ? (currentLang === 'ko' ? '🖐 [잡고 넘기기 모드] 버튼을 누른 채 상/하로 드래그하여 넘겨주세요' : '🖐 [Grip Mode] Press and drag the button vertically to flip')
        : (currentLang === 'ko' ? '🖐 [잡고 넘기기 모드] 버튼을 누른 채 좌/우로 드래그하여 넘겨주세요' : '🖐 [Grip Mode] Press and drag the button horizontally to flip');
    setGripHintNotice(hintMsg);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(30); } catch (_) {}
    }
    setTimeout(() => {
      setGripHintNotice((prev) => (prev === hintMsg ? null : prev));
    }, 2400);
  };

  // ---------------------------------------------------------------------------
  // [개발·운영자 핸드오버 노트] 넘기기 버튼 전용: 모던 Pointer Events API & 캡처 제어
  // 상세 기술 문서: /docs/DEVELOPER_HANDOVER_3D_XR_DRAG.md
  // 1) 틸트 ON: mousemove/gyro 이벤트로 매 프레임 레이어가 리렌더링되며 Compositor가
  //    히트테스팅을 연속 재계산하여 드래그 반응이 즉각적임.
  // 2) 틸트 OFF: 정적 3D 각도(rotateX: 14~18deg)에서 서브픽셀 정적 캐시 및 2D-3D 벡터
  //    왜곡이 발생할 수 있으므로, setPointerCapture와 touch-none으로 포인터를 완전 캡처함.
  // 3) 향후 유지보수 시 onLostPointerCapture 및 감도 계수(getDragSensitivity) 가변화 적용 가능.
  // ---------------------------------------------------------------------------
  const handleButtonLostPointerCapture = () => {
    isPointerDownRef.current = false;
    isHoldingPageRef.current = false;
    setIsHoldingPage(false);
    setDragProgress(0);
  };

  const handleButtonPointerDown = (
    dir: 'next' | 'prev',
    e: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (isFlipping) return;
    if (isGripModeActive) {
      e.preventDefault();
      e.stopPropagation();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
      isPointerDownRef.current = true;
      isDraggingFromButtonRef.current = true;
      buttonDragOccurredRef.current = false;
      isHoldingPageRef.current = true;
      dragProgressRef.current = 0;
      dragTargetDirRef.current = dir;
      touchStartCoord.current = { x: e.clientX, y: e.clientY };
      setIsHoldingPage(true);
      setDragTargetDir(dir);
      setDragProgress(0);
    }
  };

  const handleButtonPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isPointerDownRef.current || isHoldingPageRef.current) {
      handlePointerMove(e.clientX, e.clientY);
    }
  };

  const handleButtonPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    handlePointerUp(e.clientX, e.clientY);
  };

  // 넘기기 버튼 전용: 포인터 다운 (Grip Mode 활성화 시 드래그 홀드 개시 - 하위 호환)
  const handleButtonGripStart = (
    dir: 'next' | 'prev',
    clientX: number,
    clientY: number,
    e: React.SyntheticEvent
  ) => {
    if (isFlipping) return;
    if (isGripModeActive) {
      if ('preventDefault' in e) {
        e.preventDefault();
      }
      e.stopPropagation();
      isPointerDownRef.current = true;
      isDraggingFromButtonRef.current = true;
      buttonDragOccurredRef.current = false;
      isHoldingPageRef.current = true;
      dragProgressRef.current = 0;
      dragTargetDirRef.current = dir;
      touchStartCoord.current = { x: clientX, y: clientY };
      setIsHoldingPage(true);
      setDragTargetDir(dir);
      setDragProgress(0);
    }
  };

  // 넘기기 버튼 전용: 클릭 이벤트 제어 (Grip Mode 활성 시 단순 클릭 방지, 비활성 시 원클릭 넘김)
  const handleButtonGripClick = (
    dir: 'next' | 'prev',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (isFlipping) return;

    if (isGripModeActive) {
      // 드래그 제스처가 발생하지 않은 단순 탭/클릭인 경우 페이지 넘김을 차단하고 친절한 안내를 띄움
      if (!buttonDragOccurredRef.current) {
        e.preventDefault();
        showGripDragHint();
        return;
      }
      // 드래그 성공 후의 릴리즈는 handlePointerUp에서 이미 실행되었음
    } else {
      // 일반 모드 (잡고 넘기기 OFF): 원클릭으로 즉시 부드럽게 넘김
      if (dir === 'next') {
        nextPage();
      } else {
        prevPage();
      }
    }
  };

  // 포인터 다운
  const handlePointerDown = (
    clientX: number,
    clientY: number,
    targetIsCorner: boolean = false,
    initialDir: 'next' | 'prev' = 'next'
  ) => {
    if (isFlipping) return;
    isPointerDownRef.current = true;
    touchStartCoord.current = { x: clientX, y: clientY };

    if (targetIsCorner) {
      isHoldingPageRef.current = true;
      dragProgressRef.current = 0;
      dragTargetDirRef.current = initialDir;
      setIsHoldingPage(true);
      setDragProgress(0);
      setDragTargetDir(initialDir);
    }
  };

  // 포인터 무브
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isPointerDownRef.current && !isHoldingPageRef.current) return;

    const deltaX = clientX - touchStartCoord.current.x;
    const deltaY = clientY - touchStartCoord.current.y;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      buttonDragOccurredRef.current = true;
    }

    if (isHoldingPageRef.current || isHoldingPage) {
      let progress = 0;
      if (effectiveFlipAxis === 'vertical') {
        const distance = Math.abs(deltaY);
        progress = Math.min(1, Math.max(0, distance / 50));
      } else {
        const distance = Math.abs(deltaX);
        progress = Math.min(1, Math.max(0, distance / 60));
      }
      dragProgressRef.current = progress;
      setDragProgress(progress);
    }
  };

  // 포인터 업
  const handlePointerUp = (clientX: number, clientY: number) => {
    if (!isPointerDownRef.current && !isHoldingPageRef.current) return;
    isPointerDownRef.current = false;

    const deltaX = clientX - touchStartCoord.current.x;
    const deltaY = clientY - touchStartCoord.current.y;
    const hadHoldingPage = isHoldingPageRef.current || isHoldingPage;
    const currentProgress = dragProgressRef.current;
    const currentTargetDir = dragTargetDirRef.current;

    isHoldingPageRef.current = false;
    dragProgressRef.current = 0;

    if (hadHoldingPage) {
      // 드래그 진행률 12% 이상이거나 버튼 드래그 제스처 발생 시 즉각 페이지 전환 실행
      if (
        currentProgress >= 0.12 ||
        buttonDragOccurredRef.current ||
        Math.abs(deltaY) > 8 ||
        Math.abs(deltaX) > 8
      ) {
        if (currentTargetDir === 'next') {
          nextPage();
        } else {
          prevPage();
        }
      } else {
        soundFX.playPageTurnSound();
      }
      setIsHoldingPage(false);
      setDragProgress(0);
      setTimeout(() => {
        isDraggingFromButtonRef.current = false;
        buttonDragOccurredRef.current = false;
      }, 60);
      return;
    }

    // 짧은 거리의 플릭 제스처 (Flick): 수평 및 수직 모드 지원
    if (!isGripModeActive) {
      if (effectiveFlipAxis === 'horizontal') {
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
          if (deltaX < 0) nextPage();
          else prevPage();
        }
      } else {
        if (Math.abs(deltaY) > 45 && Math.abs(deltaY) > Math.abs(deltaX) * 1.4) {
          if (deltaY < 0) nextPage();
          else prevPage();
        }
      }
    }
  };

  // 글로벌 마우스/터치 리스너: 틸트 활성 여부와 무관하게 모든 드래그 제스처를 완벽 추적
  useEffect(() => {
    const handleWindowPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDownRef.current && !isHoldingPageRef.current) return;
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      handlePointerMove(clientX, clientY);
    };

    const handleWindowPointerUp = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDownRef.current && !isHoldingPageRef.current) return;
      let clientX = 0;
      let clientY = 0;
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      handlePointerUp(clientX, clientY);
    };

    window.addEventListener('mousemove', handleWindowPointerMove, { passive: true });
    window.addEventListener('mouseup', handleWindowPointerUp, { passive: true });
    window.addEventListener('touchmove', handleWindowPointerMove, { passive: true });
    window.addEventListener('touchend', handleWindowPointerUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleWindowPointerMove);
      window.removeEventListener('mouseup', handleWindowPointerUp);
      window.removeEventListener('touchmove', handleWindowPointerMove);
      window.removeEventListener('touchend', handleWindowPointerUp);
    };
  }, [currentPage, effectiveFlipAxis, isGripModeActive]);

  // 책장 넘김 소프트 페이퍼 사운드 (Web Audio API 실시간 합성 사운드)
  const [isPaperSoundEnabled, setIsPaperSoundEnabled] = useState<boolean>(false);

  const playPaperSound = () => {
    if (!isPaperSoundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const bufferSize = Math.floor(ctx.sampleRate * 0.14);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 1.3;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
    } catch {
      // ignore
    }
  };

  // 실시간 다국어 번역 실행 (API 키 확인 및 도서 타겟 언어 기준 번역)
  const handleTranslateRecord = async (targetLangOverride?: LanguageCode) => {
    const targetLang = targetLangOverride || bookTargetLang;
    if (targetLangOverride && targetLangOverride !== bookTargetLang) {
      setBookTargetLang(targetLangOverride);
    }

    if (isTranslating) return;

    // 이미 번역 캐시가 있는 경우
    if (record.translations?.[targetLang]) {
      return;
    }

    // API 키 등록 여부 확인: 미등록 시 블로킹 window.confirm 대신 즉시 API 설정 모달 직접 오픈!
    if (!hasApiKey) {
      setTranslationError('번역을 실행하려면 API 설정에서 키를 등록하거나 확인해야 합니다.');
      onOpenSettings();
      return;
    }

    setTranslationError(null);
    setIsTranslating(true);
    try {
      const activeKey = apiConfig.provider === 'openai' 
        ? apiConfig.openaiKey 
        : (apiConfig.geminiKey || apiConfig.openaiKey);

      const translated = await translateSentenceRecord({
        summaryShort: record.summaryShort,
        steps: record.steps,
        targetLang: targetLang,
        apiKey: activeKey || undefined,
        provider: apiConfig.provider
      });

      const updatedRecord: SentenceRecord = {
        ...record,
        translations: {
          ...record.translations,
          [targetLang]: translated
        }
      };

      if (onUpdateRecord) {
        onUpdateRecord(updatedRecord);
      }
    } catch (err: any) {
      setTranslationError('번역에 실패했습니다: ' + (err.message || 'API 키 상태 및 네트워크를 확인해 주세요.'));
    } finally {
      setIsTranslating(false);
    }
  };

  // 낭독 텍스트 생성기 (대조 뷰 전용 필터 적용)
  const buildStepSpeechText = (
    stepData: StepData | undefined,
    stepNum: number,
    filter = splitAudioFilter
  ): string => {
    if (!stepData) return '';
    const parts: string[] = [];
    if (filter.includeTitle) {
      parts.push(`${stepNum}. ${stepData.title}`);
      if (stepData.subtitle) parts.push(stepData.subtitle);
    }
    if (filter.includeMain && stepData.mainContent) {
      parts.push(stepData.mainContent);
    }
    if (filter.includeDetails && stepData.details && stepData.details.length > 0) {
      parts.push(stepData.details.join('. '));
    }
    if (filter.includeAdvice && stepData.actionableAdvice) {
      parts.push(stepData.actionableAdvice);
    }
    if (parts.length === 0) {
      parts.push(stepData.mainContent || stepData.title);
    }
    return parts.join('. ');
  };

  // 일반 모드 낭독 텍스트
  const getCurrentSpeechText = (pageNum: number): string => {
    if (pageNum === 0) {
      return `Pentalyze. ${record.originalText}`;
    }
    if (pageNum >= 1 && pageNum <= 5) {
      const data = getPageStepData(pageNum);
      if (!data) return '';
      const { stepData, stepNum } = data;
      const detailsText = stepData.details.join('. ');
      const adviceText = stepData.actionableAdvice ? ` ${stepData.actionableAdvice}` : '';
      return `${stepNum}. ${stepData.title}. ${stepData.subtitle}. ${stepData.mainContent}. ${detailsText}.${adviceText}`;
    }
    if (pageNum === 6) {
      return `${displaySummary}`;
    }
    return '';
  };

  // 커스텀 언어/음성 낭독 함수
  const speakCustom = async (text: string, speechCode: string, onDone?: () => void) => {
    if (!text.trim()) {
      if (onDone) onDone();
      return;
    }
    const hasEleven = Boolean(apiConfig.elevenLabsKey && apiConfig.elevenLabsVoiceId);
    const useCloning = useElevenLabs && hasEleven;

    await HybridTTSEngine.speak({
      text,
      useElevenLabs: useCloning,
      elevenLabsKey: apiConfig.elevenLabsKey,
      elevenLabsVoiceId: apiConfig.elevenLabsVoiceId,
      rate: ttsRate,
      speechCode: speechCode,
      onEnd: () => {
        if (onDone) onDone();
      },
      onError: () => {
        setIsPlayingAudio(false);
        setIsAutoPlayMode(false);
        setActiveSpeakingSide(null);
      }
    });
  };

  // 대조 뷰 인라인 원터치 낭독 (좌측 원어 vs 우측 번역어)
  const handlePlayInlineSide = async (side: 'left' | 'right', pageNum: number) => {
    if (isPlayingAudio) {
      HybridTTSEngine.stop();
      const wasSame = activeSpeakingSide === side;
      setIsPlayingAudio(false);
      setIsAutoPlayMode(false);
      setActiveSpeakingSide(null);
      if (wasSame) return;
    }

    if (pageNum < 1 || pageNum > 5) return;
    const stepIndex = pageNum - 1;
    const stepKey = stepKeys[stepIndex];
    const originalStepData = record.steps[stepKey];
    const translatedStepData = record.translations?.[bookTargetLang]?.steps?.[stepKey];

    if (side === 'left') {
      const text = buildStepSpeechText(originalStepData, pageNum);
      if (!text) return;
      setIsPlayingAudio(true);
      setActiveSpeakingSide('left');
      await speakCustom(text, recordOriginalLangInfo.speechCode, () => {
        setIsPlayingAudio(false);
        setActiveSpeakingSide(null);
      });
    } else {
      if (!translatedStepData) {
        setTranslationError('번역본이 아직 생성되지 않았습니다. 번역을 먼저 진행해 주세요.');
        return;
      }
      const text = buildStepSpeechText(translatedStepData, pageNum);
      if (!text) return;
      setIsPlayingAudio(true);
      setActiveSpeakingSide('right');
      await speakCustom(text, activeBookLangInfo.speechCode, () => {
        setIsPlayingAudio(false);
        setActiveSpeakingSide(null);
      });
    }
  };

  const toggleAudio = async () => {
    if (isPlayingAudio) {
      HybridTTSEngine.stop();
      setIsPlayingAudio(false);
      setIsAutoPlayMode(false);
      setActiveSpeakingSide(null);
      return;
    }

    if (!isSplitView) {
      // 일반 모드 (기존 기본 기능 100% 보존)
      const textToSpeak = getCurrentSpeechText(currentPage);
      if (!textToSpeak) return;

      setIsPlayingAudio(true);
      setActiveSpeakingSide(null);
      await speakCurrent(textToSpeak, false);
      return;
    }

    // 대조 뷰 활성화 상태의 낭독
    if (currentPage === 0 || currentPage === 6) {
      const textToSpeak = getCurrentSpeechText(currentPage);
      if (!textToSpeak) return;
      setIsPlayingAudio(true);
      await speakCurrent(textToSpeak, false);
      return;
    }

    const stepIndex = currentPage - 1;
    const stepKey = stepKeys[stepIndex];
    const originalStepData = record.steps[stepKey];
    const translatedStepData = record.translations?.[bookTargetLang]?.steps?.[stepKey];

    setIsPlayingAudio(true);

    if (splitAudioTarget === 'original') {
      const text = buildStepSpeechText(originalStepData, currentPage);
      setActiveSpeakingSide('left');
      await speakCustom(text, recordOriginalLangInfo.speechCode, () => {
        setIsPlayingAudio(false);
        setActiveSpeakingSide(null);
      });
    } else if (splitAudioTarget === 'translated') {
      if (!hasTargetTranslation || !translatedStepData) {
        setTranslationError('번역본이 아직 준비되지 않았습니다. 번역을 먼저 진행해 주세요.');
        setIsPlayingAudio(false);
        return;
      }
      const text = buildStepSpeechText(translatedStepData, currentPage);
      setActiveSpeakingSide('right');
      await speakCustom(text, activeBookLangInfo.speechCode, () => {
        setIsPlayingAudio(false);
        setActiveSpeakingSide(null);
      });
    } else {
      // alternate (교차 대조 낭독: 원어 ➔ 번역어)
      const text1 = buildStepSpeechText(originalStepData, currentPage);
      setActiveSpeakingSide('left');
      await speakCustom(text1, recordOriginalLangInfo.speechCode, async () => {
        if (hasTargetTranslation && translatedStepData) {
          setTimeout(async () => {
            setActiveSpeakingSide('right');
            const text2 = buildStepSpeechText(translatedStepData, currentPage);
            await speakCustom(text2, activeBookLangInfo.speechCode, () => {
              setIsPlayingAudio(false);
              setActiveSpeakingSide(null);
            });
          }, 600);
        } else {
          setIsPlayingAudio(false);
          setActiveSpeakingSide(null);
        }
      });
    }
  };

  const startContinuousAudiobook = async () => {
    if (isPlayingAudio && isAutoPlayMode) {
      HybridTTSEngine.stop();
      setIsPlayingAudio(false);
      setIsAutoPlayMode(false);
      setActiveSpeakingSide(null);
      return;
    }

    setIsAutoPlayMode(true);
    setIsPlayingAudio(true);

    const startFrom = currentPage >= 1 && currentPage <= 5 ? currentPage : 1;
    if (currentPage !== startFrom) {
      goToPage(startFrom);
    }
    playSequentialStep(startFrom);
  };

  const playSequentialStep = async (stepNum: number) => {
    if (stepNum > 5) {
      setIsPlayingAudio(false);
      setIsAutoPlayMode(false);
      setActiveSpeakingSide(null);
      goToPage(6);
      return;
    }

    goToPage(stepNum);

    if (!isSplitView) {
      // 일반 모드 (기존 동작 100% 보존)
      const text = getCurrentSpeechText(stepNum);
      await speakCurrent(text, true, () => {
        setTimeout(() => {
          playSequentialStep(stepNum + 1);
        }, 700);
      });
      return;
    }

    // 대조 뷰 활성화 상태의 연속 오디오
    const stepIndex = stepNum - 1;
    const stepKey = stepKeys[stepIndex];
    const originalStepData = record.steps[stepKey];
    const translatedStepData = record.translations?.[bookTargetLang]?.steps?.[stepKey];

    if (splitAudioTarget === 'original') {
      const text = buildStepSpeechText(originalStepData, stepNum);
      setActiveSpeakingSide('left');
      await speakCustom(text, recordOriginalLangInfo.speechCode, () => {
        setTimeout(() => {
          playSequentialStep(stepNum + 1);
        }, 700);
      });
    } else if (splitAudioTarget === 'translated') {
      if (!translatedStepData) {
        const text = buildStepSpeechText(originalStepData, stepNum);
        setActiveSpeakingSide('left');
        await speakCustom(text, recordOriginalLangInfo.speechCode, () => {
          setTimeout(() => {
            playSequentialStep(stepNum + 1);
          }, 700);
        });
        return;
      }
      const text = buildStepSpeechText(translatedStepData, stepNum);
      setActiveSpeakingSide('right');
      await speakCustom(text, activeBookLangInfo.speechCode, () => {
        setTimeout(() => {
          playSequentialStep(stepNum + 1);
        }, 700);
      });
    } else {
      // alternate (원어 낭독 ➔ 0.6초 후 번역어 낭독 ➔ 다음 페이지 넘김)
      const text1 = buildStepSpeechText(originalStepData, stepNum);
      setActiveSpeakingSide('left');
      await speakCustom(text1, recordOriginalLangInfo.speechCode, () => {
        if (hasTargetTranslation && translatedStepData) {
          setTimeout(async () => {
            setActiveSpeakingSide('right');
            const text2 = buildStepSpeechText(translatedStepData, stepNum);
            await speakCustom(text2, activeBookLangInfo.speechCode, () => {
              setTimeout(() => {
                playSequentialStep(stepNum + 1);
              }, 700);
            });
          }, 600);
        } else {
          setTimeout(() => {
            playSequentialStep(stepNum + 1);
          }, 700);
        }
      });
    }
  };

  const speakCurrent = async (text: string, continuous: boolean, onDone?: () => void) => {
    const hasEleven = Boolean(apiConfig.elevenLabsKey && apiConfig.elevenLabsVoiceId);
    const useCloning = useElevenLabs && hasEleven;

    await HybridTTSEngine.speak({
      text,
      useElevenLabs: useCloning,
      elevenLabsKey: apiConfig.elevenLabsKey,
      elevenLabsVoiceId: apiConfig.elevenLabsVoiceId,
      rate: ttsRate,
      speechCode: activeBookLangInfo.speechCode,
      onEnd: () => {
        if (!continuous) {
          setIsPlayingAudio(false);
          setActiveSpeakingSide(null);
        }
        if (onDone) onDone();
      },
      onError: () => {
        setIsPlayingAudio(false);
        setIsAutoPlayMode(false);
        setActiveSpeakingSide(null);
      }
    });
  };

  useEffect(() => {
    return () => {
      HybridTTSEngine.stop();
    };
  }, []);

  const handleCopyCurrentContent = () => {
    let contentToCopy = '';
    if (currentPage === 0) {
      contentToCopy = record.originalText;
    } else if (currentPage >= 1 && currentPage <= 5) {
      const data = getPageStepData(currentPage);
      if (data) {
        contentToCopy = `[Step ${data.stepNum}: ${data.stepData.title}]\n${data.stepData.subtitle}\n\n${data.stepData.mainContent}\n\n${data.stepData.details.join('\n')}\n\n${data.stepData.actionableAdvice || ''}`;
      }
    } else {
      contentToCopy = `[Pentalyze]\n${displaySummary}\n\n"${record.originalText}"`;
    }

    navigator.clipboard.writeText(contentToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getBookTransformStyle = () => {
    const tiltRotateY = motionTilt.x;
    const tiltRotateX = -motionTilt.y;

    if (viewMode === 'flat') {
      return {
        transform: `rotateX(${tiltRotateX}deg) rotateY(${tiltRotateY}deg)`
      };
    }
    if (viewMode === 'spatial') {
      // 모바일 세로 또는 단일 페이지 뷰에서는 과도한 3D 회전으로 인한 글자 왜곡 및 잘림 방지
      if (isMobilePortrait || isPortraitMode || effectiveLayoutMode === 'single') {
        return {
          transform: `rotateX(${3 + tiltRotateX}deg) rotateY(${tiltRotateY}deg) scale(0.99)`
        };
      }
      return {
        transform: `rotateX(${18 + tiltRotateX}deg) rotateY(${-5 + tiltRotateY}deg) scale(0.97)`
      };
    }
    if (viewMode === 'xr') {
      if (isMobilePortrait || isPortraitMode || effectiveLayoutMode === 'single') {
        return {
          transform: `rotateX(${2 + tiltRotateX}deg) rotateY(${tiltRotateY}deg) translateY(-4px) scale(0.99)`
        };
      }
      return {
        transform: `rotateX(${10 + tiltRotateX}deg) rotateY(${tiltRotateY}deg) translateY(-14px) scale(0.99)`
      };
    }
    return {};
  };

  // 단일 페이지 렌더러 (모바일 세로/단일 뷰 지원)
  const renderPageCard = (pageNum: number, isSingleView: boolean = false) => {
    if (pageNum === 0) {
      return (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-stone-800">
          <div className="border-b border-amber-900/10 pb-2.5 flex items-center justify-between shrink-0">
            <span className="font-serif-kr text-xs font-bold text-amber-900 uppercase">
              Pentalyze · {t.coverTitle}
            </span>
            <span className="text-[11px] font-mono text-stone-500">Page 0</span>
          </div>
          <div 
            className={`flex-1 my-auto text-center space-y-4 py-4 overflow-y-auto min-h-0 ${
              isSingleView ? 'max-h-[50vh] sm:max-h-[54vh]' : 'max-h-[56vh] sm:max-h-none'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            <div className="inline-flex p-3 rounded-full bg-amber-900/10 text-amber-900">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-kr text-amber-950">
              {isAnalysis ? t.modeOther : t.modeOwn}
            </h3>
            <div className="p-4 rounded-xl bg-amber-950/[0.04] border border-amber-900/10 shadow-inner text-left">
              <span className="text-[10px] font-bold text-amber-900 uppercase block mb-1">
                Context
              </span>
              <p className="font-serif-kr text-sm sm:text-base md:text-lg text-stone-900 leading-relaxed font-semibold">
                "{record.originalText}"
              </p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-kr">
              {effectiveFlipAxis === 'vertical'
                ? `↓ ${t.nextPage} (1결 · ${t.step1Name})`
                : '← / → Keyboard or Swipe'}
            </p>
          </div>
          <div className="border-t border-amber-900/10 pt-3 shrink-0 relative z-20">
            <button
              type="button"
              onPointerDown={(e) => handleButtonPointerDown('next', e)}
              onPointerMove={handleButtonPointerMove}
              onPointerUp={handleButtonPointerUp}
              onMouseDown={(e) => handleButtonGripStart('next', e.clientX, e.clientY, e)}
              onTouchStart={(e) => handleButtonGripStart('next', e.touches[0].clientX, e.touches[0].clientY, e)}
              onClick={(e) => handleButtonGripClick('next', e)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all select-none touch-none ${
                isGripModeActive
                  ? 'cursor-grab active:cursor-grabbing bg-gradient-to-r from-amber-800 to-amber-950 text-amber-100 ring-2 ring-amber-400 border border-amber-400/80 shadow-amber-900/40 font-bold'
                  : 'bg-gradient-to-r from-amber-900 to-amber-950 text-amber-50 hover:bg-amber-950 active:scale-[0.99]'
              }`}
              title={isGripModeActive ? '버튼을 잡고 드래그하여 다음 책장으로 넘기기' : '다음 책장으로 넘기기'}
            >
              {isGripModeActive && <Hand className="w-4 h-4 text-amber-300" />}
              <span>
                {isGripModeActive ? (currentLang === 'ko' ? '🖐 [잡고 드래그] ' : '🖐 [Drag] ') : ''}
                {t.nextPage} ({getPageBadge(1).name})
              </span>
              {!isGripModeActive && <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      );
    }

    if (pageNum >= 1 && pageNum <= 5) {
      const pageInfo = getPageStepData(pageNum);
      if (!pageInfo) return null;
      const { stepData, stepNum } = pageInfo;
      const stepIndex = pageNum - 1;
      const stepKey = stepKeys[stepIndex];
      const originalStepData = record.steps[stepKey];
      const translatedStepData = record.translations?.[bookTargetLang]?.steps?.[stepKey];

      return (
        <div className="h-full flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 text-stone-800">
          {/* 모바일/세로 환경 전용: 상단 이전 책장 넘기기 버튼 */}
          {isSingleView && pageNum > 0 && (
            <div className="mb-2 shrink-0 relative z-20">
              <button
                type="button"
                onPointerDown={(e) => handleButtonPointerDown('prev', e)}
                onPointerMove={handleButtonPointerMove}
                onPointerUp={handleButtonPointerUp}
                onMouseDown={(e) => handleButtonGripStart('prev', e.clientX, e.clientY, e)}
                onTouchStart={(e) => handleButtonGripStart('prev', e.touches[0].clientX, e.touches[0].clientY, e)}
                onClick={(e) => handleButtonGripClick('prev', e)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all shadow-sm group select-none touch-none ${
                  isGripModeActive
                    ? 'cursor-grab active:cursor-grabbing bg-amber-500/25 hover:bg-amber-500/35 text-amber-950 border-amber-500/70 ring-2 ring-amber-400 font-bold'
                    : 'bg-amber-950/10 hover:bg-amber-950/20 active:scale-[0.99] border-amber-900/15 text-amber-950 font-semibold'
                } text-xs`}
                title={isGripModeActive ? '버튼을 잡고 상/하로 드래그하여 이전 책장으로 넘기기' : '이전 책장으로 넘기기'}
              >
                {isGripModeActive ? (
                  <Hand className="w-4 h-4 text-amber-900 group-hover:-rotate-12 transition-transform" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-amber-900 group-hover:-translate-y-0.5 transition-transform" />
                )}
                <span>
                  {isGripModeActive ? (currentLang === 'ko' ? '🖐 [잡고 드래그] ' : '🖐 [Drag] ') : ''}
                  {t.prevPage} ({pageNum === 1 ? getCoverLabel() : getPageBadge(pageNum - 1).name})
                </span>
              </button>
            </div>
          )}

          {/* Header */}
          <div className="border-b border-amber-900/10 pb-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border ${getPageBadge(pageNum).color}`}>
                {getPageBadge(pageNum).name}
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-900 bg-amber-200/50 px-2 py-0.5 rounded">
                Page {pageNum} of 5
              </span>
              {isSplitView && (
                <span className="text-[9px] sm:text-[10px] font-sans font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Columns className="w-3 h-3 text-emerald-700" />
                  <span>{recordOriginalLangInfo.flag} {recordOriginalCountryCode} ↔ {activeBookLangInfo.flag} {targetCountryCode} {t.splitView}</span>
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {stepNum} / 5
            </span>
          </div>

          {/* Body: 모바일 세로에서도 부드러운 스크롤 허용 (터치 제스처 충돌 방지) */}
          <div 
            className={`flex-1 overflow-y-auto py-2.5 space-y-3.5 pr-1 min-h-0 ${
              isSingleView ? 'max-h-[46vh] sm:max-h-[52vh] lg:max-h-[54vh]' : 'max-h-[52vh] sm:max-h-[62vh] lg:max-h-none'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            <div>
              <div className="flex items-center gap-1 text-[11px] text-amber-800 font-mono font-bold mb-0.5">
                <span>STEP {stepNum}</span>
                <span>•</span>
                <span>{isAnalysis ? t.modeOther : t.modeOwn}</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif-kr text-amber-950">
                {stepData.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-serif-kr">
                {stepData.subtitle}
              </p>
            </div>

            {isSplitView ? (
              /* 원문(해당 결 인사이트 원문) vs 타국어 번역 인사이트 대조 듀얼 뷰 레이아웃 */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {/* 좌측: 각 결에서의 인사이트 원문 내용 */}
                <div className={`p-3.5 rounded-xl bg-amber-950/[0.04] border border-amber-900/15 shadow-inner flex flex-col justify-between transition-all duration-300 ${
                  activeSpeakingSide === 'left'
                    ? 'ring-2 ring-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-amber-500/[0.08]'
                    : ''
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-900/10 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm shrink-0 leading-none">{recordOriginalLangInfo.flag}</span>
                        <span className="text-[11px] sm:text-xs font-bold font-mono text-amber-900 shrink-0">
                          {recordOriginalCountryCode}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-amber-950 truncate">
                          {recordOriginalLangInfo.nativeName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handlePlayInlineSide('left', pageNum)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-all ${
                            isPlayingAudio && activeSpeakingSide === 'left'
                              ? 'bg-amber-600 text-white font-bold animate-pulse shadow-sm'
                              : 'bg-amber-900/10 hover:bg-amber-900/20 text-amber-900'
                          }`}
                          title={t.splitPlayOriginal || '원어 낭독'}
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{isPlayingAudio && activeSpeakingSide === 'left' ? (t.stopAudio || '정지') : (t.splitPlayOriginal || '원어 낭독')}</span>
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold font-serif-kr text-amber-950 mb-0.5">
                      {originalStepData?.title || stepData.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-serif-kr mb-2">
                      {originalStepData?.subtitle || stepData.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-900 font-serif-kr leading-relaxed whitespace-pre-wrap font-medium">
                      {originalStepData?.mainContent || stepData.mainContent}
                    </p>

                    {originalStepData?.details && originalStepData.details.length > 0 && (
                      <div className="mt-2.5 space-y-1">
                        <span className="text-[9px] font-bold text-amber-900/80 uppercase">
                          {t.insightsAndDetails}
                        </span>
                        <div className="space-y-1">
                          {originalStepData.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                              <span className="text-amber-900 font-mono text-[9px] font-bold mt-0.5">•</span>
                              <span className="font-serif-kr leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {originalStepData?.actionableAdvice && (
                      <div className="mt-2.5 text-[11px] text-amber-950 bg-amber-500/10 p-2 rounded-lg border border-amber-900/10 font-serif-kr">
                        <span className="font-bold mr-1 text-amber-900">💡 {t.actionableAdvice}:</span>
                        <span>{originalStepData.actionableAdvice}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 우측: 각 결에서의 인사이트 내용을 타국어로 번역한 대조 구성 */}
                <div className={`p-3.5 rounded-xl bg-white/90 border border-emerald-800/25 shadow-sm ring-1 ring-emerald-500/20 flex flex-col justify-between transition-all duration-300 ${
                  activeSpeakingSide === 'right'
                    ? 'ring-2 ring-emerald-500/90 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-emerald-50/70'
                    : ''
                }`}>
                  {isOriginalLang ? (
                    /* 대상 언어가 원어와 동일할 때 타국어 선택 유도 */
                    <div className="h-full flex flex-col justify-center items-center text-center p-3 space-y-2.5 my-auto">
                      <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-800">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900 mb-1">
                          {t.splitViewSameLangNotice}
                        </p>
                        <p className="text-[10px] text-stone-500">
                          아래에서 번역할 타국어를 선택하시면 실시간으로 번역 대조 뷰가 표시됩니다.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {SUPPORTED_LANGUAGES.filter((l) => l.code !== recordOriginalLang).slice(0, 6).map((l) => (
                          <button
                            key={l.code}
                            type="button"
                            onClick={() => handleTranslateRecord(l.code)}
                            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-800 text-[10px] font-medium border border-stone-200 transition-all flex items-center gap-1 hover:scale-105"
                          >
                            <span>{l.flag}</span>
                            <span>{l.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : hasTargetTranslation && translatedStepData ? (
                    /* 타국어로 번역 완료된 결 인사이트 내용 */
                    <div>
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-900/10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm shrink-0 leading-none">{activeBookLangInfo.flag}</span>
                          <span className="text-[11px] sm:text-xs font-bold font-mono text-emerald-900 shrink-0">
                            {targetCountryCode}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold text-emerald-950 truncate uppercase">
                            {activeBookLangInfo.nativeName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handlePlayInlineSide('right', pageNum)}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-all ${
                              isPlayingAudio && activeSpeakingSide === 'right'
                                ? 'bg-emerald-600 text-white font-bold animate-pulse shadow-sm'
                                : 'bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-900'
                            }`}
                            title={t.splitPlayTranslated || '번역 낭독'}
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{isPlayingAudio && activeSpeakingSide === 'right' ? (t.stopAudio || '정지') : (t.splitPlayTranslated || '번역 낭독')}</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold font-serif-kr text-emerald-950 mb-0.5">
                        {translatedStepData.title}
                      </h4>
                      <p className="text-[11px] text-stone-600 font-serif-kr mb-2">
                        {translatedStepData.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-stone-900 font-serif-kr leading-relaxed whitespace-pre-wrap font-semibold">
                        {translatedStepData.mainContent}
                      </p>

                      {translatedStepData.details && translatedStepData.details.length > 0 && (
                        <div className="mt-2.5 space-y-1">
                          <span className="text-[9px] font-bold text-emerald-900/80 uppercase">
                            {t.insightsAndDetails}
                          </span>
                          <div className="space-y-1">
                            {translatedStepData.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-stone-700">
                                <span className="text-emerald-900 font-mono text-[9px] font-bold mt-0.5">•</span>
                                <span className="font-serif-kr">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {translatedStepData.actionableAdvice && (
                        <div className="mt-2.5 text-[11px] text-emerald-950 bg-emerald-500/10 p-2 rounded-lg border border-emerald-900/10 font-serif-kr">
                          <span className="font-bold mr-1 text-emerald-900">💡 {t.actionableAdvice}:</span>
                          <span>{translatedStepData.actionableAdvice}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* 아직 타국어 번역본이 준비되지 않았을 때 원클릭 번역 실행 */
                    <div className="h-full flex flex-col justify-center items-center text-center p-4 space-y-3 my-auto">
                      <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-800">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-800 mb-1">
                          {activeBookLangInfo.flag} {activeBookLangInfo.nativeName} 번역본 준비
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          이 결의 인사이트를 {activeBookLangInfo.nativeName}로 번역하여 원어와 나란히 대조해 보세요.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTranslateRecord(bookTargetLang)}
                        disabled={isTranslating}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 hover:scale-105"
                      >
                        {isTranslating ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t.splitViewTranslating}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{activeBookLangInfo.nativeName} {t.splitViewTranslateNow}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* 기본 단일 뷰 */
              <>
                <div className="p-4 rounded-xl bg-white/75 border border-amber-900/10 shadow-sm">
                  <p className="text-sm sm:text-base text-stone-900 font-serif-kr leading-relaxed whitespace-pre-wrap font-medium">
                    {stepData.mainContent}
                  </p>
                </div>

                {stepData.details && stepData.details.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/80">
                      {t.insightsAndDetails}
                    </span>
                    <div className="space-y-1.5">
                      {stepData.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 rounded-lg bg-amber-900/[0.03] border border-amber-900/5 text-xs text-stone-700"
                        >
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-800/15 text-amber-900 font-mono text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="font-serif-kr leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stepData.actionableAdvice && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-800/20 text-xs text-amber-950">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="leading-snug">
                      <span className="font-bold text-amber-900 mr-1.5">{t.actionableAdvice}:</span>
                      <span className="font-serif-kr text-stone-700">{stepData.actionableAdvice}</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 모바일/세로 환경 전용: 하단 다음 책장 넘기기 버튼 */}
          {isSingleView && pageNum < totalPages && (
            <div className="mt-2.5 pt-2 border-t border-amber-900/10 shrink-0 relative z-20">
              <button
                type="button"
                onPointerDown={(e) => handleButtonPointerDown('next', e)}
                onPointerMove={handleButtonPointerMove}
                onPointerUp={handleButtonPointerUp}
                onMouseDown={(e) => handleButtonGripStart('next', e.clientX, e.clientY, e)}
                onTouchStart={(e) => handleButtonGripStart('next', e.touches[0].clientX, e.touches[0].clientY, e)}
                onClick={(e) => handleButtonGripClick('next', e)}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md group select-none touch-none ${
                  isGripModeActive
                    ? 'cursor-grab active:cursor-grabbing bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 ring-2 ring-amber-400 border border-amber-400/80 shadow-amber-900/30'
                    : 'bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 hover:from-amber-800 hover:to-amber-900 active:scale-[0.99] text-amber-50'
                }`}
                title={isGripModeActive ? '버튼을 잡고 상/하로 드래그하여 다음 책장으로 넘기기' : '다음 책장으로 넘기기'}
              >
                {isGripModeActive && <Hand className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />}
                <span>
                  {isGripModeActive ? (currentLang === 'ko' ? '🖐 [잡고 드래그] ' : '🖐 [Drag] ') : ''}
                  {t.nextPage} ({pageNum === 5 ? getSummaryLabel() : getPageBadge(pageNum + 1).name})
                </span>
                {!isGripModeActive && (
                  <ChevronDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          )}

          {/* Footer (Spread 모드이거나 하단 보조 메타) */}
          {!isSingleView && (
            <div className="border-t border-amber-900/10 pt-2 flex items-center justify-between text-xs text-stone-500 shrink-0">
              <span>Pentalyze</span>
              <span className="font-mono">{pageNum} / 5</span>
            </div>
          )}
        </div>
      );
    }

    if (pageNum === 6) {
      return (
        <div className="h-full flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 text-stone-800">
          {/* 모바일/세로 환경 전용: 상단 이전 책장 넘기기 버튼 */}
          {isSingleView && (
            <div className="mb-2 shrink-0 relative z-20">
              <button
                type="button"
                onPointerDown={(e) => handleButtonPointerDown('prev', e)}
                onPointerMove={handleButtonPointerMove}
                onPointerUp={handleButtonPointerUp}
                onMouseDown={(e) => handleButtonGripStart('prev', e.clientX, e.clientY, e)}
                onTouchStart={(e) => handleButtonGripStart('prev', e.touches[0].clientX, e.touches[0].clientY, e)}
                onClick={(e) => handleButtonGripClick('prev', e)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border transition-all shadow-sm group select-none touch-none ${
                  isGripModeActive
                    ? 'cursor-grab active:cursor-grabbing bg-amber-500/25 hover:bg-amber-500/35 text-amber-950 border-amber-500/70 ring-2 ring-amber-400 font-bold'
                    : 'bg-amber-950/10 hover:bg-amber-950/20 active:scale-[0.99] border-amber-900/15 text-amber-950 font-semibold'
                } text-xs`}
                title={isGripModeActive ? '버튼을 잡고 상/하로 드래그하여 이전 책장으로 넘기기' : '이전 책장으로 넘기기'}
              >
                {isGripModeActive ? (
                  <Hand className="w-4 h-4 text-amber-900 group-hover:-rotate-12 transition-transform" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-amber-900 group-hover:-translate-y-0.5 transition-transform" />
                )}
                <span>
                  {isGripModeActive ? (currentLang === 'ko' ? '🖐 [잡고 드래그] ' : '🖐 [Drag] ') : ''}
                  {t.prevPage} ({getPageBadge(5).name})
                </span>
              </button>
            </div>
          )}

          <div className="border-b border-amber-900/10 pb-2.5 flex items-center justify-between shrink-0">
            <span className="font-serif-kr text-xs font-bold text-emerald-900 uppercase">
              {t.congratsTitle}
            </span>
            <span className="text-[11px] font-mono text-stone-500">Page 6</span>
          </div>
          <div 
            className={`flex-1 my-auto text-center space-y-4 py-3 overflow-y-auto min-h-0 ${
              isSingleView ? 'max-h-[46vh] sm:max-h-[52vh] lg:max-h-[54vh]' : 'max-h-[52vh] sm:max-h-[62vh] lg:max-h-none'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            <div className="inline-flex p-3 rounded-full bg-emerald-900/10 text-emerald-900">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif-kr text-amber-950">
              {t.congratsTitle}
            </h3>
            {isSplitView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {/* 좌측: 원어 총람 인사이트 */}
                <div className="p-3.5 rounded-xl bg-amber-950/[0.04] border border-amber-900/15 shadow-inner">
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-900/10 gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-sm shrink-0 leading-none">{recordOriginalLangInfo.flag}</span>
                      <span className="text-[11px] sm:text-xs font-bold font-mono text-amber-900 shrink-0">
                        {recordOriginalCountryCode}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-amber-950 truncate">
                        {recordOriginalLangInfo.nativeName}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-900/10 text-amber-900 font-bold shrink-0">
                      원어 총람
                    </span>
                  </div>
                  <p className="font-serif-kr text-xs sm:text-sm text-stone-900 leading-relaxed font-semibold">
                    "{record.summaryShort}"
                  </p>
                </div>

                {/* 우측: 번역 총람 인사이트 */}
                <div className="p-3.5 rounded-xl bg-white/90 border border-emerald-800/25 shadow-sm ring-1 ring-emerald-500/20">
                  {isOriginalLang ? (
                    <div className="p-2 text-center text-xs text-stone-500 space-y-1">
                      <p className="font-bold text-stone-700">{t.splitViewSameLangNotice}</p>
                      <p className="text-[10px]">상단 언어 선택기에서 번역할 타국어를 선택해 주세요.</p>
                    </div>
                  ) : record.translations?.[bookTargetLang]?.summaryShort ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-900/10 gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-sm shrink-0 leading-none">{activeBookLangInfo.flag}</span>
                          <span className="text-[11px] sm:text-xs font-bold font-mono text-emerald-900 shrink-0">
                            {targetCountryCode}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold text-emerald-950 truncate uppercase">
                            {activeBookLangInfo.nativeName}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/10 text-emerald-900 font-bold shrink-0">
                          번역 총람
                        </span>
                      </div>
                      <p className="font-serif-kr text-xs sm:text-sm text-stone-900 leading-relaxed font-semibold">
                        "{record.translations[bookTargetLang].summaryShort}"
                      </p>
                    </div>
                  ) : (
                    <div className="p-2 text-center text-xs text-stone-500 space-y-2">
                      <p>{activeBookLangInfo.nativeName} {t.splitViewTranslatedInsight} 미생성</p>
                      <button
                        type="button"
                        onClick={() => handleTranslateRecord(bookTargetLang)}
                        disabled={isTranslating}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold shadow hover:bg-emerald-800"
                      >
                        {isTranslating ? t.splitViewTranslating : `${activeBookLangInfo.nativeName} ${t.splitViewTranslateNow}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/70 border border-amber-900/10 text-left space-y-1.5">
                <span className="text-[10px] font-bold text-amber-900 uppercase">
                  Core Takeaway
                </span>
                <p className="font-serif-kr text-sm sm:text-base text-stone-900 leading-relaxed font-semibold">
                  "{displaySummary}"
                </p>
              </div>
            )}
            <p className="text-xs text-stone-600 font-serif-kr leading-relaxed">
              {t.congratsDesc}
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => goToPage(1)}
                className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-800 text-xs font-semibold hover:bg-stone-300"
              >
                {t.readAgain}
              </button>
              <button
                type="button"
                onClick={() => onOpenExport(record)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-900 text-amber-50 text-xs font-semibold hover:bg-amber-950"
              >
                {t.exportReport}
              </button>
            </div>
          </div>
          <div className="border-t border-amber-900/10 pt-2 text-right text-xs text-stone-500">
            <span>Pentalyze 5 Insights</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`mx-auto w-full max-w-6xl px-3 sm:px-6 py-4 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 bg-[#08090b] p-4 overflow-y-auto max-w-none' : ''
      }`}
    >
      {/* 잡고 넘기기 모드 안내 플로팅 토스트 */}
      {gripHintNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-amber-950/95 text-amber-100 border border-amber-500/70 shadow-2xl backdrop-blur-md text-xs font-bold flex items-center gap-2 animate-bounce select-none pointer-events-none">
          <Hand className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{gripHintNotice}</span>
        </div>
      )}

      {/* 1. 상단 컨트롤 패널 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-[#15161a] border border-white/10 rounded-2xl p-2.5 sm:p-3 px-3 sm:px-4 shadow-xl">
        {/* Left: 모드 뱃지 & 현재 페이지 & 3D 책장 내부 언어 선택기 및 번역 버튼 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
          <span
            className={`text-xs px-2 sm:px-2.5 py-1 rounded-full font-medium border shrink-0 whitespace-nowrap ${
              isAnalysis
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
            }`}
          >
            <span className="hidden sm:inline">{isAnalysis ? t.modeOther : t.modeOwn}</span>
            <span className="sm:hidden">{isAnalysis ? '타인 글' : '내 글'}</span>
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-zinc-400 shrink-0 whitespace-nowrap">
            <span className="font-bold text-white">
              {currentPage === 0 ? 'Cover' : currentPage === 6 ? 'End' : `P.${currentPage}`}
              <span className="hidden sm:inline">{currentPage >= 1 && currentPage <= 5 ? ` of 5` : ''}</span>
            </span>
            <span>•</span>
            <span className="text-amber-400 font-semibold hidden md:inline">
              {currentPage >= 1 && currentPage <= 5 ? getPageBadge(currentPage).name : 'Pentalyze'}
            </span>
          </div>

          {/* 3D 책장 내부 국가별 열람/번역 언어 선택 드롭다운 (헤더 베이스 언어는 유지) */}
          <div className="relative shrink-0" ref={bookLangRef}>
            <button
              type="button"
              onClick={() => setIsBookLangDropdownOpen(!isBookLangDropdownOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 transition-colors text-xs font-medium shadow-sm shrink-0 whitespace-nowrap"
              title={t.bookLanguageSelect}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{activeBookLangInfo.flag}</span>
              <span className="font-mono hidden sm:inline">{activeBookLangInfo.nativeName}</span>
              <span className="font-mono sm:hidden text-[10px] uppercase font-bold">{activeBookLangInfo.code}</span>
              <ChevronDown className="w-3 h-3 text-amber-400/80 shrink-0" />
            </button>

            {isBookLangDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#17181d]/95 border border-amber-500/30 p-2 shadow-2xl shadow-black/80 backdrop-blur-2xl z-50 animate-fadeIn divide-y divide-white/10">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.bookLanguageSelect}</span>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-normal">
                    Base: {activeUiLangInfo.nativeName}
                  </span>
                </div>
                <div className="py-1 max-h-60 overflow-y-auto space-y-0.5">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === bookTargetLang;
                    const isOriginal = lang.code === record.language;
                    const hasTranslation = Boolean(record.translations?.[lang.code]);
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setBookTargetLang(lang.code);
                          setIsBookLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 font-semibold ring-1 ring-amber-500/30'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-medium">{lang.nativeName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {isOriginal ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-700/80 text-zinc-300 font-mono font-medium">
                              원문
                            </span>
                          ) : hasTranslation ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-medium border border-emerald-500/30">
                              ✓ 번역
                            </span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono font-medium border border-amber-500/30">
                              AI
                            </span>
                          )}
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 다국어 실시간 AI 번역 실행 버튼 (현재 타겟 언어의 번역본이 없을 때) */}
          {!isContentInTargetLang && (
            <button
              type="button"
              onClick={() => handleTranslateRecord()}
              disabled={isTranslating}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shadow-sm shrink-0 whitespace-nowrap ${
                hasApiKey
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
                  : 'bg-red-500/15 text-red-200 border border-red-500/30 hover:bg-red-500/25'
              }`}
              title={
                hasApiKey
                  ? `${activeBookLangInfo.nativeName}(으)로 5단계 인사이트를 실시간 AI 번역`
                  : 'AI 번역을 활용하려면 API 키가 필요합니다 (클릭하여 설정)'
              }
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">{t.translatingNotice}</span>
                  <span className="sm:hidden text-[10px]">번역중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xl:inline">
                    {activeBookLangInfo.flag} {t.translateContentBtn}
                  </span>
                  <span className="hidden sm:inline xl:hidden text-xs">
                    {activeBookLangInfo.flag} AI 번역
                  </span>
                  <span className="sm:hidden text-[10px]">
                    {activeBookLangInfo.flag} 번역
                  </span>
                  {!hasApiKey && (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-red-500/30 text-red-200 font-mono">
                      Key
                    </span>
                  )}
                </>
              )}
            </button>
          )}

          {/* 타겟 언어가 헤더 베이스 언어와 다를 때 '내 언어로 보기' 복귀 버튼 */}
          {bookTargetLang !== currentLang && (
            <button
              type="button"
              onClick={() => setBookTargetLang(currentLang)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 border border-white/10 text-[11px] transition-colors shrink-0 whitespace-nowrap"
              title="헤더에서 설정한 내 국적 베이스 언어로 도서 열람 언어 복귀"
            >
              <span className="hidden sm:inline">↩ {activeUiLangInfo.nativeName}</span>
              <span className="sm:hidden">↩</span>
            </button>
          )}
        </div>

        {/* Center: 3대 모드 & 신규 '책장 잡고 넘기기' 버튼 */}
        <div className="flex items-center gap-0.5 sm:gap-1 p-1 bg-black/40 rounded-xl border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('flat')}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'flat'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={t.viewFlat}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.viewFlat}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('spatial')}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'spatial'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={t.viewSpatial}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.viewSpatial}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('xr')}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'xr'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title={t.viewXR}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.viewXR}</span>
          </button>

          {/* 책장 잡고 넘기기 버튼 */}
          <button
            type="button"
            onClick={() => {
              const nextState = !isGripModeActive;
              setIsGripModeActive(nextState);
              if (nextState) {
                setGripHintNotice(
                  effectiveFlipAxis === 'vertical'
                    ? (currentLang === 'ko' ? '🖐 [잡고 넘기기 활성화] 상/하 책장 넘기기 버튼을 잡고 드래그해 보세요' : '🖐 [Grip Mode ON] Press and drag the flip buttons')
                    : (currentLang === 'ko' ? '🖐 [잡고 넘기기 활성화] 좌/우 책장 넘기기 버튼을 잡고 드래그해 보세요' : '🖐 [Grip Mode ON] Press and drag the flip buttons')
                );
                setTimeout(() => setGripHintNotice(null), 2500);
              }
            }}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 sm:gap-1.5 transition-all ${
              isGripModeActive
                ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/40 ring-1 ring-amber-400 animate-pulse'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title={t.gripModeTooltip}
          >
            <Hand className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">
              {isGripModeActive ? (t.btnGripModeOn || '잡고 드래그 ON') : (t.btnGripModeOff || '잡고 넘기기')}
            </span>
          </button>

          {/* 원문-번역/교정 대조 듀얼 뷰 (Split-View) 토글 */}
          <button
            type="button"
            onClick={() => setIsSplitView(!isSplitView)}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 sm:gap-1.5 transition-all ${
              isSplitView
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/40 ring-1 ring-blue-400'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title={t.splitViewTooltip}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden xl:inline">
              {isSplitView ? t.splitViewOn : t.splitView}
            </span>
          </button>

          {/* 자이로 모션 */}
          <button
            type="button"
            onClick={() => setIsMotionTrackingEnabled(!isMotionTrackingEnabled)}
            className={`p-1 px-1.5 sm:px-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
              isMotionTrackingEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title={t.tiltSensor}
          >
            <span className="text-[11px] font-mono hidden xl:inline">{t.tiltSensor}</span>
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isMotionTrackingEnabled ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'
              }`}
            />
          </button>
        </div>

        {/* Right: TTS & Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isPlayingAudio && !isAutoPlayMode
                ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/30 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10'
            }`}
            title={t.readCurrentPage}
          >
            {isPlayingAudio && !isAutoPlayMode ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">{t.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline whitespace-nowrap">{t.readCurrentPage}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={startContinuousAudiobook}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
              isAutoPlayMode
                ? 'bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/30 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10'
            }`}
            title={t.continuousAudiobook}
          >
            <Headphones className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xl:inline whitespace-nowrap">
              {isAutoPlayMode ? t.readingNow : t.continuousAudiobook}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowTtsPanel(!showTtsPanel)}
            className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            title={t.ttsSpeedSettings}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(record.id)}
            className={`p-2 rounded-lg border transition-all ${
              record.isFavorite
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title={t.favorite}
          >
            {record.isFavorite ? (
              <BookmarkCheck className="w-4 h-4 fill-amber-400 text-amber-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyCurrentContent}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            title={t.copyContent}
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => onOpenExport(record)}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            title={t.exportReport}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
            title={`${t.navSettings} (API 키 / 음성 설정)`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            title={t.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Translation Error Banner */}
      {translationError && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{translationError}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTranslationError(null);
                onOpenSettings();
              }}
              className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-200 font-medium text-xs transition-colors shrink-0"
            >
              API 설정 열기
            </button>
            <button
              type="button"
              onClick={() => setTranslationError(null)}
              className="p-1 text-red-400 hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TTS Drawer */}
      {showTtsPanel && (
        <div className="mb-4 p-4 rounded-xl bg-black/70 border border-white/10 text-xs flex flex-wrap items-center justify-between gap-4 backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 font-medium">{t.speechSpeed}</span>
            <div className="flex items-center gap-1">
              {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setTtsRate(rate)}
                  className={`px-2 py-0.5 rounded font-mono ${
                    ttsRate === rate ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-zinc-300'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-400 font-medium">{t.speechEngine}</span>
            <button
              type="button"
              onClick={() => setUseElevenLabs(false)}
              className={`px-2.5 py-1 rounded text-[11px] ${
                !useElevenLabs ? 'bg-emerald-600 text-white font-semibold' : 'bg-white/5 text-zinc-400'
              }`}
            >
              Native {activeBookLangInfo.nativeName} ({activeBookLangInfo.speechCode})
            </button>
            <button
              type="button"
              onClick={() => {
                if (!apiConfig.elevenLabsKey) onOpenSettings();
                else setUseElevenLabs(true);
              }}
              className={`px-2.5 py-1 rounded text-[11px] ${
                useElevenLabs ? 'bg-indigo-600 text-white font-semibold' : 'bg-white/5 text-zinc-400'
              }`}
            >
              {apiConfig.elevenLabsKey ? 'ElevenLabs AI' : 'ElevenLabs'}
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="API / 음성 설정 열기"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      )}

      {/* 1-1. 대조 뷰(Split-View) 전용 오디오 맞춤 컨트롤 바 */}
      {isSplitView && (
        <div className="mb-3.5 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#161821] to-emerald-950/40 border border-blue-500/30 shadow-lg flex flex-wrap items-center justify-between gap-2.5 text-xs animate-fadeIn">
          {/* Left: 청취 대상 언어 선택기 (Language Target) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1 mr-1">
              <Headphones className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{t.splitAudioTargetLabel || '대조 뷰 낭독 대상'}:</span>
            </span>

            {/* 1. 원어만 */}
            <button
              type="button"
              onClick={() => setSplitAudioTarget('original')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                splitAudioTarget === 'original'
                  ? 'bg-amber-500/25 text-amber-200 border-amber-500/60 font-bold shadow-sm'
                  : 'bg-black/20 text-zinc-400 border-white/10 hover:text-zinc-200 hover:bg-white/5'
              }`}
              title="원어 인사이트 내용만 낭독합니다"
            >
              <span>{recordOriginalLangInfo.flag}</span>
              <span>{t.splitAudioOriginal || '원어만'}</span>
            </button>

            {/* 2. 번역어만 */}
            <button
              type="button"
              onClick={() => setSplitAudioTarget('translated')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                splitAudioTarget === 'translated'
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-500/60 font-bold shadow-sm'
                  : 'bg-black/20 text-zinc-400 border-white/10 hover:text-zinc-200 hover:bg-white/5'
              }`}
              title={`${activeBookLangInfo.nativeName} 번역 인사이트만 낭독합니다`}
            >
              <span>{activeBookLangInfo.flag}</span>
              <span>{t.splitAudioTranslated || '번역어만'}</span>
            </button>

            {/* 3. 교차 낭독 (Alternate) */}
            <button
              type="button"
              onClick={() => setSplitAudioTarget('alternate')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 border ${
                splitAudioTarget === 'alternate'
                  ? 'bg-blue-500/25 text-blue-200 border-blue-500/60 font-bold shadow-sm ring-1 ring-blue-400/40'
                  : 'bg-black/20 text-zinc-400 border-white/10 hover:text-zinc-200 hover:bg-white/5'
              }`}
              title="원어 낭독 후 번역어를 연이어 교차 낭독합니다 (섀도잉/학습용)"
            >
              <Repeat className="w-3 h-3 text-blue-400" />
              <span>{t.splitAudioAlternate || '교차 대조'}</span>
            </button>
          </div>

          {/* Right: 낭독 세부 항목 필터 팝오버 */}
          <div className="relative flex items-center gap-1.5 ml-auto" ref={splitFilterRef}>
            <button
              type="button"
              onClick={() => setShowSplitFilterPopover(!showSplitFilterPopover)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                showSplitFilterPopover
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-black/20 text-zinc-300 border-white/10 hover:bg-white/10'
              }`}
              title="낭독할 세부 항목(제목, 본문, 세부해설, 조언)을 선택합니다"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>{t.splitAudioFilterTitle || '항목 필터'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-bold">
                {[
                  splitAudioFilter.includeTitle,
                  splitAudioFilter.includeMain,
                  splitAudioFilter.includeDetails,
                  splitAudioFilter.includeAdvice
                ].filter(Boolean).length}개
              </span>
            </button>

            {/* 낭독 항목 필터 팝오버 모달 */}
            {showSplitFilterPopover && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-[#191b22] border border-blue-500/40 p-3 shadow-2xl z-50 animate-fadeIn divide-y divide-white/10">
                <div className="text-[11px] font-bold text-zinc-200 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                    <span>{t.splitAudioFilterTitle || '낭독할 항목 선택'}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-normal">선택 항목만 청취</span>
                </div>
                <div className="pt-2 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={splitAudioFilter.includeTitle}
                      onChange={(e) => setSplitAudioFilter({ ...splitAudioFilter, includeTitle: e.target.checked })}
                      className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0"
                    />
                    <span>{t.splitFilterTitle || '결 제목 & 부제'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={splitAudioFilter.includeMain}
                      onChange={(e) => setSplitAudioFilter({ ...splitAudioFilter, includeMain: e.target.checked })}
                      className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0"
                    />
                    <span className="font-semibold text-amber-200">{t.splitFilterMain || '핵심 본문 / 교정문'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={splitAudioFilter.includeDetails}
                      onChange={(e) => setSplitAudioFilter({ ...splitAudioFilter, includeDetails: e.target.checked })}
                      className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0"
                    />
                    <span>{t.splitFilterDetails || '세부 해설 불릿'}</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={splitAudioFilter.includeAdvice}
                      onChange={(e) => setSplitAudioFilter({ ...splitAudioFilter, includeAdvice: e.target.checked })}
                      className="rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-0"
                    />
                    <span>{t.splitFilterAdvice || '실천 조언 (💡 Tip)'}</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 실시간 드래그 진행률 인디케이터 */}
      {isHoldingPage && (
        <div className="mb-2 p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs flex items-center justify-between text-amber-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Hand className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>
              {dragProgress >= 0.45
                ? t.dragHalfNotice
                : dragTargetDir === 'prev'
                ? t.dragLeftNotice
                : t.dragRightNotice}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 font-mono text-amber-300">
              {dragTargetDir === 'prev' ? `◀ ${t.prevPage}` : `${t.nextPage} ▶`}
            </span>
            <span className="font-mono font-bold text-amber-300">
              {Math.round(dragProgress * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* 2. 3D 양장본 스테이지 (마우스 휠 이벤트 제거 상태 유지) */}
      <div
        ref={containerRef}
        className="book-stage-3d relative w-full py-2 select-none"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={(e) => handlePointerUp(e.clientX, e.clientY)}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
      >
        {/* 양장본 책 바디 케이스 (Hardcover 3D Body) */}
        <div
          className="book-body-3d relative mx-auto rounded-3xl p-3 sm:p-5 hardcover-texture border border-amber-900/40 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
          style={getBookTransformStyle()}
        >
          <div className="absolute inset-1.5 rounded-2xl border border-amber-500/10 pointer-events-none" />

          {/* ==============================================================
              CASE A: 수직 플립 (모바일 세로 / 단일 페이지 모드)
             ============================================================== */}
          {effectiveLayoutMode === 'single' ? (
            <div className="relative min-h-[520px] sm:min-h-[580px] w-full rounded-2xl overflow-hidden bg-[#faf5eb] shadow-2xl flex flex-col justify-between">
              <div className="absolute top-0 inset-x-0 h-6 book-spine-crease-vertical pointer-events-none z-30" />

              {/* 정적 레이어 */}
              <div
                className="w-full h-full min-h-[500px] sm:min-h-[560px] paper-texture-single flex flex-col"
                style={{
                  transform: `translateZ(${currentPage * 1.5}px)`
                }}
              >
                {renderPageCard(isFlipping && flipDirection === 'next' ? currentPage + 1 : currentPage, true)}
              </div>

              {/* 실시간 연속 드래그 말림 리프 */}
              {isHoldingPage && dragTargetDir === 'next' && (
                <div
                  className="absolute inset-0 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${dragProgress * 180}deg) skewX(${dragProgress * 3}deg) translateZ(${dragProgress * 40}px)`,
                    boxShadow: `0 -${dragProgress * 25}px 35px rgba(0, 0, 0, ${dragProgress * 0.4})`
                  }}
                >
                  {/* 곡면 착시 그림자 */}
                  <div
                    className="absolute inset-0 pointer-events-none z-50 transition-opacity"
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.35}) 0%, transparent 40%, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.2}) 100%)`
                    }}
                  />
                  <div className="page-face absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(currentPage, true)}
                  </div>
                  <div className="page-face page-back-vertical absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(currentPage + 1, true)}
                  </div>
                </div>
              )}

              {/* 실시간 연속 드래그 말림 리프 (이전 페이지: 위로 당김) */}
              {isHoldingPage && dragTargetDir === 'prev' && (
                <div
                  className="absolute inset-0 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(-${dragProgress * 180}deg) skewX(-${dragProgress * 3}deg) translateZ(${dragProgress * 40}px)`,
                    boxShadow: `0 ${dragProgress * 25}px 35px rgba(0, 0, 0, ${dragProgress * 0.4})`
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none z-50 transition-opacity"
                    style={{
                      background: `linear-gradient(to top, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.35}) 0%, transparent 40%, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.2}) 100%)`
                    }}
                  />
                  <div className="page-face absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(currentPage - 1, true)}
                  </div>
                  <div className="page-face page-back-vertical absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(currentPage, true)}
                  </div>
                </div>
              )}

              {/* 자동 플립 애니메이션 */}
              {isFlipping && !isHoldingPage && (
                <div
                  className={`absolute inset-0 z-40 pointer-events-none ${
                    flipDirection === 'next'
                      ? 'anim-curl-vertical-next'
                      : 'anim-curl-vertical-prev'
                  }`}
                  style={{
                    transformOrigin: 'top center'
                  }}
                >
                  <div className="page-face absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(flipDirection === 'next' ? currentPage : currentPage - 1, true)}
                  </div>
                  <div className="page-face page-back-vertical absolute inset-0 paper-texture-single pointer-events-none">
                    {renderPageCard(flipDirection === 'next' ? currentPage + 1 : currentPage, true)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ==============================================================
               CASE B: 수평 펼침 (PC / 대화면 와이드 가로 모드)
               ============================================================== */
            <div className="relative min-h-[580px] sm:min-h-[640px] w-full rounded-2xl overflow-hidden grid grid-cols-2 shadow-2xl">
              
              {/* ◀ 좌측 정적 페이지 */}
              <div
                className="relative paper-texture-left p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-900/15 text-stone-800"
                style={{
                  transform: `translateZ(${currentPage * 1.8}px)`
                }}
              >
                {/* 좌측 모서리 잡기 힌지 핸들 (이전 페이지로 넘김) - 좌측 상단 모서리에 대칭 배치 */}
                {currentPage > 0 && (
                  <button
                    type="button"
                    onPointerDown={(e) => handleButtonPointerDown('prev', e)}
                    onPointerMove={handleButtonPointerMove}
                    onPointerUp={handleButtonPointerUp}
                    onMouseDown={(e) => handleButtonGripStart('prev', e.clientX, e.clientY, e)}
                    onTouchStart={(e) => handleButtonGripStart('prev', e.touches[0].clientX, e.touches[0].clientY, e)}
                    onClick={(e) => handleButtonGripClick('prev', e)}
                    className={`group absolute top-3 left-4 flex items-center gap-1.5 p-1 px-2.5 rounded-lg border transition-all z-20 select-none touch-none ${
                      isGripModeActive
                        ? 'cursor-grab active:cursor-grabbing bg-amber-500 text-amber-950 border-amber-400 shadow-md ring-2 ring-amber-300 font-bold'
                        : 'bg-amber-900/10 hover:bg-amber-900/15 text-amber-900 border-amber-900/15 cursor-pointer'
                    }`}
                    title={isGripModeActive ? '이 모서리 버튼을 잡고 오른쪽으로 드래그하면 이전 페이지로 넘어갑니다.' : '클릭하면 이전 페이지로 넘어갑니다.'}
                  >
                    <Hand className="w-3.5 h-3.5 group-hover:-rotate-12 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                      {isHoldingPage && dragTargetDir === 'prev'
                        ? 'Dragging...'
                        : isGripModeActive
                        ? (currentLang === 'ko' ? '🖐 [잡고 드래그] 이전 책장' : '🖐 [Drag] Prev Page')
                        : t.btnPrevPageGrip}
                    </span>
                  </button>
                )}

                <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
                  <div className={`flex items-center gap-2 ${currentPage > 0 ? 'ml-10 sm:ml-36' : ''} transition-all`}>
                    <BookOpen className="w-4 h-4 text-amber-800" />
                    <span className="font-serif-kr text-xs font-bold tracking-wider text-amber-950 uppercase">
                      Pentalyze · Context
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-800" />
                    <span className="text-[11px] font-mono text-stone-500">
                      Stack {currentPage} / {totalPages}
                    </span>
                  </div>
                </div>

                <div className="my-auto py-4 space-y-4">
                  <div className="relative p-5 rounded-xl bg-amber-950/[0.04] border border-amber-900/10 shadow-inner">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
                      Original Context
                    </span>
                    <p className="font-serif-kr text-base sm:text-lg text-stone-900 leading-relaxed font-semibold">
                      "{record.originalText}"
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/65 border border-amber-900/10 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-900 uppercase block">
                      Core Insight
                    </span>
                    <p className="text-xs sm:text-sm font-serif-kr text-stone-700 leading-relaxed">
                      {displaySummary}
                    </p>
                  </div>

                  {/* 7개 페이지 리프 인덱스 바 */}
                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                      7 Pages Quick Jump
                    </span>
                    <div className="grid grid-cols-7 gap-1">
                      {[0, 1, 2, 3, 4, 5, 6].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => goToPage(p)}
                          className={`py-1.5 px-0.5 rounded text-center transition-all ${
                            currentPage === p
                              ? 'bg-amber-900 text-amber-50 font-bold shadow-md scale-105'
                              : 'bg-amber-900/[0.05] hover:bg-amber-900/10 text-stone-700 text-[10px]'
                          }`}
                        >
                          <span className="block font-mono">{p === 0 ? 'Cover' : p === 6 ? 'End' : `${p}결`}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-500">
                  <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono text-[11px]">Local Archive</span>
                </div>
              </div>

              {/* ▶ 우측 정적 페이지 */}
              <div
                className="relative paper-texture-right p-6 sm:p-8 flex flex-col justify-between text-stone-800"
                style={{
                  transform: `translateZ(${(totalPages - currentPage) * 1.8}px)`
                }}
              >
                {/* 모서리 잡기 힌지 핸들 (다음 페이지로 넘김) */}
                {currentPage < totalPages && (
                  <button
                    type="button"
                    onPointerDown={(e) => handleButtonPointerDown('next', e)}
                    onPointerMove={handleButtonPointerMove}
                    onPointerUp={handleButtonPointerUp}
                    onMouseDown={(e) => handleButtonGripStart('next', e.clientX, e.clientY, e)}
                    onTouchStart={(e) => handleButtonGripStart('next', e.touches[0].clientX, e.touches[0].clientY, e)}
                    onClick={(e) => handleButtonGripClick('next', e)}
                    className={`group absolute top-3 right-4 flex items-center gap-1.5 p-1 px-2.5 rounded-lg border transition-all z-20 select-none touch-none ${
                      isGripModeActive
                        ? 'cursor-grab active:cursor-grabbing bg-amber-500 text-amber-950 border-amber-400 shadow-md ring-2 ring-amber-300 font-bold'
                        : 'bg-amber-900/10 hover:bg-amber-900/15 text-amber-900 border-amber-900/15 cursor-pointer'
                    }`}
                    title={isGripModeActive ? '이 모서리 버튼을 잡고 왼쪽으로 드래그하면 페이지가 말리며 넘어갑니다.' : '클릭하면 다음 페이지로 넘어갑니다.'}
                  >
                    <Hand className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                      {isHoldingPage && dragTargetDir === 'next'
                        ? 'Dragging...'
                        : isGripModeActive
                        ? (currentLang === 'ko' ? '🖐 [잡고 드래그] 다음 책장' : '🖐 [Drag] Next Page')
                        : t.btnNextPageGrip}
                    </span>
                  </button>
                )}

                {renderPageCard(isFlipping && flipDirection === 'next' ? currentPage + 1 : currentPage)}
              </div>

              {/* [중앙 책등 척추 음영] */}
              <div className="book-spine-crease absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-30" />

              {/* [실시간 연속 드래그 말림 리프 - 다음 페이지 (우측 ➔ 좌측)] */}
              {isHoldingPage && dragTargetDir === 'next' && (
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(-${dragProgress * 180}deg) skewY(-${dragProgress * 4}deg) translateZ(${dragProgress * 45}px)`,
                    boxShadow: `${-dragProgress * 30}px 0 40px rgba(0, 0, 0, ${dragProgress * 0.45})`
                  }}
                >
                  {/* 유연한 종이 착시를 일으키는 실시간 원통형 곡면 섀도우 */}
                  <div
                    className="absolute inset-0 pointer-events-none z-50"
                    style={{
                      background: `linear-gradient(to right, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.4}) 0%, transparent 40%, rgba(255,255,255,${Math.sin(dragProgress * Math.PI) * 0.2}) 60%, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.25}) 100%)`
                    }}
                  />
                  <div className="page-face absolute inset-0 paper-texture-right pointer-events-none">
                    {renderPageCard(currentPage)}
                  </div>
                  <div className="page-face page-back absolute inset-0 paper-texture-left pointer-events-none">
                    {renderPageCard(currentPage + 1)}
                  </div>
                </div>
              )}

              {/* [실시간 연속 드래그 말림 리프 - 이전 페이지 (좌측 ➔ 우측)] */}
              {isHoldingPage && dragTargetDir === 'prev' && (
                <div
                  className="absolute inset-y-0 left-0 w-1/2 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'right center',
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${dragProgress * 180}deg) skewY(${dragProgress * 4}deg) translateZ(${dragProgress * 45}px)`,
                    boxShadow: `${dragProgress * 30}px 0 40px rgba(0, 0, 0, ${dragProgress * 0.45})`
                  }}
                >
                  {/* 유연한 종이 착시를 일으키는 실시간 원통형 곡면 섀도우 */}
                  <div
                    className="absolute inset-0 pointer-events-none z-50"
                    style={{
                      background: `linear-gradient(to left, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.4}) 0%, transparent 40%, rgba(255,255,255,${Math.sin(dragProgress * Math.PI) * 0.2}) 60%, rgba(0,0,0,${Math.sin(dragProgress * Math.PI) * 0.25}) 100%)`
                    }}
                  />
                  <div className="page-face absolute inset-0 paper-texture-left pointer-events-none">
                    {renderPageCard(currentPage - 1)}
                  </div>
                  <div className="page-face page-back absolute inset-0 paper-texture-right pointer-events-none">
                    {renderPageCard(currentPage)}
                  </div>
                </div>
              )}

              {/* [실물 종이 말림 자동 플립 리프] */}
              {isFlipping && !isHoldingPage && (
                <div
                  className={`absolute inset-y-0 pointer-events-none ${
                    flipDirection === 'next'
                      ? 'right-0 w-1/2 anim-curl-next'
                      : 'left-0 w-1/2 anim-curl-prev'
                  } z-40`}
                  style={{
                    transformOrigin: flipDirection === 'next' ? 'left center' : 'right center'
                  }}
                >
                  {/* 플립 중 종이 굽힘 하이라이트/섀도우 레이어 */}
                  <div className="absolute inset-0 pointer-events-none z-50 bg-gradient-to-r from-black/20 via-transparent to-black/20 mix-blend-multiply opacity-60" />
                  
                  <div
                    className={`page-face absolute inset-0 pointer-events-none ${
                      flipDirection === 'next' ? 'paper-texture-right' : 'paper-texture-left'
                    }`}
                  >
                    {renderPageCard(flipDirection === 'next' ? currentPage : currentPage)}
                  </div>

                  <div
                    className={`page-face page-back absolute inset-0 pointer-events-none ${
                      flipDirection === 'next' ? 'paper-texture-left' : 'paper-texture-right'
                    }`}
                  >
                    {renderPageCard(flipDirection === 'next' ? currentPage + 1 : currentPage - 1)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 하단 페이지 네비게이터 컨트롤 바 */}
          <div className="mt-4 flex items-center justify-between px-1 sm:px-2 text-xs text-zinc-400">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 transition-colors ${
                currentPage === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.prevPage}</span>
            </button>

            {/* 도트 인디케이터 */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => goToPage(pageNum)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === pageNum
                      ? 'w-5 sm:w-7 bg-amber-500 shadow-md shadow-amber-500/40'
                      : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  title={pageNum === 0 ? 'Cover' : pageNum === 6 ? 'End' : `${pageNum}결`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={currentPage === totalPages || isFlipping}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10 transition-colors ${
                currentPage === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="hidden sm:inline">{t.nextPage}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
