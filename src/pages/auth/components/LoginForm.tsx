import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import useLogin from '../hooks/useLogin';

const LoginForm = () => {
  const { userId, password, isFormValid, setUserId, setPassword, handleSubmit } = useLogin();

  return (
    <section className="mt-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        label="로그인"
        type="submit"
        isActive={isFormValid}
        onClick={handleSubmit}
      />
    </section>
  );
};

export default LoginForm;
