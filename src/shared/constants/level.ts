export const LEVEL = [
  { id: 'EASY', label: '일반인', description: '주 3회 30분' },
  { id: 'NORMAL', label: '독서실러', description: '주 5회 1시간' },
  { id: 'HARD', label: '도서관 귀신', description: '매일 2시간' },
] as const;

export type LevelId = (typeof LEVEL)[number]['id'];
