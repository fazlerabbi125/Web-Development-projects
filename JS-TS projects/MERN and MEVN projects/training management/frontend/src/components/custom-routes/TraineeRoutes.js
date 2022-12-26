import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';
import { useSelector} from 'react-redux'

const TraineeRoutes = () => {
    const auth= useSelector((state) => state.authUser.userData);
    if (!auth) return <Navigate to="/login"/>
    return (
        auth.role==='trainee'? <Outlet/> : <Navigate to="/"/>
    )
}

export default TraineeRoutes