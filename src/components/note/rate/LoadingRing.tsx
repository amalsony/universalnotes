import React from "react";
import root from "react-shadow";
import styles from "./LoadingRing.shadow.css";

export default function LoadingRing() {
  return (
    <root.div>
      <div className="universal_notes_loading_ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
