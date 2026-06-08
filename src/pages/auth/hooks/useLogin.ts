import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin as useLoginMutation } from '@/shared/api/generated/user-controller/user-controller';
import useAuthStore from '@/shared/store/authStore';
import { ROUTE_PATH } from '@/app/router/path';
import type { UpdatePlanInfoPlanLevel } from '@/shared/api/generated/stumateAPI.schemas';

const useLogin = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: loginMutate } = useLoginMutation();

  const isFormValid = userId.trim() !== '' && password.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    loginMutate(
      { data: { username: userId, password } },
      {
        onSuccess: (data) => {
          const result = data as unknown as { userId: number; username: string; name: string; planLevel: UpdatePlanInfoPlanLevel };
          setUser(result);
          navigate(ROUTE_PATH.TIMER);
        },
      },
    );
  };

  return {
    userId,
    password,
    isFormValid,
    setUserId,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
