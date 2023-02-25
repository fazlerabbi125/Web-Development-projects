import React from 'react'
import {Outlet,Navigate} from 'react-router-dom';
import { useSelector} from 'react-redux'

function ProtectedRoutes() {
  const auth= useSelector((state) => state.authUser.userData);
  return (
    auth? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedRoutes;