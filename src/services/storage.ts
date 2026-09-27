import { SentenceRecord, APIConfig } from '../types';

const STORAGE_KEY_RECORDS = 'pentalyze_records_v1';
const STORAGE_KEY_CONFIG = 'pentalyze_api_config_v1';

export const INITIAL_SAMPLE_RECORDS: SentenceRecord[] = [
  {
    id: 'sample-analysis-1',
    createdAt: Date.now() - 3600000 * 5,
    originalText: '단순함이란 궁극의 정교함이다. 복잡성을 걷어내고 본질에 다가설 때 비로소 진정한 가치가 드러난다.',
    mode: 'analysis',
    summaryShort: '본질에 집중하기 위해 불필요한 복잡성을 제거하는 것이 최고 수준의 정교함이라는 통찰',
    isFavorite: true,
    steps: {
      step1: {
        title: '숨은 의도 및 행간 분석',
        subtitle: '작성자의 숨은 배경과 철학적 의도 파악',
        mainContent: '단순함(Simplicity)을 단순한 미니멀리즘이나 부족함이 아닌, 치열한 고민 끝에 도달한 최상위 완성도로 정의하고 있습니다. 피상적 기교나 군더더기 기능에 매몰되지 말고 문제의 핵심 본질을 꿰뚫어 보라는 강력한 설득 의도가 담겨 있습니다.',
        details: [
          '레오나르도 다빈치의 명언 변형으로, 미학적·엔지니어링적 절제미를 강조',
          '복잡한 것이 유능한 것이라는 편견을 반박하고 본질주의(Essentialism)를 환기',
          '독자에게 불필요한 요소를 과감히 가지치기할 결단을 촉구함'
        ],
        tags: ['본질주의', '철학적의도', '미니멀리즘', '통찰'],
        actionableAdvice: '상대방이 불필요한 디테일에 집착할 때 설득의 첫머리로 인용하기에 매우 강력한 문장입니다.'
      },
      step2: {
        title: '핵심 정보 속독 추출',
        subtitle: '1초 만에 캐치하는 코어 알맹이',
        mainContent: '불필요한 복잡성을 제거하여 본질에 도달하는 단순함이야말로 진정한 고도의 완성도이다.',
        details: [
          '핵심 개념 1: 단순함 = 궁극의 정교함 (완성도의 정점)',
          '핵심 개념 2: 복잡성 제거 ➔ 본질 포착 ➔ 진정한 가치 실현'
        ],
        tags: ['속독요약', '핵심키워드', '2초이해'],
        actionableAdvice: '기획서나 보고서 슬라이드의 헤드라인으로 즉시 차용 가능합니다.'
      },
      step3: {
        title: '고난도 어휘 및 배경 해설',
        subtitle: '사전 없이 깊이 이해하는 배경지식',
        mainContent: '문장에 사용된 주요 개념과 철학적 맥락을 쉽게 풀어드립니다.',
        details: [
          '궁극(窮極): 어떤 과정이나 상태의 맨 끝 또는 최고의 경지.',
          '정교함(Sophistication): 정밀하고 기묘하게 들어맞는 완성도. 보통 기교가 많은 것을 뜻하나, 여기서는 불순물이 완전히 걸러진 순수한 상태를 역설적으로 지칭.',
          '본질(Essence): 사물이 스스로 존재하는 데 없어서는 안 되는 고유의 성질. 피상적 현상과 대비되는 개념.'
        ],
        tags: ['어휘사전', '철학개념', '어원해설'],
        actionableAdvice: '단어의 사전적 뜻뿐 아니라 저자가 부여한 역설적 뉘앙스까지 음미해 보세요.'
      },
      step4: {
        title: '오류 및 번역투 지적',
        subtitle: '어색한 어법과 문맥 호응 진단',
        mainContent: '전체적으로 군더더기 없는 명료한 격언형 문장입니다. 번역투가 거의 없으나 목적에 따라 문체 변형이 가능합니다.',
        details: [
          '문법 진단: 주어-서술어 호응 완벽, 흠결 없는 완성도 높은 문장 구조.',
          '비즈니스 전달체: "진정한 정교함은 복잡함이 아닌 단순함에서 비롯되며, 본질에 집중할 때 비로소 최고의 가치가 창출됩니다."',
          '부드러운 에세이체: "단순해진다는 건 가장 깊이 다듬어졌다는 뜻입니다. 군더더기를 비워낼 때 비로소 소중한 본모습이 보입니다."'
        ],
        tags: ['문법호응완벽', '격언형', '톤앤매너'],
        actionableAdvice: '발표나 낭독 시 "단순함이란" 뒤에서 반 박자 쉬어줄 때 청중의 집중도가 극대화됩니다.'
      },
      step5: {
        title: '유사 표현 (패러프레이징)',
        subtitle: '어휘 풀을 유지한 다채로운 표현 확장',
        mainContent: '핵심 어휘풀(단순함, 본질, 가치, 정교함)을 활용하여 상황별로 대체할 수 있는 3가지 표현입니다.',
        details: [
          '표현 1 (직관적 카피): "더할 것이 없을 때가 아니라, 뺄 것이 없을 때 완벽함이 완성된다."',
          '표현 2 (비즈니스 전략): "복잡함을 덜어낸 자리에서 비로소 흔들리지 않는 가치의 본질이 드러납니다."',
          '표현 3 (철학적 성찰): "참된 정교함은 화려한 겉치레를 걷어내고 가장 단순한 핵심에 가닿는 용기입니다."'
        ],
        tags: ['패러프레이징', '카피라이팅', '표현의확장'],
        actionableAdvice: 'SNS 게시물이나 칼럼, 자기소개서에 어울리는 톤으로 골라 활용하세요.'
      }
    }
  },
  {
    id: 'sample-correction-1',
    createdAt: Date.now() - 3600000 * 2,
    originalText: '저희가 이번에 신규로 준비한 기능들에 대해서 검토 부탁드리며 피드백 주시면 수정해서 바로 반영토록 하겠습니다.',
    mode: 'correction',
    summaryShort: '신규 기능 검토 및 피드백 요청 메일의 전달력 향상과 비즈니스 에티켓 교정',
    isFavorite: false,
    steps: {
      step1: {
        title: '전달력 및 의도 검증',
        subtitle: '내가 쓴 의도가 상대에게 정확히 도달하는가',
        mainContent: '업무 검토를 부탁하고 신속히 보완하겠다는 의지는 명확히 드러납니다. 다만 서술어가 나열형으로 길어지고 "~토록 하겠습니다"라는 다소 군더더기적 어미가 섞여 있어, 상대방에게 다소 급박하거나 의무적인 인상을 줄 수 있습니다.',
        details: [
          '수신자 관점: 바쁜 수신자가 언제까지 피드백을 주어야 하는지 명확한 기한(Due-date)이 결여됨',
          '심리적 뉘앙스: "피드백 주시면 즉시 반영"은 적극적으로 보이나, 자칫 상대에게 빠른 답변을 재촉하는 뉘앙스로 비칠 수 있음'
        ],
        tags: ['의도검증', '업무커뮤니케이션', '심리적피드백'],
        actionableAdvice: '피드백 희망 마감일(예: 금주 목요일 15시)을 문장에 함께 덧붙이면 실행력이 2배 높아집니다.'
      },
      step2: {
        title: '한 줄 코어 정돈',
        subtitle: '하고 싶은 말의 군더더기 없는 핵심 압축',
        mainContent: '신규 기능에 대한 검토를 요청드리며, 남겨주신 피드백을 바탕으로 신속히 보완·적용하겠습니다.',
        details: [
          '핵심 1: 이번 신규 기능에 대한 검토 요청',
          '핵심 2: 피드백 수렴 후 신속한 보완 적용'
        ],
        tags: ['한줄압축', '핵심메시지', '가독성극대화'],
        actionableAdvice: '이메일의 제목이나 슬랙 메시지의 첫 줄로 활용하세요.'
      },
      step3: {
        title: '전문 대체 어휘 추천',
        subtitle: '문장의 품격을 높이는 비즈니스 어휘 제안',
        mainContent: '반복적이거나 관성적인 일상 어휘 대신 전문적이고 정돈된 비즈니스 용어를 사용해 보세요.',
        details: [
          '"신규로 준비한 기능" ➔ "신규 릴리즈/업데이트 기능군" 또는 "금번 기획 기능"',
          '"피드백 주시면" ➔ "고견(소견)을 주시면" 또는 "검토 의견을 전달해 주시면"',
          '"수정해서 바로 반영토록" ➔ "적극 반영하여 고도화하겠습니다"'
        ],
        tags: ['비즈니스어휘', '격식제고', '단어업그레이드'],
        actionableAdvice: '상사가 수신자일 경우 "피드백" 대신 "검토 의견"이라는 정중한 단어를 추천합니다.'
      },
      step4: {
        title: '맞춤법 및 비즈니스 리라이팅',
        subtitle: '비문 교정 및 톤앤매너 맞춤형 재구성',
        mainContent: '문장의 중복 조사를 정돈하고 비즈니스 매너에 맞추어 3가지 버전으로 교정해 드립니다.',
        details: [
          '추천 1 (정중한 격식체): "이번에 새로 준비한 기능들을 검토해 주시길 부탁드리며, 주시는 고견을 적극 반영하여 신속히 보완하겠습니다."',
          '추천 2 (간결한 실무체): "신규 기능에 대한 검토 및 의견을 부탁드립니다. 피드백 주신 사항은 즉시 제품에 반영하겠습니다."',
          '추천 3 (기한 명시형 프로페셔널): "금번 업데이트 기능에 대해 편하신 때 검토 부탁드립니다. 전달해 주신 의견을 충실히 반영하여 최종 적용토록 하겠습니다."'
        ],
        tags: ['맞춤법완료', '비즈니스에티켓', '완벽한교정'],
        actionableAdvice: '상대방의 직급과 친밀도에 따라 추천 1과 추천 2 중 선택해 발송하세요.'
      },
      step5: {
        title: '세련된 문장 후보군 3선',
        subtitle: '다채로운 어조로 변형한 대안 문장',
        mainContent: '기존 문장이 담고 있던 어휘 자산을 바탕으로 목적에 맞게 새로 조립한 문장들입니다.',
        details: [
          '대안 1 (고객/파트너십): "새롭게 선보이는 기능들을 면밀히 검토해 주시면, 귀한 피드백을 바탕으로 더욱 완성도 높게 매만지겠습니다."',
          '대안 2 (애자일 협업팀): "새로 개발된 기능 검토 부탁드립니다! 남겨주시는 코멘트는 스프린트에 즉시 반영하겠습니다."',
          '대안 3 (보고서/공문): "금번 신규 기능에 대한 최종 검토를 의뢰하오며, 회신해 주시는 검토 결과를 성실히 반영하겠습니다."'
        ],
        tags: ['문장다양성', '상황별후보군', '커뮤니케이션'],
        actionableAdvice: '협업 툴(노션, 지라, 잔디) 메신저에 바로 복사하여 사용하세요.'
      }
    }
  }
];

export function loadRecords(): SentenceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (!raw) {
      saveRecords(INITIAL_SAMPLE_RECORDS);
      return INITIAL_SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SAMPLE_RECORDS;
  } catch (err) {
    console.error('Failed to load records from localStorage', err);
    return INITIAL_SAMPLE_RECORDS;
  }
}

export function saveRecords(records: SentenceRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save records to localStorage', err);
  }
}

export function addRecord(record: SentenceRecord): SentenceRecord[] {
  const current = loadRecords();
  const updated = [record, ...current];
  saveRecords(updated);
  return updated;
}

export function deleteRecord(id: string): SentenceRecord[] {
  const current = loadRecords();
  const updated = current.filter((r) => r.id !== id);
  saveRecords(updated);
  return updated;
}

export function clearAllRecords(): void {
  localStorage.removeItem(STORAGE_KEY_RECORDS);
}

export function toggleFavorite(id: string): SentenceRecord[] {
  const current = loadRecords();
  const updated = current.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  saveRecords(updated);
  return updated;
}

export function loadAPIConfig(): APIConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) {
      return {
        provider: 'gemini',
        geminiKey: '',
        openaiKey: '',
        elevenLabsKey: '',
        elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM', // 기본 Rachel ID (샘플)
        preferredVoiceURI: ''
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      provider: 'gemini',
      geminiKey: '',
      openaiKey: '',
      elevenLabsKey: '',
      elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM',
      preferredVoiceURI: ''
    };
  }
}

export function saveAPIConfig(config: APIConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save API config', err);
  }
}
