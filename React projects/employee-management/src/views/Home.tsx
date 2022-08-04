import React from 'react'
import Layout from '../components/Layout'
import {useAxios} from '../hooks/useAxios';
import EmployeeList from '../components/EmployeeList/EmployeeList';

function Home() {
    const [query, setQuery] = React.useState<string>('');
    const { data:employeeList, error, isLoading }=useAxios('')
    console.log(employeeList);
    return (
    <Layout>
        {isLoading && <h2 style={{color:"white",textAlign:"center" }}>Loading <i className="fa fa-spinner fa-spin"></i></h2>}
        {error && <h2 style={{color:"red",textAlign:"center" }}>{error}</h2>}
        {!isLoading && !error && <EmployeeList employeeList={employeeList} query={query}/> }    
    </Layout>
    )
}

export default Home