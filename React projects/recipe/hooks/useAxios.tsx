import axios, { AxiosResponse, AxiosError } from "axios";
import useSWR from "swr";

const axInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api",
  headers: {
    'X-RapidAPI-Key': 'd052de18ccmsh987128f91545609p1a60c6jsn4deaea0deebd',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
  }
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