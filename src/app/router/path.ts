export const ROUTE_PATH = {
  LOGIN: '/login',
  SIGNUP: '/',
  ONBOARDING: '/onboarding',
  TIMER: '/timer',
  PLANNER: '/planner',
  MYPAGE: '/mypage',
  TODOLIST: '/todolist',
} as const;

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
