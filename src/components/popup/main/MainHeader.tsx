import React, { useState, useEffect } from "react";
import "./MainHeader.css";

// Context
import { usePopup } from "../../../context/popupContext";

// Components
import Logo from "../../../assets/general/Logo";
import Profile from "./Profile";

export default function MainHeader() {
  const { userInfo } = usePopup();

  return (
    <div className="main-authenticated-container-header">
      <div className="main-authenticated-container-header-logo">
        <Logo />
      </div>
      <Profile />
    </div>
  );
}
