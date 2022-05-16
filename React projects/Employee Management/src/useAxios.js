import { useState, useEffect } from 'react';
import axios from 'axios';

const axInstance = axios.create({
  baseURL: 'http://localhost:8000/employees/',
});

// const useAxios = (url) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     console.log(url);
//     useEffect(() => {
//       const controller = new AbortController();//For aborting fetch on useEffect cleanup
//       axInstance.get(url, {
//           signal: controller.signal
//       }).then(function(response) {
//             setData(response.data);
//             console.log(data);
//             setIsLoading(false);
//             setError(null);
//       }).catch((err) => {
//             setError(err.message);
//             setIsLoading(false);
//       });

//       // cancel the request
//        return () => controller.abort();//useEffect clean-up function to prevent memory leaks
//   }, [url]); //Whenever URL changes, the useEffect function re-runs

//     // custom hook returns value
//     return { data, error, isLoading };
// };

export default axInstance;