import axios, { AxiosResponse, AxiosError } from "axios";
import useSWR from "swr";

const axInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export interface CustomAxiosResponse<T = any> {
  isLoading: boolean;
  error?: AxiosError;
  data: AxiosResponse<T>['data'];
}

const fetchData = async (
  url: string,
  params: Record<string, number | string> = {}
) => {
  const res: AxiosResponse = await axInstance.get(url, { params });
  return res.data;
};

const useAxios = (
  url: string,
  params: Record<string, number | string> = {}
) => {
  const { data, error, isLoading } = useSWR([url, params], ([url, params]) =>
    fetchData(url, params)
  );

  return { data, error, isLoading };
};

export { axInstance, useAxios, fetchData };