export interface SaveSessionRequest {
  subject: string;
  location: string;
  durationSeconds: number;
  pauseCount: number;
  rating: number;
}

export const saveTimerSession = async (_data: SaveSessionRequest): Promise<void> => {
  // TODO: API 연동
};
