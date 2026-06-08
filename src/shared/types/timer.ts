export type TimerStatus = 'idle' | 'running' | 'paused';
export type TimerModalType = 'none' | 'setup' | 'complete';

export interface TimerSession {
  sessionId: number;
  userSubjectId: number;
  subject: string;
  location: string;
}
