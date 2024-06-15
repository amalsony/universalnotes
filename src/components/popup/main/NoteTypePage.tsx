import React from "react";

export default function NoteTypePage() {
  return (
    <div className="note_type_page_container">
      <div className="note_type_page_title_container">
        <p className="note_type_page_title">I believe this page is</p>
      </div>
      <div className="note_type_page_button_container">
        <input className="note_type_page_button" type="radio">
          misleading
        </input>
        <input className="note_type_page_button" type="radio">
          not misleading
        </input>
      </div>
    </div>
  );
}
