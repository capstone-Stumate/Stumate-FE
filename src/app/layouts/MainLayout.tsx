import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative flex w-full max-w-[430px] min-h-screen flex-col bg-white">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
