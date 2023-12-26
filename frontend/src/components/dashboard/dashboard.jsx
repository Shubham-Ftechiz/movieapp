import React from "react";
import "./dashboard.scss";

import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="mainDashboard">
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
