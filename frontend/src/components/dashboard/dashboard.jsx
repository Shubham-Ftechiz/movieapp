import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logoutImage from "../../images/logout_icon.svg";
import addIcon from "../../images/add_icon.svg";
import { DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../contants";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [callGetMovieAPIs, setCallGetMovieAPIs] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Get movie data from APIs
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getmovie`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("Check_response:",result)
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [callGetMovieAPIs]);

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

  const deleteMovie = async (id) => {
    const payload = {
      id: id,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/deletemovie`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Checking_logs:", result);

      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });

      setCallGetMovieAPIs(!callGetMovieAPIs);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mainDashboard">
      {data?.length > 0 ? (
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
            {data?.map((movieInfo, index) => (
              <div class="movieListCards">
                <img
                  src={movieInfo.movieimage}
                  /* src={`${BASE_URL}/uploads/${movieInfo.movieimage}`} */
                  alt="Your Image"
                  id="alignMovieImage"
                />
                <div className="alignTxtMovie">
                  <div id="movieTxtName">{movieInfo.moviename}</div>
                  <div id="movieYear">{movieInfo.publishedyear}</div>
                  <DeleteOutlined
                    className="deleteIcon"
                    onClick={() => deleteMovie(movieInfo._id)}
                  />
                </div>
              </div>
            ))}
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
              {/* <Button
                type="primary"
                className="edit-new-movie-button"
                onClick={() => createeditmovie("editNewMovie")}>
                Edit
              </Button> */}
            </div>
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Dashboard;
