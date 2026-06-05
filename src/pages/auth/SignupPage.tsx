import { useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import { ROUTE_PATH } from '@/shared/constants/path';
import logo from '@/assets/logo.svg';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen w-full flex-col justify-center">
      <div className="mb-8 flex flex-col items-center gap-2">
        <img src={logo} alt="Stumate" className="h-6" />
        <h1 className="text-header2 text-text font-sans font-medium">
          회원가입
        </h1>
      </div>
      <SignupForm />
      <p className="text-body text-text-gray mt-6 text-center">
        이미 계정이 있나요?
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATH.LOGIN)}
          className="text-primary underline"
        >
          로그인하기
        </button>
      </p>
    </main>
  );
};

export default SignupPage;
