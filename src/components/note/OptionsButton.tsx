import React, { useState } from "react";
import root from "react-shadow";
import styles from "./OptionsButton.shadow.css";

// Icons
import MenuIcon from "../../assets/svgs/Menu";

// Config
import { config } from "../../config/config";

export default function OptionsButton({
  note,
  handleClosePopup,
  handleHoverPopup,
  handleLeavePopup,
  minimized,
  setMinimized,
}) {
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
            <button
              className={"universal_notes_window_button_tooltip_item"}
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(!minimized);
                showTooltip && setShowTooltip(false);
              }}
            >
              {minimized ? "Maximize" : "Minimize"}
            </button>
            <button
              className={"universal_notes_window_button_tooltip_item"}
              tabIndex={0}
              onClick={handleClosePopup}
              onMouseEnter={handleHoverPopup}
              onMouseLeave={handleLeavePopup}
            >
              Hide note from this page
            </button>
            <a
              className={"universal_notes_window_button_tooltip_item"}
              onFocus={() => setShowTooltip(true)}
              target="_blank"
              tabIndex={0}
              href="mailto:universalnotesorg@gmail.com?subject=UniversalNotes%20Feedback&body=Thank%20you%20for%20providing%20feedback.%0D%0A%0D%0A"
            >
              <p className="universal_notes_window_button_tooltip_item_text">
                Report bug
              </p>
            </a>
            <a
              className={"universal_notes_window_button_tooltip_item"}
              onFocus={() => setShowTooltip(true)}
              target="_blank"
              tabIndex={0}
              href={`${
                config.environment === "development"
                  ? config.developmentClientURL
                  : config.productionClientURL
              }/note/${note?._id}`}
            >
              <p className="universal_notes_window_button_tooltip_item_text">
                More details
              </p>
            </a>
            {note?.isPostedBySelf && (
              <a
                className={"universal_notes_window_button_tooltip_item"}
                target="_blank"
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                tabIndex={0}
                // onClick={() => deleteNote(note._id)}
                href={`${
                  config.environment === "development"
                    ? config.developmentClientURL
                    : config.productionClientURL
                }/note/${note?._id}?action=delete`}
              >
                <p className="universal_notes_window_button_tooltip_item_red">
                  Delete
                </p>
              </a>
            )}
          </div>
        )}
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
