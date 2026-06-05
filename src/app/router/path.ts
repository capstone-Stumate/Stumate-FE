export const ROUTE_PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  ONBOARDING: '/onboarding',
  TIMER: '/',
  PLANNER: '/planner',
  CENTER: '/center',
  MYPAGE: '/mypage',
  TODOLIST: '/todolist',
} as const;

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];
