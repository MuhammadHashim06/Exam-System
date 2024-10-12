import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedGaurd() {
   const userdata = JSON.parse(sessionStorage.getItem('userdata'))

    if(userdata != undefined){
        return <Outlet/>
    }else {
        return <Navigate to='/'/>
    }
  
}
