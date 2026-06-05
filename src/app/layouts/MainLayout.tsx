import { Outlet } from 'react-router-dom';
import BottomNav from '@/shared/ui/BottomNav/BottomNav';

const MainLayout = () => {
  return (
    <>
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
};

export default MainLayout;
