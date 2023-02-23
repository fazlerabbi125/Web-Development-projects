import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';
import { useSelector} from 'react-redux'


const AdminRoutes = () => {
    const auth= useSelector((state) => state.authUser.userData);
    if (!auth) return <Navigate to="/login"/>
    return (
        auth.role==='admin'? <Outlet/> : <Navigate to="/"/>
    )
}

export default AdminRoutes;