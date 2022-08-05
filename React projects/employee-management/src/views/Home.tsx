import React from 'react'
import {useAxios} from '../hooks/useAxios';
import EmployeeList from '../components/EmployeeList/EmployeeList';

function Home() {
    const [query, setQuery] = React.useState<string>('');
    const { data:employeeList, error, isLoading }=useAxios('')
    return (
    <section>
        {isLoading && <h2 style={{color:"white",textAlign:"center" }}>Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 style={{color:"red",textAlign:"center" }}>{error}</h2>}
        {!isLoading && !error && <EmployeeList employeeList={employeeList} query={query}/> }    
    </section>
    )
}

export default Home