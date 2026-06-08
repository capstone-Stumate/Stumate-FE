import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup as useSignupMutation } from '@/shared/api/generated/user-controller/user-controller';
import useAuthStore from '@/shared/store/authStore';
import { ROUTE_PATH } from '@/app/router/path';
import type { UpdatePlanInfoPlanLevel } from '@/shared/api/generated/stumateAPI.schemas';

const useSignup = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: signupMutate } = useSignupMutation();

  const isFormValid = name.trim() !== '' && userId.trim() !== '' && password.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    signupMutate(
      { data: { username: userId, password, name } },
      {
        onSuccess: (data) => {
          const result = data as unknown as { userId: number; username: string; name: string; planLevel: UpdatePlanInfoPlanLevel };
          setUser(result);
          navigate(ROUTE_PATH.ONBOARDING);
        },
      },
    );
  };

  return {
    name,
    userId,
    password,
    isFormValid,
    setName,
    setUserId,
    setPassword,
    handleSubmit,
  };
};

export default useSignup;
