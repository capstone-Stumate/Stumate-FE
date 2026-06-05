import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { ROUTE_PATH } from '@/shared/constants/path';
import logo from '@/assets/logo.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen w-full flex-col justify-center">
      <div className="mb-8 flex flex-col items-center gap-2">
        <img src={logo} alt="Stumate" className="h-6" />
        <h1 className="text-header2 font-sans text-text">로그인</h1>
      </div>
      <LoginForm />
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="text-body text-text-gray">계정이 없나요?</p>
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATH.SIGNUP)}
          className="text-body font-bold text-primary underline"
        >
          회원가입하기
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
