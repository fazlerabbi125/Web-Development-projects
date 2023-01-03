import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { getTokens, selectStorage } from "../utils/handleStorage";

const axInstance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:8000",
});

axInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    //For renewing tokens
    const { accessToken, refreshToken } = getTokens();
    const decodedUser = jwt_decode(accessToken);
    const isExpired = decodedUser.exp * 1000 < Date.now();
    const prevRequest = error.config;
    const status = error.response ? error.response.status : null;
    if (decodedUser && isExpired && status === 403) {
      return axInstance
        .post("/refresh-token", { token: refreshToken })
        .then((res) => {
          if (selectStorage) {
            localStorage.setItem("refresh", res.data.results.refresh_token);
            localStorage.setItem("token", res.data.results.access_token);
          } else {
            sessionStorage.setItem("refresh", res.data.results.refresh_token);
            sessionStorage.setItem("token", res.data.results.access_token);
          }
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.results.access_token}`;
          return axInstance(prevRequest);
        });
    }
    return Promise.reject(error);
  }
);
// async function (error) {
//   const decodedUser = jwt_decode(localStorage.getItem('token'));
//   const isExpired = decodedUser.exp * 1000 < Date.now();
//   const prevRequest =error.config;
//   const status= error.response?error.response.status:null;
//   if (decodedUser && isExpired && status===403){
//     const {data}= await axios.post("http://localhost:8000/refresh-token",
//     {token:localStorage.getItem('refresh')});
//     localStorage.setItem('refresh',data.results.refresh_token);
//     localStorage.setItem('token',data.results.access_token);
//     prevRequest.headers['Authorization']=`Bearer ${data.results.access_token}`;
//     return axInstance(prevRequest);
//   }
//   return error;
// });

const useAxios = (url, timeout = 1000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      let response = await axInstance.get(url);
      if (!response?.data.success) throw new Error(response.data.message);
      setData(response.data.results);

      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let t = setTimeout(() => fetchData(), timeout);
    return () => clearTimeout(t);
  }, [url, timeout]);

  // custom hook returns value
  return { data, error, isLoading };
};
export { axInstance, useAxios };
