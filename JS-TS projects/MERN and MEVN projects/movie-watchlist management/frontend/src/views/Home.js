import MovieList from "../components/MovieList";
import withHOC from "../components/withHoc";
import { useAxios } from "../hooks/useAxios";
import { useState } from "react";

const Home = () => {
    const { data, error, isLoading } = useAxios("");
    const [query, setQuery] = useState({ search: "", filter: "" });
    return (
        <>
            {isLoading && (
                <h2 className="text-center">
                    Loading <i className="fa fa-spinner fa-spin"></i>
                </h2>
            )}
            {error && <h2 className="text-center text-danger">{error}</h2>}
            {!isLoading && !error && (
                <MovieList data={data} query={query} setQuery={setQuery} />
            )}
        </>
    );
};

export default withHOC(Home, "CineWatch");
