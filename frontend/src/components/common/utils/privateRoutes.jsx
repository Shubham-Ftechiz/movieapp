import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {

      let auth = localStorage.getItem("token");
    return(
        auth !== 'null' ? <Outlet/>: <Navigate to ='/login'/>
    )
}

export default PrivateRoutes;