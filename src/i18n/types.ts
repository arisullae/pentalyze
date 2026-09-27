export interface TranslationDict {
  brandSubtitle: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  sourceSelection: string;
  modeOwn: string;
  modeOther: string;
  placeholderOwn: string;
  placeholderOther: string;
  paste: string;
  clear: string;
  charCount: string;
  ctrlEnterHint: string;
  presetTitle: string;
  apiKeyRegistered: string;
  byokNotice: string;
  analyzeTimeNotice: string;
  analyzeBtnIdle: string;
  analyzeBtnLoading: string;
  step1Name: string;
  step2Name: string;
  step3Name: string;
  step4Name: string;
  step5Name: string;
  step1DescOwn: string;
  step1DescOther: string;
  step2DescOwn: string;
  step2DescOther: string;
  step3DescOwn: string;
  step3DescOther: string;
  step4DescOwn: string;
  step4DescOther: string;
  step5DescOwn: string;
  step5DescOther: string;
  navWrite: string;
  navReading: string;
  navBookshelf: string;
  navSettings: string;
  viewFlat: string;
  viewSpatial: string;
  viewXR: string;
  btnGripModeOn: string;
  btnGripModeOff: string;
  btnPrevPageGrip: string;
  btnNextPageGrip: string;
  flipAxisVertical: string;
  flipAxisHorizontal: string;
  tiltSensor: string;
  readCurrentPage: string;
  stopAudio: string;
  continuousAudiobook: string;
  readingNow: string;
  speechSpeed: string;
  speechEngine: string;
  prevPage: string;
  nextPage: string;
  coverTitle: string;
  congratsTitle: string;
  congratsDesc: string;
  readAgain: string;
  exportReport: string;
  translateContentBtn: string;
  translatingNotice: string;
  bookshelfTitle: string;
  bookshelfDesc: string;
  bookshelfAll: string;
  bookshelfFavorite: string;
  bookshelfSearchPlaceholder: string;
  bookshelfEmpty: string;
  settingsTitle: string;
  settingsDesc: string;
  settingsSave: string;
  exportTitle: string;
  copyMarkdown: string;
  copied: string;
  downloadMd: string;
  printPdf: string;
  close: string;

  // 3D 책장 & 대조 뷰 (Split-View)
  splitView: string;
  splitViewOn: string;
  splitViewTooltip: string;
  originalSource: string;
  sourceBadge: string;
  stepInsightLabel: string;
  insightBadge: string;
  polishedBadge: string;
  insightsAndDetails: string;
  actionableAdvice: string;
  copyContent: string;
  favorite: string;
  fullscreen: string;
  flipAxisTooltip: string;
  gripModeTooltip: string;
  ttsSpeedSettings: string;
  dragHalfNotice: string;
  dragLeftNotice: string;
  dragRightNotice: string;
  dragging: string;

  // 3D 책장 내부 다국어 전환 / 번역
  bookLanguageSelect: string;
  translateBookTo: string;
  translateNoticeBadge: string;

  // PWA & 앱 설치
  installApp: string;
  installAppTooltip: string;
  pwaModalTitle: string;
  pwaModalDesc: string;
  pwaBenefitOffline: string;
  pwaBenefitStandalone: string;
  pwaBenefitSpeed: string;
  pwaInstallNow: string;
  iosInstallGuideTitle: string;
  iosInstallStep1: string;
  iosInstallStep2: string;
  iosInstallStep3: string;
  desktopInstallGuideTitle: string;
  desktopInstallStep1: string;
  desktopInstallStep2: string;
  confirm: string;

  // 서재 & 안내
  selectBookPrompt: string;
  clearAll: string;
  importLibrary: string;
  exportLibrary: string;
  noSavedBooks: string;
  newAnalysis: string;

  // AI 모델 & 엔진 명칭 (Gemini 3.8 Flash)
  aiModelTitle: string;
  aiModelDesc: string;
  aiModelBadge: string;

  // 3D 책장 대조 뷰 (원어 인사이트 vs 타국어 번역 인사이트)
  splitViewOriginalInsight: string;
  splitViewTranslatedInsight: string;
  splitViewSameLangNotice: string;
  splitViewTranslateNow: string;
  splitViewTranslating: string;

  // 개발자 가이드 7번: AI 버전 갱신 & 다국어 동기화
  devGuideVersionTitle: string;
  devGuideStudioLink: string;
  devGuidePromptCopy: string;
  devGuidePromptCopied: string;

  // 3D 책장 대조 뷰 (Split-View) 맞춤형 오디오 & 낭독 설정
  splitAudioTargetLabel?: string;
  splitAudioOriginal?: string;
  splitAudioTranslated?: string;
  splitAudioAlternate?: string;
  splitAudioFilterTitle?: string;
  splitFilterMain?: string;
  splitFilterTitle?: string;
  splitFilterDetails?: string;
  splitFilterAdvice?: string;
  splitPlayOriginal?: string;
  splitPlayTranslated?: string;
}
