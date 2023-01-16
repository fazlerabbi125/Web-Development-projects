import MovieList from "../components/MovieList";
import withHOC from "../components/withHoc";
import { useAxios } from "../hooks/useAxios";
import { useState, useMemo, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
    const [query, setQuery] = useState({ search: "", filter: "" });
    const debounceValue = useDebounce(query.search);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const queryParams = useMemo(() => {
        let paramString = `?page=${pageNumber}&itemsPerPage=${itemsPerPage}`;
        if (query.filter && debounceValue) {
            paramString += `&${query.filter}=${debounceValue}`;
        }
        return paramString;
    }, [query.filter, debounceValue, pageNumber, itemsPerPage]);
    const { data, error, isLoading } = useAxios("" + queryParams);

    useEffect(() => {
        setPageNumber(0);
    }, [query.filter, debounceValue]);

    return (
        <>
            {isLoading && (
                <h2 className="text-center">
                    Loading <i className="fa fa-spinner fa-spin"></i>
                </h2>
            )}
            {error && (<h2 className="text-center text-danger">{error}</h2>)}
            {!error && data && (
                <MovieList
                    data={data}
                    query={query}
                    setQuery={setQuery}
                    itemsPerPage={itemsPerPage}
                    setPageNumber={setPageNumber}
                />
            )}
        </>
    );
};

export default withHOC(Home, "CineWatch");
