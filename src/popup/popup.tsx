import React, { useState, useEffect } from "react";
import "./popup.css";

// Axios
import axios from "axios";

// Context
import { usePopup } from "../context/popupContext";

// Components
import LoginScreen from "../components/popup/LoginScreen";
import Main from "../components/popup/main/Main";
import LoadingScreen from "../components/popup/LoadingScreen";

const Popup = () => {
  const { userInfo, setUserInfo } = usePopup();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/auth/me").then((res) => {
      setUserInfo(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="popup-container">
      {loading ? <LoadingScreen /> : userInfo ? <Main /> : <LoginScreen />}
    </div>
  );
};

export default Popup;
