import React, { useState } from "react";
import "./Main.css";

// Context
import { usePopup } from "../../../context/popupContext";

// Axios
import axios from "axios";

// Components
import PostInput from "../post-input/PostInput";
import MainHeader from "./MainHeader";

export default function Main() {
  const [popupStep, setPopupStep] = useState(2);

  return (
    <div className="main-authenticated-container">
      <MainHeader />
      <PostInput />
    </div>
  );
}
