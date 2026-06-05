import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative flex w-full max-w-[430px] min-h-screen flex-col bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
