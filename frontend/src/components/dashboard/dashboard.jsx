import React from "react";
import "./dashboard.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logoutImage from "../../images/logout_icon.svg";
import addIcon from "../../images/add_icon.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const movieList = [
    [
      {
        _id: "658c755beeb95616a30e8ce1",
        moviename: "Fast and Furious",
        publishedyear: "2019",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-27T19:04:59.920Z",
        __v: 0,
      },
      {
        _id: "658c75bbc915a7a9c35d0090",
        moviename: "Dhamal",
        publishedyear: "2020",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-27T19:06:35.247Z",
        __v: 0,
      },
      {
        _id: "658c7868c19946f0879535bd",
        moviename: "K2",
        publishedyear: "2020",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-27T19:18:00.224Z",
        __v: 0,
      },
      {
        _id: "658d120497125ebb6a970dd5",
        moviename: "Animal",
        publishedyear: "2023",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-28T06:13:24.219Z",
        __v: 0,
      },
      {
        _id: "658d242482c9811d6047248b",
        moviename: "AntMan",
        publishedyear: "2020",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-28T07:30:44.942Z",
        __v: 0,
      },
      {
        _id: "658d248982c9811d6047248f",
        moviename: "TopGun",
        publishedyear: "2023",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-28T07:32:25.836Z",
        __v: 0,
      },
      {
        _id: "658d4e822b750460e9dbc852",
        moviename: "Ninja",
        publishedyear: "2022",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-28T10:31:30.792Z",
        __v: 0,
      },
      {
        _id: "658d4e8c2b750460e9dbc855",
        moviename: "Facebook",
        publishedyear: "2022",
        movieimage: "https://t.ly/IS-Yz",
        date: "2023-12-28T10:31:40.134Z",
        __v: 0,
      },
    ],
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const createeditmovie = (selector) => {
    if (selector === "addNewMovie") {
      navigate("/createeditmovie", { state: { name: selector } });
    } else {
      navigate("/createeditmovie", { state: { name: selector } });
    }
  };

  return (
    <div className="mainDashboard">
      {movieList.length > 0 ? (
        <div className="movieList">
          <div className="wrapLogoutMovieList">
            <div className="clickableLogout" onClick={handleLogout}>
              <div className="logoutTxt">Logout</div>
              <img className="imageLogout" src={logoutImage} alt="image" />
            </div>
          </div>

          <div className="dashboardContentMovieList">
            <div className="dashboardTxtMyMovies">
              <div className="myMovieTxt">My movies</div>
              <div className="imgAdd">
                <img
                  className="imgAddMovie"
                  src={addIcon}
                  alt="image"
                  onClick={() => createeditmovie("addNewMovie")}
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="movieListCardsMain">
            <div className="movieListCards">
              <div className="movieListImgTxt">
                <img src="https://t.ly/IS-Yz" alt="img" id="alignMovieImage" />
                <div className="movienameyear">
                  <div id="movieTxtName">Aquaman</div>
                  <div id="movieYear">2023</div>
                </div>
              </div>

              {/* <div className="movieListImgTxt">
                <img src="https://t.ly/IS-Yz" alt="img" id="alignMovieImage" />
                <div className="movienameyear">
                  <div id="movieTxtName">Aquaman</div>
                  <div id="movieYear">2023</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="wrapLogout">
            <div className="clickableLogout" onClick={handleLogout}>
              <div className="logoutTxt">Logout</div>
              <img className="imageLogout" src={logoutImage} alt="image" />
            </div>
          </div>
          <div className="dashboardContent">
            <div className="dashboardTxt">Your movie list is empty</div>
            <div className="addMoviesBtn">
              <Button
                type="primary"
                className="add-new-movie-button"
                onClick={() => createeditmovie("addNewMovie")}>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
