import React, { useState } from "react";
import "./NoteTypePage.css";

// Context
import { usePopup } from "../../../context/popupContext";

export default function NoteTypePage() {
  const { isAgainstContext, setIsAgainstContext } = usePopup();

  return (
    <div className="note_type_page_container">
      <div className="note_type_page_title_container">
        <p className="note_type_page_title">I believe this page is</p>
      </div>
      <div className="note_type_page_input_container">
        <div className="note_type_page_input_group">
          <input
            className="note_type_page_input"
            id="misleading"
            type="radio"
            value="misleading"
            name="note_type"
            defaultChecked
            onChange={(e) => {
              if (e.target.checked) {
                setIsAgainstContext(false); // When the user checks this box, isAgainstContext is set to false
                console.log(isAgainstContext);
              }
            }}
          />
          <label className="note_type_page_input_text" htmlFor="misleading">
            Misleading
          </label>
        </div>
        <div className="note_type_page_input_group">
          <input
            className="note_type_page_input"
            id="not_misleading"
            type="radio"
            value="not misleading"
            name="note_type"
            onChange={(e) => {
              if (e.target.checked) {
                setIsAgainstContext(true); // When the user checks this box, isAgainstContext is set true
                console.log(isAgainstContext);
              }
            }}
          />
          <label className="note_type_page_input_text" htmlFor="not_misleading">
            Not Misleading
          </label>
        </div>
      </div>
    </div>
  );
}
