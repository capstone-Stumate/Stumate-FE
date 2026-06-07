import type { AxiosError } from 'axios';
import axios from 'axios';

export const isAxiosStatusError = (
  error: unknown,
  status: number,
): error is AxiosError => {
  return axios.isAxiosError(error) && error.response?.status === status;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? '서버 오류가 발생했어요.';
  }
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했어요.';
};
