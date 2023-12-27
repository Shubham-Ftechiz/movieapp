import React from "react";
import "./dashboard.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logoutImage from "../../images/logout_icon.svg";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const createeditmovie = (selector) => {
    if (selector === "addNewMovie") {
      navigate("/createeditmovie",{state:{name:selector}});
    }
    else {
      navigate("/createeditmovie",{state:{name:selector}}); 
    }
  }

  return (
    <div className="mainDashboard">
      <div className="wrapLogout">
        <div className="clickableLogout" onClick={handleLogout}>
          <div className="logoutTxt">Logout</div>
          <img className="imageLogout" src={logoutImage} alt="image"/>
        </div>
      </div>
      <div className="dashboardContent">
        <div className="dashboardTxt">Your movie list is empty</div>
        <div className="addMoviesBtn">
          <Button
            type="primary"
            className="add-new-movie-button"
            onClick={()=> createeditmovie("addNewMovie")}
            >
              Add a new movie
          </Button>
          <Button
            type="primary"
            className="edit-new-movie-button"
            onClick={() => createeditmovie("editNewMovie")}>
              Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
