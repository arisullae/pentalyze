import { PresetItem } from './types';

export const jaPresets: PresetItem[] = [
  {
    mode: 'correction',
    label: '✍️ 業務メール提案 (自身)',
    text: '今回新たに準備いたしました機能につきまして、ご確認およびフィードバックをいただけますと幸いです。'
  },
  {
    mode: 'correction',
    label: '✍️ 自己PR・志望動機 (自身)',
    text: '私は常にチーム内の円滑なコミュニケーションを重視し、主体的かつ迅速に課題解決に取り組んできました。'
  },
  {
    mode: 'analysis',
    label: '💡 コラム名言 (他者)',
    text: 'シンプルさは究極の洗練である。複雑さをそぎ落としたときにこそ、物事の本質的な価値が現れる。'
  },
  {
    mode: 'analysis',
    label: '💡 社内公文・報告 (他者)',
    text: '本プロジェクトの主要な変更点について各部署での調整を速やかに完了させ、明日までに統合報告書を提出してください。'
  }
];
