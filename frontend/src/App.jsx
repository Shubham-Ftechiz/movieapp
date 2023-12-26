import React, { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import PrivateRoutes from "./components/common/utils/privateRoutes";
import { useNavigate } from "react-router-dom";
import Registeration from "./components/register";
import PageNotFound from "./view/pageNotFound";
import "./App.scss";
import login_bottom from "./images/commonBottom.png";

const App = () => {
  const [baseRoutes, setBaseRoutes] = useState(false);

  const navigate = useNavigate();

  if (localStorage.getItem("token") && window.location.pathname == "/") {
    navigate("/dashboard");
  }

  useEffect(() => {
    if (localStorage.getItem("token") && window.location.pathname === "/") {
      navigate("/dashboard");
    }
    else if (localStorage.getItem("token") && window.location.pathname === "/login") {
      navigate("/dashboard");
    }
    else if (!localStorage.getItem("token") && window.location.pathname === "/") {
      navigate("/login");
    }
    else {
      setBaseRoutes(true);
    }
    
  }, []);
  return (
    <div className="bg-imgcomm">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {baseRoutes === true && (
          <Route>
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Registeration />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        )}
        </Routes>
        <img className="bottomImage" src={login_bottom} alt="fireSpot"/>
    </div>
  );
};

export default App;
