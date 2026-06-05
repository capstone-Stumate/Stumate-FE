import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-white px-7">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
