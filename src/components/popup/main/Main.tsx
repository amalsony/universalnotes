import React, { useState } from "react";
import "./Main.css";

// Context
import { usePopup } from "../../../context/popupContext";

// Axios
import axios from "axios";

// Components
import PostInput from "../post-input/PostInput";
import MainHeader from "./MainHeader";
import NoteTypePage from "./NoteTypePage";

export default function Main() {
  const [popupStep, setPopupStep] = useState(1);

  return (
    <div className="main-authenticated-container">
      <MainHeader />
      {popupStep === 1 ? <PostInput /> : <NoteTypePage />}
    </div>
  );
}
