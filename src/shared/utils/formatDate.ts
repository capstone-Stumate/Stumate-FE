const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const formatDateLabel = (dateString: string): string => {
  const [, month, day] = dateString.split('-');
  return `${month}.${day}`;
};

export const getDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  return DAY_LABELS[date.getDay()];
};

export const getWeekDates = (): string[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date.toISOString().split('T')[0];
  });
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};
