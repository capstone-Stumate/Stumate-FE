import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/app/layouts/MainLayout';
import { ROUTE_PATH } from '@/shared/constants/path';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));
const OnboardingPage = lazy(() => import('@/pages/onboarding/OnboardingPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const TimerPage = lazy(() => import('@/pages/timer/TimerPage'));
const CenterPage = lazy(() => import('@/pages/center/CenterPage'));
const MyPage = lazy(() => import('@/pages/mypage/MyPage'));
const TodolistPage = lazy(() => import('@/pages/todolist/TodolistPage'));

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={null}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: withSuspense(<LoginPage />),
  },
  {
    path: ROUTE_PATH.SIGNUP,
    element: withSuspense(<SignupPage />),
  },
  {
    path: ROUTE_PATH.ONBOARDING,
    element: withSuspense(<OnboardingPage />),
  },
  {
    element: <MainLayout />,
    children: [
      { path: ROUTE_PATH.HOME, element: withSuspense(<HomePage />) },
      { path: ROUTE_PATH.TIMER, element: withSuspense(<TimerPage />) },
      { path: ROUTE_PATH.CENTER, element: withSuspense(<CenterPage />) },
      { path: ROUTE_PATH.MYPAGE, element: withSuspense(<MyPage />) },
      { path: ROUTE_PATH.TODOLIST, element: withSuspense(<TodolistPage />) },
    ],
  },
]);

export default router;
