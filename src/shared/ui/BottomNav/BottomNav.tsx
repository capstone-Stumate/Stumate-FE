import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/app/router/path';

import plannerActive from '@/assets/planner-active.svg';
import plannerDefault from '@/assets/planner-default.svg';
import timerActive from '@/assets/timer-active.svg';
import timerDefault from '@/assets/timer-default.svg';
import profileActive from '@/assets/profile-active.svg';
import profileDefault from '@/assets/profile-default.svg';

const NAV_ITEMS = [
  {
    label: '플래너',
    activeIcon: plannerActive,
    defaultIcon: plannerDefault,
    path: ROUTE_PATH.PLANNER,
  },
  {
    label: '타이머',
    activeIcon: timerActive,
    defaultIcon: timerDefault,
    path: ROUTE_PATH.TIMER,
  },
  {
    label: '내 정보',
    activeIcon: profileActive,
    defaultIcon: profileDefault,
    path: ROUTE_PATH.MYPAGE,
  },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="border-border fixed bottom-0 left-1/2 flex w-full max-w-107.5 -translate-x-1/2 justify-around border-t bg-white py-3">
      {NAV_ITEMS.map(({ label, activeIcon, defaultIcon, path }) => {
        const isActive = pathname === path;
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1"
          >
            <img
              src={isActive ? activeIcon : defaultIcon}
              alt={label}
              className="h-6 w-6"
            />
            <span
              className={`font-sans text-xs ${isActive ? 'text-primary font-bold' : 'text-text-gray'}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
