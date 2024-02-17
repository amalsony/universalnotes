import React from "react";
import "./svg.css";

export default function Like({ height, width, color }) {
  return (
    <svg
      fill={color ? color : "#4285F4"}
      height={height ? height : "14px"}
      width={width ? width : "14px"}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
      className="universalnotes-svg"
    >
      <polygon points="283.7,298.7 283.7,0 198.3,0 198.3,298.7 70.3,298.7 241,512 411.7,298.7 " />
    </svg>
  );
}
