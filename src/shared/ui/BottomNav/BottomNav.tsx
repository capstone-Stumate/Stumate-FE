import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/shared/constants/path';

import homeSvg from '@/assets/home.svg';
import timerSvg from '@/assets/timer.svg';
import profileSvg from '@/assets/profile.svg';

const NAV_ITEMS = [
  { label: '홈', icon: homeSvg, path: ROUTE_PATH.HOME },
  { label: '타이머', icon: timerSvg, path: ROUTE_PATH.TIMER },
  { label: '내 정보', icon: profileSvg, path: ROUTE_PATH.MYPAGE },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="-mx-7 flex w-[calc(100%+56px)] items-center justify-around border-t border-border bg-white py-3">
      {NAV_ITEMS.map(({ label, icon, path }) => {
        const isActive = pathname === path;
        return (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1"
          >
            <img
              src={icon}
              alt={label}
              className={`h-6 w-6 ${isActive ? 'opacity-100' : 'opacity-40'}`}
            />
            <span
              className={`text-xs font-sans ${isActive ? 'text-primary font-medium' : 'text-text-gray'}`}
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
