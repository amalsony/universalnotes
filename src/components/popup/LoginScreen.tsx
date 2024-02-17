import React from "react";
import "./LoginScreen.css";

// Config
import { config } from "../../config/config";

// Components
import Logo from "../../assets/general/Logo";
import ContinueWithGoogle from "../auth/ContinueWithGoogle";

export default function LoginScreen() {
  const handleLogin = () => {
    chrome.tabs.create({
      url: `https://www.universalnotes.org/api/auth/google`,
      selected: true,
      active: true,
    });
  };

  return (
    <div className="login-screen-container">
      <div className="login-screen-logo-container">
        <Logo width={22} height={22} color={"#000"} />
      </div>
      <ContinueWithGoogle onClick={handleLogin} />
    </div>
  );
}
