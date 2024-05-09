import React, { useState, useEffect } from "react";
import "./contentScript.css";

// Icons
import CloseIcon from "../assets/svgs/CloseIcon";
import MinimizeIcon from "../assets/svgs/MinimizeIcon";
import Logo from "../assets/svgs/Logo";

// Components
import NoteBody from "../components/note/NoteBody";
import NoteFooter from "../components/note/NoteFooter";
import RatePopup from "../components/rate/RatePopup";

export default function ContentScript() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [showRateNote, setShowRateNote] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [popup, setPopup] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCodeRequired, setAccessCodeRequired] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  let lastUrl = null;

  // Function to handle URL changes
  const handleURLChange = () => {
    const url = window.location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      chrome?.runtime?.sendMessage(
        { action: "checkURL", url: url },
        (response) => {
          // Use the response to determine whether to show the popup
          setPopupVisible(response.data.showPopup);
          if (response.data.showPopup) {
            setPopup(response.data.message);
          }
        }
      );
    }
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    chrome.runtime.sendMessage(
      { action: "hideNote", noteId: popup?._id },
      (response) => {
        if (response.error) {
          // Handle the error, e.g., display an error message
          console.error("Error undisliking the note:", response.error);
        }
      }
    );
  };

  // Function to minimize the popup
  const handleMinimizePopup = () => {
    setMinimized(true);
  };

  const handleHoverPopup = () => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
    }
  };

  const handleLeavePopup = () => {
    setShowLoginPopup(false);
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "isAuthenticated" }, (response) => {
      setIsAuthenticated(response.data);
      setHasAccess(response.hasAccess);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "accessCodeRequired" }, (response) => {
      setAccessCodeRequired(response.data.data);
    });
  }, []);

  useEffect(() => {
    // Set up a MutationObserver to detect changes in the body element
    const observer = new MutationObserver((mutations) => {
      handleURLChange();
    });

    // Start observing the body element for changes in child elements
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Delay the initial check slightly to allow SPAs to complete their initial routing
    const timeoutId = setTimeout(handleURLChange, 100);

    // Clean up
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {popupVisible && (
        <div
          className={`universal_notes_popup_container ${
            minimized ? "universal_notes_popup_minimized" : null
          }`}
        >
          <div
            className={`universal_notes_header ${
              minimized ? "universal_notes_header_minimized" : ""
            }`}
            onClick={() => minimized && setMinimized(false)}
          >
            <div className="universal_notes_title_container">
              <Logo
                width={22}
                height={22}
                color={""}
                style={minimized ? { cursor: "pointer" } : {}}
              />
              {!minimized && (
                <h2 className="universal_notes_title">
                  UniversalNotes Contributors added context
                </h2>
              )}
            </div>
            <div className="universal_notes_window_button_container">
              {!minimized && (
                <button
                  className="universal_notes_window_button"
                  tabIndex={0}
                  onClick={handleMinimizePopup}
                >
                  <MinimizeIcon />
                </button>
              )}
              <button
                className="universal_notes_window_button"
                tabIndex={0}
                onClick={handleClosePopup}
                onMouseEnter={handleHoverPopup}
                onMouseLeave={handleLeavePopup}
              >
                <CloseIcon />
              </button>
              {showLoginPopup && (
                <div className={"universal_notes_close_button_hover_popup"}>
                  <p>Hide permanently by logging in</p>
                </div>
              )}
            </div>
          </div>
          {!minimized && (
            <div className="universal_notes_content">
              <div className="universal_notes_text">
                {accessCodeRequired && !hasAccess ? (
                  <p className="universal_notes_access_code_warning_text">
                    To view this note, enter an access code in the extension.{" "}
                    {"\n\n"}
                    Learn more at{" "}
                    <a
                      href="https://universalnotes.org/access-code-needed"
                      target="_blank"
                      className="universalnotes-link"
                    >
                      universalnotes.org/access-code-required
                    </a>
                  </p>
                ) : (
                  <NoteBody body={popup.body} />
                )}
              </div>
            </div>
          )}
          {(accessCodeRequired && !hasAccess) || minimized ? null : (
            <NoteFooter
              note={popup}
              setNote={setPopup}
              setShowRateNote={setShowRateNote}
            />
          )}
        </div>
      )}
      {showRateNote && (
        <RatePopup
          note={popup}
          setNote={setPopup}
          setShowRateNote={setShowRateNote}
        />
      )}
    </div>
  );
}
