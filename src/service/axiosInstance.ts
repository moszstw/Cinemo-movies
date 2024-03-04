import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://www.majorcineplex.com/apis";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const apiRequest = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance.request<T>(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default instance;
