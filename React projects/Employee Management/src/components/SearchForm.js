const SearchForm = ({setQuery}) => {
    return ( 
        <div className="search-form">
            <input type="text" name="search" placeholder="Search by id, name, dept, or position" onChange={(e) => setQuery(e.target.value)}/>
        </div>
     );
}
 
export default SearchForm;