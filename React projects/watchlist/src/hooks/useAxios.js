import { useState, useEffect } from 'react';
import axios from 'axios';

const axInstance = axios.create({
  baseURL: 'http://localhost:8000/data',
});

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = async ()=>{
      try {
        let response= await axInstance.get(url);
        setData(response.data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    useEffect(() => {
      let t=setTimeout(() =>fetchData(),1000)
      return ()=>clearTimeout(t)
    }, [url]);

    // custom hook returns value
    return { data, error, isLoading };
};
export {axInstance, useAxios};
