import { useState } from 'react';

const useLogin = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = userId.trim() !== '' && password.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연결
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
