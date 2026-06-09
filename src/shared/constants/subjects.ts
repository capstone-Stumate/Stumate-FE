export const DAYS = [
  { id: 'MON', label: '월' },
  { id: 'TUE', label: '화' },
  { id: 'WED', label: '수' },
  { id: 'THU', label: '목' },
  { id: 'FRI', label: '금' },
  { id: 'SAT', label: '토' },
  { id: 'SUN', label: '일' },
] as const;

export type DayId = (typeof DAYS)[number]['id'];
