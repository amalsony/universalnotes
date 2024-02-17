import React from "react";
import "./Logo.css";
import LogoSVG from "../svgs/Logo";

export default function Logo({ ...props }) {
  return (
    <div>
      <a
        href="https://www.universalnotes.org"
        target="_blank"
        rel="noreferrer"
        className="logo-container"
      >
        <LogoSVG width={22} height={22} color={"#000"} />
        <h1 className="logo-title">UniversalNotes</h1>
      </a>
    </div>
  );
}
