import { PresetItem } from './types';

export const koPresets: PresetItem[] = [
  {
    mode: 'correction',
    label: '✍️ 업무 메일 제안 (본인)',
    text: '저희가 이번에 신규로 준비한 기능들에 대해서 검토 부탁드리며 피드백 주시면 수정해서 바로 반영토록 하겠습니다.'
  },
  {
    mode: 'correction',
    label: '✍️ 자기소개서 한 줄 (본인)',
    text: '저는 어릴 때부터 다양한 경험을 많이 해보면서 팀원들과의 소통을 매우 중시하는 적극적인 태도로 모든 일에 임해왔습니다.'
  },
  {
    mode: 'analysis',
    label: '💡 칼럼 명언 (타인)',
    text: '단순함이란 궁극의 정교함이다. 복잡성을 걷어내고 본질에 다가설 때 비로소 진정한 가치가 드러난다.'
  },
  {
    mode: 'analysis',
    label: '💡 비즈니스 공문 (타인)',
    text: '금번 프로젝트의 주요 변경 건에 대하여 각 부서별 협의를 조속히 완결 짓고, 미비된 제반 사항을 취합하여 명일까지 일괄 보고토록 바랍니다.'
  }
];
