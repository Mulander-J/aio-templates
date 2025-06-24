import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

const axiosIns: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
axiosIns.interceptors.request.use((config) => {
  return config;
});

// 响应拦截器
axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log('[AXIOS ERROR]',error)
    toast.error(`${error?.code||''}: ${error.message}`);
    return Promise.reject(error);
  }
);

export { axiosIns };

export default async function request<T = any>(config: AxiosRequestConfig) {
  return axiosIns
    .request<{
      code: number;
      msg: string;
      data: T;
    }>(config)
    .then((res) => {
      const { data } = res;
      if (data.code === 0) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
