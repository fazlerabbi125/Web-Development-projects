import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const axInstance = axios.create({
  baseURL: "http://localhost:8000/employees",
});

const useAxios = (url: string, timeout: number = 1000) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axInstance.get(url);
        setData(response.data);
        setIsLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    let t = setTimeout(() => fetchData(), timeout);
    return () => clearTimeout(t);
  }, [url, timeout]);

  // custom hook returns value
  return { data, error, isLoading };
};
export { axInstance, useAxios };
