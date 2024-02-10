import React from "react";
import "./Main.css";

// Context
import { usePopup } from "../../../context/popupContext";

// Axios
import axios from "axios";

// Components
import PostInput from "../../post-input/PostInput";
import MainHeader from "./MainHeader";

export default function Main() {
  const { userInfo, setUserInfo } = usePopup();

  const handleLogout = () => {
    axios.post("http://localhost:8000/auth/logout").then((res) => {
      if (res.status === 200) {
        setUserInfo(null);
      }
    });
  };

  return (
    <div className="main-authenticated-container">
      <MainHeader />
      <PostInput />
      {/* <div className="main-authenticated-container-footer">
        <button
          className="main-authenticated-container-footer-logout-button"
          onClick={handleLogout}
        >
          Manage my account
        </button>
        <button
          className="main-authenticated-container-footer-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div> */}
    </div>
  );
}
