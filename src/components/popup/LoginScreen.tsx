import React from "react";
import "./LoginScreen.css";

// Components
import Logo from "../general/Logo";
import ContinueWithGoogle from "../auth/ContinueWithGoogle";

export default function LoginScreen() {
  const handleLogin = () => {
    chrome.tabs.create({
      url: "http://localhost:8000/auth/google",
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
