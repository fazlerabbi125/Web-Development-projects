import {status} from "../utils/constants"

const SearchForm = ({query,handleQuery}) => {
    return ( 
            <div className="mb-4 mx-auto search-form"> 
            <input type="search" name="search" className="search-form__input" value={query.search}
            placeholder="Search" onChange={handleQuery}/>
            <select name="filter" onChange={handleQuery} className="search-form__select" value={query.filter}>
                <option  value="">Choose a filter</option>
                <option value="title" >Title</option>
                <option value="year" >Year</option>
                <option value="genre" >Genre</option>
                <optgroup label="Status">
                    {status.map(value=><option value={value.val} key={value.val}>{value.val}</option>)}
                </optgroup>
            </select>
            </div>
     );
}
 
export default SearchForm;