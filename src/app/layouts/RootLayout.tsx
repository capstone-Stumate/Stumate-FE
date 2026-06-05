import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white px-7">
      <Outlet />
    </div>
  );
};

export default RootLayout;
