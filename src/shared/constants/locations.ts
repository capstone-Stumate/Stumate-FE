export const LOCATIONS = [
  { id: 'library', label: '도서관', shortLabel: '도서' },
  { id: 'school', label: '학교', shortLabel: '학교' },
  { id: 'cafe', label: '카페', shortLabel: '카페' },
  { id: 'home', label: '집', shortLabel: '집' },
  { id: 'study-cafe', label: '스터디카페', shortLabel: '스터디' },
  { id: 'etc', label: '기타 장소', shortLabel: '기타' },
] as const;

export type LocationId = (typeof LOCATIONS)[number]['id'];
