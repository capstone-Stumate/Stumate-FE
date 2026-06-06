export interface AiLearningType {
  id: string;
  emoji: string;
  name: string;
  description: string;
}

export const AI_LEARNING_TYPES: AiLearningType[] = [
  {
    id: 'immersive',
    emoji: '🔥',
    name: '몰입형',
    description: '한 번 집중하면 오랜 시간 몰입해요.\n긴 세션에서 최고의 성과를 냅니다.',
  },
  {
    id: 'steady',
    emoji: '📚',
    name: '꾸준형',
    description: '매일 꾸준히 공부하는 습관이 있어요.\n일정한 페이스로 꾸준히 성과를 쌓아요.',
  },
  {
    id: 'crammer',
    emoji: '⚡',
    name: '벼락치기형',
    description: '마감 직전 집중력이 폭발해요.\n짧고 강렬한 세션에서 최고의 효율을 냅니다.',
  },
  {
    id: 'night-owl',
    emoji: '🌙',
    name: '야행성 학습형',
    description: '밤 10시 이후에 집중도가 급격히 올라가요.\n22~24시 구간 평균 9.2점으로 최고 성과를 냅니다.',
  },
  {
    id: 'short-repeat',
    emoji: '🔄',
    name: '짧은 집중 반복형',
    description: '짧은 집중 세션을 자주 반복해요.\n25분 이하의 세션에서 가장 높은 집중도를 보여요.',
  },
];
