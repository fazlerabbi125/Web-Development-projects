import { useState, useEffect } from "react";

export const API_route_prefix = "http://localhost:8000";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true); //Used for conditional JSX
  const [error, setError] = useState(null);
  //Using useEffect hook to fetch data from server
  useEffect(() => {
    /*Fetching data from json database. Use the command: npx json-server --watch json-database/db.json --port 8000
      This will use the json file as server and it has to be used on used on another terminal along with using npm start
      in one terminal where 8000 port number is used as npm start command connects to port 3000 and without specifying another
      port number, the npx json-server tries to connect to port 3000 by default.
      */
    const abortCont = new AbortController(); //For aborting fetch on useEffect cleanup
    setTimeout(() => {
      //Loads message for some time until data fetch is completed
      fetch(API_route_prefix + url, { signal: abortCont.signal }) //optional 2nd argument used for useEffect cleanup
        .then((res) => {
          if (!res.ok) throw Error(`Data can't be fetched for that resource`); //Throw error if there are errors coming back from server
          return res.json(); //to get data from response object. Converts JSON to JS object
        })
        .then((data) => {
          // console.log(data);
          setData(data);
          setIsPending(false); //Used for conditional JSX
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        }); //Catch any connection errors
    }, 1000);

    // abort the fetch
    return () => abortCont.abort(); //useEffect clean-up function to prevent memory leaks
  }, [url]); //Whenever URL changes, the useEffect function re-runs

  return { data, isPending, error };
};

export default useFetch;
