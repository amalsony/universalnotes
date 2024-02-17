import React, { useState, useEffect } from "react";
import "./Profile.css";

// Axios
import axios from "axios";

// Config
import { config } from "../../../config/config";

// Context
import { usePopup } from "../../../context/popupContext";

export default function Profile() {
  const { userInfo, setUserInfo, accessCodeRequired } = usePopup();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleLogout = () => {
    axios
      .post(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/auth/logout`
      )
      .then((res) => {
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
            href={`${
              config.environment === "development"
                ? config.developmentAPIURL
                : config.productionAPIURL
            }/profile`}
            target="_blank"
            tabIndex={0}
          >
            <p className="main-authenticated-container-header-profile-tooltip-item-text">
              Manage my account
            </p>
          </a>
          {accessCodeRequired && (
            <a
              className={
                "main-authenticated-container-header-profile-tooltip-item"
              }
              onFocus={() => setShowTooltip(true)}
              href={`${
                config.environment === "development"
                  ? config.developmentAPIURL
                  : config.productionAPIURL
              }/profile/access-codes`}
              target="_blank"
              tabIndex={0}
            >
              <p className="main-authenticated-container-header-profile-tooltip-item-text">
                Access Codes
              </p>
            </a>
          )}
          <a
            className={
              "main-authenticated-container-header-profile-tooltip-item"
            }
            onFocus={() => setShowTooltip(true)}
            href="mailto:universalnotesorg@gmail.com?subject=UniversalNotes%20Feedback&body=Thank%20you%20for%20providing%20feedback.%0D%0A%0D%0AMessage:"
            target="_blank"
            tabIndex={0}
          >
            <p className="main-authenticated-container-header-profile-tooltip-item-text">
              Provide feedback
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
