import { useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import { ROUTE_PATH } from '@/shared/constants/path';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen flex-col justify-center px-6 py-10">
      <h1 className="mb-8 text-header1 font-sans font-medium text-text">회원가입</h1>
      <SignupForm />
      <p className="mt-6 text-center text-body text-text-gray">
        이미 계정이 있나요?{' '}
        <button
          type="button"
          onClick={() => navigate(ROUTE_PATH.LOGIN)}
          className="text-primary underline"
        >
          로그인
        </button>
      </p>
    </main>
  );
};

export default SignupPage;
