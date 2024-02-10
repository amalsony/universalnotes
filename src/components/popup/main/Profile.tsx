import React, { useState, useEffect } from "react";
import "./Profile.css";

// Axios
import axios from "axios";

// Context
import { usePopup } from "../../../context/popupContext";

export default function Profile() {
  const { userInfo, setUserInfo } = usePopup();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleLogout = () => {
    axios.post("http://localhost:8000/auth/logout").then((res) => {
      if (res.status === 200) {
        setUserInfo(null);
      }
    });
  };

  return (
    <div
      className="main-authenticated-container-header-profile"
      //   on hover or focus, show tooltip
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      tabIndex={0}
    >
      <img
        src={userInfo?.profilePic}
        alt="profile"
        className="main-authenticated-container-header-profile-image"
      />
      {showTooltip && (
        <div className="main-authenticated-container-header-profile-tooltip">
          <a
            className={
              "main-authenticated-container-header-profile-tooltip-item"
            }
            onFocus={() => setShowTooltip(true)}
            tabIndex={0}
          >
            <p className="main-authenticated-container-header-profile-tooltip-item-text">
              Manage my account
            </p>
          </a>
          <button
            className={
              "main-authenticated-container-header-profile-tooltip-item"
            }
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            tabIndex={0}
            onClick={handleLogout}
          >
            <p className="main-authenticated-container-header-profile-tooltip-item-logout">
              Logout
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
