import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';
import { useSelector} from 'react-redux'

function TrainerRoutes() {
    const auth= useSelector((state) => state.authUser.userData);
    if (!auth) return <Navigate to="/login"/>
    return (
        auth.role==='trainer'? <Outlet/> : <Navigate to="/"/>
    )
}

export default TrainerRoutes
