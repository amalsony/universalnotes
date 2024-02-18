import React, { useState, useEffect } from "react";
import "./popup.css";

// Axios
import axios from "axios";

// Config
import { config } from "../config/config";

// Context
import { usePopup } from "../context/popupContext";

// Components
import LoginScreen from "../components/popup/LoginScreen";
import Main from "../components/popup/main/Main";
import AccessCodeScreen from "../components/popup/AccessCodeScreen";
import LoadingScreen from "../components/popup/LoadingScreen";

const Popup = () => {
  const { userInfo, setUserInfo, accessCodeRequired, setAccessCodeRequired } =
    usePopup();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/auth/me`
      )
      .then((res) => {
        setUserInfo(res.data);
        setLoading(false);
      });

    axios
      .get(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/auth/access-code-required`
      )
      .then((res) => {
        setAccessCodeRequired(res.data.data);
      });
  }, []);

  return (
    <div className="popup-container">
      {loading ? (
        <LoadingScreen />
      ) : userInfo ? (
        !accessCodeRequired || userInfo?.hasAccess ? (
          <Main />
        ) : (
          <AccessCodeScreen />
        )
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default Popup;
