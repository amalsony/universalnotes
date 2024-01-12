import React, { useState } from "react";
import "./popup.css";

// Components
import PostInput from "../components/post-input/PostInput";

const Popup = () => {
  return (
    <div className="flex flex-col justify-center h-[22rem] w-[36rem]">
      <PostInput />
    </div>
  );
};

export default Popup;
