import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { message, Upload, Space } from "antd";
import "./createditemovie.scss";
import uploadIcon from "../../images/downloadicon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import logoutImage from "../../images/logout_icon.svg";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const CreateEditMovie = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onSubmit = (values) => {
    console.log("Check_value:", values);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cancelBtn = () => {
    navigate("/dashboard");
  }

  const uploadButton =
    location.state.name === "addNewMovie" ? (
      <div>
        {loading ? <LoadingOutlined /> : <img src={uploadIcon} alt="image" />}
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "white",
          }}>
          Drop an image here
        </div>
      </div>
    ) : (
      <div>
        {loading ? <LoadingOutlined /> : <img src={uploadIcon} alt="image" />}
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: "white",
          }}>
          Drop other image here
        </div>
      </div>
    );
  return (
    <>
      <div className="wrapLogout">
        <div className="clickableLogout" onClick={handleLogout}>
          <div className="logoutTxt">Logout</div>
          <img className="imageLogout" src={logoutImage} alt="image" />
        </div>
      </div>
      <div className="mainCreateMovie">
        {location.state.name === "addNewMovie" ? (
          <div className="createMovieTxt">Create a new movie</div>
        ) : (
          <div className="createMovieTxt">Edit</div>
        )}
        <div className="createMovieContent">
          <div className="uploadImage">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>

          {/* Title publish submit and cancel button */}

          <div className="uploadImageField">
            <Form
              name="normal_upload"
              className="upload-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onSubmit}>
              <Form.Item name="title">
                <Input className="uploadTitleText" placeholder="Title" />
              </Form.Item>
              <Form.Item name="publishedYear" className="publishedYearAlign">
                <Input
                  className="publishedYear"
                  type="text"
                  placeholder="Publishing year"
                />
              </Form.Item>

              <div className="updateBtnHandle">
                <Button
                  type="primary"
                  className="cancel-submit-form-button"
                  id="cancelBtn"
                  onClick={cancelBtn}>
                  Cancel
                </Button>

                {location.state.name === "addNewMovie" ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="cancel-submit-form-button"
                    id="submitBtn">
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="cancel-submit-form-button"
                    id="submitBtn">
                    Update
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateEditMovie;
