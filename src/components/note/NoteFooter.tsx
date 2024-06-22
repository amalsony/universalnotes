import React, { useState, useEffect } from "react";
import root from "react-shadow";
import styles from "./NoteFooter.shadow.css";

// axios
import axios from "axios";

// Config
import { config } from "../../config/config";

// Components
import Like from "../../assets/svgs/Like";
import Dislike from "../../assets/svgs/Dislike";
import NoteFooterButtons from "./NoteFooterButtons";

export default function NoteFooter({ note, setNote, setShowRateNote }) {
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
    <root.div>
      <div className="note-footer-container">
        <div className="note-footer-container-main">
          <div className="note-footer-container-left">
            <p className="note-footer-title">Is this note helpful?</p>
            {/* <div className="note-footer-container-links">
                <a
                  href={`${
                    config.environment === "development"
                      ? config.developmentClientURL
                      : config.productionClientURL
                  }/note/${note?._id}`}
                  target="_blank"
                  className="note-footer-container-links-link"
                >
                  More Details
                </a>
                {note?.isPostedBySelf && (
                  <a
                    href={`${
                      config.environment === "development"
                        ? config.developmentClientURL
                        : config.productionClientURL
                    }/note/${note?._id}?action=delete`}
                    target="_blank"
                    className="note-footer-container-links-link"
                  >
                    Delete note
                  </a>
                )}
                <a
                  href={
                    "mailto:universalnotesorg@gmail.com?subject=UniversalNotes%20Feedback&body=Thank%20you%20for%20providing%20feedback.%0D%0A%0D%0AMessage:"
                  }
                  target="_blank"
                  className="note-footer-container-links-link"
                >
                  Report bug / Provide feedback
                </a>
              </div> */}
          </div>
          <div className="note-footer-container-right">
            {/* <NoteFooterButtons
            {...{ note, isAuthenticated, like, unlike, dislike, undislike }}
          /> */}
            <div className="note-footer-rate-button-container">
              {/* {isAuthenticated && ( */}
              <button
                className={`note-footer-rate-button`}
                onClick={() => setShowRateNote(true)}
              >
                Rate it
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
