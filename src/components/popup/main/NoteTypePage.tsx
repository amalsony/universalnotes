import React, { useState } from "react";
import "./NoteTypePage.css";

export default function NoteTypePage() {
  const [noteType, setNoteType] = useState("misleading");

  return (
    <div className="note_type_page_container">
      <div className="note_type_page_title_container">
        <p className="note_type_page_title">I believe this page is</p>
      </div>
      <div className="note_type_page_input_container">
        <div className="note_type_page_input_group">
          <input
            className="note_type_page_input"
            type="radio"
            value="misleading"
            name="note_type"
            defaultChecked
            onChange={(e) => setNoteType(e.target.value)}
          />
          <p className="note_type_page_input_text">Misleading</p>
        </div>
        <div className="note_type_page_input_group">
          <input
            className="note_type_page_input"
            type="radio"
            value="not misleading"
            name="note_type"
            onChange={(e) => setNoteType(e.target.value)}
          />
          <p className="note_type_page_input_text">Not Misleading</p>
        </div>
      </div>
    </div>
  );
}
