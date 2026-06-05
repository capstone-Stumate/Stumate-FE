import { useState } from 'react';

const useSignup = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = name.trim() !== '' && userId.trim() !== '' && password.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    // TODO: API 연결
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
