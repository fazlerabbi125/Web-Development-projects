import List from "../components/List";
import withHOC from "../components/withHoc";
import SearchForm from "../components/SearchForm"
import { useState } from "react";
import {useAxios} from '../hooks/useAxios';

const Home = () => {
    
    const [query, setQuery] = useState({search:'',filter:''});
    const { data, error, isLoading }=useAxios('')

    function handleQuery(event){
        const name = event.target.name;
        const value = event.target.value;
        setQuery(values => ({...values, [name]: value}))
    }

    return ( <>
    <SearchForm query={query} handleQuery={handleQuery} />
    {isLoading && <h2 className="text-center">Loading <i className="fa fa-spinner fa-spin"></i></h2>}
    {error && <h2 className="text-center text-danger">{error}</h2>}
    {!isLoading && !error && <List data={data} query={query}/> }   
    </> 
    );
}

const EnhancedComponent=withHOC("Welcome to my site",Home);
export default EnhancedComponent;