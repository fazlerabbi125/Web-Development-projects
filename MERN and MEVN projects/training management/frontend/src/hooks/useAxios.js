import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { getTokens } from "../utils/handleStorage";

const axInstance = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:8000",
});

axInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    //renewing Token
    const { accessToken, refreshToken } = getTokens();
    const decodedUser = jwt_decode(accessToken);
    const isExpired = decodedUser.exp * 1000 < Date.now(); //JWT expiration time is in seconds white Date.now() is milliseconds
    const prevRequest = error.config; //get previous request configuration info
    const status = error.response ? error.response.status : null;
    if (decodedUser && isExpired && status === 403) {
      try {
        const { data } = await axInstance.post("/refresh-token", {
          token: refreshToken,
        });
        localStorage.setItem("refresh", data.results.refresh_token);
        localStorage.setItem("token", data.results.access_token);
        prevRequest.headers[
          "Authorization"
        ] = `Bearer ${data.results.access_token}`;
        return axInstance(prevRequest);
      } catch (err) {
        console.log(err);
      }
    }
    return error;
  }
);

const useAxios = (url, dataTimeout = 1000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axInstance.get(url, {
          headers: {
            Authorization: `Bearer ${getTokens().accessToken}`,
          },
        });
        if (!response.data && !response.data.success)
          throw new Error(response.response.data.message);
        setData(response.data.results);
        //console.log(response.data.results);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    let t = setTimeout(() => fetchData(), dataTimeout);
    return () => clearTimeout(t);
  }, [url, dataTimeout]);

  return { data, error, isLoading };
};
export { axInstance, useAxios };
