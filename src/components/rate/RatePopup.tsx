import React, { useState, useEffect } from "react";
import "./RatePopup.css";

// Icons
import CloseIcon from "../../assets/svgs/CloseIcon";

// Config
import { config } from "../../config/config";

export default function RatePopup({ note, setNote, setShowRateNote }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "isAuthenticated" }, (response) => {
      setIsAuthenticated(response.data);
    });
  }, []);

  function like() {
    chrome.runtime.sendMessage(
      { action: "like", noteId: note?._id },
      (response) => {
        if (response.error) {
          // Handle the error, e.g., display an error message
          console.error("Error liking the note:", response.error);
        } else if (response.data?.note) {
          // Update the note state if there's no error and the note data is present
          setNote(response.data.note);
        }
      }
    );
  }

  function unlike() {
    chrome.runtime.sendMessage(
      { action: "unlike", noteId: note?._id },
      (response) => {
        if (response.error) {
          // Handle the error, e.g., display an error message
          console.error("Error unliking the note:", response.error);
        } else if (response.data?.note) {
          // Update the note state if there's no error and the note data is present
          setNote(response.data.note);
        }
      }
    );
  }

  function dislike() {
    chrome.runtime.sendMessage(
      { action: "dislike", noteId: note?._id },
      (response) => {
        if (response.error) {
          // Handle the error, e.g., display an error message
          console.error("Error disliking the note:", response.error);
        } else if (response.data?.note) {
          // Update the note state if there's no error and the note data is present
          setNote(response.data.note);
        }
      }
    );
  }

  function undislike() {
    chrome.runtime.sendMessage(
      { action: "undislike", noteId: note?._id },
      (response) => {
        if (response.error) {
          // Handle the error, e.g., display an error message
          console.error("Error undisliking the note:", response.error);
        } else if (response.data?.note) {
          // Update the note state if there's no error and the note data is present
          setNote(response.data.note);
        }
      }
    );
  }

  return (
    <div
      className="universal_notes_rate_popup_container"
      onClick={() => setShowRateNote(false)} // This triggers on clicks outside the popup content
    >
      <div
        className="universal_notes_rate_popup"
        onClick={(e) => e.stopPropagation()} // This stops propagation of clicks within the popup
      >
        {/* header */}
        <div className="universal_notes_rate_popup_header">
          <h2 className="universal_notes_rate_popup_title">Rate this note</h2>
          <div className="universal_notes_window_button_container">
            <button
              className="universal_notes_window_button"
              tabIndex={0}
              onClick={() => setShowRateNote(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        {/* footer */}
        <div className="universal_notes_rate_popup_footer">
          <p className="universal_notes_rate_popup_footer_title">
            Is this note helpful?
          </p>
          {/* <div className="universal_notes_rate_popup_footer_buttons">
            <button className="universal_notes_rate_popup_footer_button">
              Yes
            </button>
            <button className="universal_notes_rate_popup_footer_button">
              No
            </button>
          </div> */}
          <div className="universal_notes_rate_popup_footer_buttons">
            <div className="note-footer-button-container">
              {isAuthenticated ? (
                <button
                  className={`universal_notes_rate_popup_footer_button ${
                    note?.isLiked
                      ? "universal_notes_rate_popup_footer_liked_button"
                      : ""
                  }`}
                  onClick={() => {
                    note && note?.isLiked ? unlike() : like();
                  }}
                >
                  Yes
                </button>
              ) : (
                <a
                  href={`${
                    config.environment === "development"
                      ? config.developmentClientURL
                      : config.productionClientURL
                  }/note/${note?._id}?action=like`}
                  target="_blank"
                >
                  <button className="universal_notes_rate_popup_footer_button">
                    Yes
                  </button>
                </a>
              )}
              <p className="note-footer-like-dislike-count">
                {note?.like_count}
              </p>
            </div>
            <div className="note-footer-button-container">
              {isAuthenticated ? (
                <button
                  className={`universal_notes_rate_popup_footer_button ${
                    note?.isDisliked
                      ? "universal_notes_rate_popup_footer_disliked_button"
                      : ""
                  }`}
                  onClick={() => {
                    note?.isDisliked ? undislike() : dislike();
                  }}
                >
                  No
                </button>
              ) : (
                <a
                  href={`${
                    config.environment === "development"
                      ? config.developmentClientURL
                      : config.productionClientURL
                  }/note/${note?._id}?action=dislike`}
                  target="_blank"
                >
                  <button className="universal_notes_rate_popup_footer_button">
                    No
                  </button>
                </a>
              )}
              <p className="note-footer-like-dislike-count">
                {note?.dislike_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
