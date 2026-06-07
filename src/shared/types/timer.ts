export type TimerStatus = 'idle' | 'running' | 'paused';
export type TimerModalType = 'none' | 'setup' | 'complete';

export interface TimerSession {
  subject: string;
  location: string;
}
