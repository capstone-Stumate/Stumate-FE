import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/app/layouts/MainLayout';
import { ROUTE_PATH } from '@/shared/constants/path';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    lazy: async () => {
      const { default: Component } = await import('@/pages/auth/LoginPage');
      return { Component };
    },
  },
  {
    path: ROUTE_PATH.SIGNUP,
    lazy: async () => {
      const { default: Component } = await import('@/pages/auth/SignupPage');
      return { Component };
    },
  },
  {
    path: ROUTE_PATH.ONBOARDING,
    lazy: async () => {
      const { default: Component } =
        await import('@/pages/onboarding/OnboardingPage');
      return { Component };
    },
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        lazy: async () => {
          const { default: Component } = await import('@/pages/home/HomePage');
          return { Component };
        },
      },
      {
        path: ROUTE_PATH.TIMER,
        lazy: async () => {
          const { default: Component } =
            await import('@/pages/timer/TimerPage');
          return { Component };
        },
      },
      {
        path: ROUTE_PATH.CENTER,
        lazy: async () => {
          const { default: Component } =
            await import('@/pages/center/CenterPage');
          return { Component };
        },
      },
      {
        path: ROUTE_PATH.MYPAGE,
        lazy: async () => {
          const { default: Component } = await import('@/pages/mypage/MyPage');
          return { Component };
        },
      },
      {
        path: ROUTE_PATH.TODOLIST,
        lazy: async () => {
          const { default: Component } =
            await import('@/pages/todolist/TodolistPage');
          return { Component };
        },
      },
    ],
  },
]);

export default router;
