import React from "react";
import root from "react-shadow";
import styles from "./RateFooter.shadow.css";

export default function RateFooter() {
  return (
    <root.div>
      {/* Write a note section */}
      <div className="universal_notes_rate_popup_footer">
        <p className="universal_notes_rate_popup_footer_title">
          See anything you'd like to improve?
        </p>
        <ul className="universal_notes_rate_popup_footer_instructions">
          <li className="universal_notes_rate_popup_footer_bullet">
            <p className="universal_notes_rate_popup_footer_bullet_text">
              Click on the UniversalNotes extension icon.
            </p>
          </li>
          <li className="universal_notes_rate_popup_footer_bullet">
            <p className="universal_notes_rate_popup_footer_bullet_text">
              Write an altnerative note or explain why additional context isn't
              needed and press
              <button className="universal_notes_rate_popup_footer_button">
                Next
              </button>
            </p>
          </li>
          <li className="universal_notes_rate_popup_footer_bullet">
            <p className="universal_notes_rate_popup_footer_bullet_text">
              Choose whether you believe{" "}
              <span className="universal_notes_italic">this page</span> is
              misleading or not misleading and press
              <button className="universal_notes_rate_popup_footer_button">
                Add Note
              </button>
            </p>
          </li>
        </ul>
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
