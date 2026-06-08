import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const customInstance = <T>(url: string | AxiosRequestConfig, config?: RequestInit & AxiosRequestConfig): Promise<T> => {
  const { body, ...rest } = (config ?? {}) as RequestInit & AxiosRequestConfig;
  const axiosConfig: AxiosRequestConfig = typeof url === 'string'
    ? { url, ...rest, ...(body !== undefined ? { data: body } : {}) }
    : url;
  return instance(axiosConfig).then(({ data }) => data);
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
