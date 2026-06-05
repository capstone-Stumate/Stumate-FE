import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import useSignup from '../hooks/useSignup';

const SignupForm = () => {
  const {
    name,
    userId,
    password,
    isFormValid,
    setName,
    setUserId,
    setPassword,
    handleSubmit,
  } = useSignup();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Input
          label="이름"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        label="가입하기"
        type="submit"
        isActive={isFormValid}
        onClick={handleSubmit}
      />
    </section>
  );
};

export default SignupForm;
