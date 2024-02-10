import React, { useState, useEffect } from "react";
import "./contentScript.css";

// Icons
import CloseIcon from "../assets/svgs/CloseIcon";
import Logo from "../assets/svgs/Logo";
import NoteBody from "../components/note/NoteBody";

export default function ContentScript() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popup, setpopup] = useState(null);
  let lastUrl = null;

  // Function to handle URL changes
  const handleURLChange = () => {
    const url = window.location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log("Page has navigated to:", url);
      chrome?.runtime?.sendMessage(
        { action: "checkURL", url: url },
        (response) => {
          // Use the response to determine whether to show the popup
          setPopupVisible(response.data.showPopup);
          if (response.data.showPopup) {
            setpopup(response.data.message);
          }
        }
      );
    }
  };

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
            popupVisible ? "visible" : ""
          }`}
        >
          <div className="universal_notes_header">
            <div className="universal_notes_title_container">
              <Logo width={22} height={22} color={""} />
              <h2 className="universal_notes_title">
                UniversalNotes Contributors added context
              </h2>
            </div>
            <button
              className="universal_notes_close_button"
              onClick={() => setPopupVisible(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="universal_notes_content">
            <div className="universal_notes_text">
              <NoteBody body={popup.body} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
