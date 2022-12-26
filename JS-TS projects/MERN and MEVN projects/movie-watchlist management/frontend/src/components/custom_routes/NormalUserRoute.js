import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';
import { useSelector} from 'react-redux'


const NormalUserRoute = () => {
    const auth= useSelector((state) => state.authUser.userData);
    if (!auth) return <Navigate to="/login"/>
    return (
        !auth.isAdmin? <Outlet/> : <Navigate to="/"/>
    )
}

export default NormalUserRoute;