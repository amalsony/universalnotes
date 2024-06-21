import React, { useState } from "react";
import root from "react-shadow";
import styles from "./MenuButton.shadow.css";

// Icons
import MenuIcon from "../../../assets/svgs/Menu";

// Config
import { config } from "../../../config/config";

export default function MenuButton({ noteId, isPostedBySelf, deleteNote }) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <root.div>
      <div className="universal_notes_window_button_container">
        <button
          className={`universal_notes_window_button ${
            showTooltip && "button_active_background"
          }`}
          tabIndex={0}
          //   on click, show or hide tooltip
          onClick={() => {
            setShowTooltip(!showTooltip);
          }}
        >
          <MenuIcon color="#444" />
        </button>
        {showTooltip && (
          <div className="universal_notes_window_button_tooltip">
            <a
              className={"universal_notes_window_button_tooltip_item"}
              onFocus={() => setShowTooltip(true)}
              target="_blank"
              tabIndex={0}
              href={`${
                config.environment === "development"
                  ? config.developmentClientURL
                  : config.productionClientURL
              }/note/${noteId}`}
            >
              <p className="universal_notes_window_button_tooltip_item_text">
                More details
              </p>
            </a>
            {isPostedBySelf && (
              <button
                className={"universal_notes_window_button_tooltip_item"}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                tabIndex={0}
                onClick={() => deleteNote(noteId)}
              >
                <p className="universal_notes_window_button_tooltip_item_red">
                  Delete
                </p>
              </button>
            )}
          </div>
        )}
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
