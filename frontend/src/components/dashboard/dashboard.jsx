import React, {useState, useEffect} from "react";
import "./dashboard.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import logoutImage from "../../images/logout_icon.svg";
import addIcon from "../../images/add_icon.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("DataTOken:",token)
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getmovie', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // You may need to adjust the content type based on your API
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

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

            {data?.map((movieInfo, index)=>
              <div class="movieListCards">
              <img src={movieInfo.movieimage} alt="Your Image" id="alignMovieImage"/>
              <div className="alignTxtMovie">
                <div id="movieTxtName">{movieInfo.moviename}</div>
                <div id="movieYear">{movieInfo.publishedyear}</div>
              </div>
              </div>
            )}
            
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
