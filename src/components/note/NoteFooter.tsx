import React, { useState, useEffect } from "react";
import "./NoteFooter.css";

// axios
import axios from "axios";

// Config
import { config } from "../../config/config";

// Components
import Like from "../../assets/svgs/Like";
import Dislike from "../../assets/svgs/Dislike";

export default function NoteFooter({ note, setNote }) {
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
    <div className="note-footer-container">
      <div className="note-footer-container-main">
        <div className="note-footer-container-left">
          <p className="note-footer-title">Is this note helpful?</p>
          <div className="note-footer-container-links">
            <a
              href={`${
                config.environment === "development"
                  ? config.developmentAPIURL
                  : config.productionAPIURL
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
                    ? config.developmentAPIURL
                    : config.productionAPIURL
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
              Provide feedback
            </a>
          </div>
        </div>
        <div className="note-footer-container-right">
          <div className="note-footer-button-container">
            {isAuthenticated ? (
              <button
                className={`note-footer-button ${
                  note?.isLiked ? "note-liked-button" : ""
                }`}
                onClick={() => {
                  note && note?.isLiked ? unlike() : like();
                }}
              >
                <Like height="14" width="14" color="#fc035a" />
              </button>
            ) : (
              <a
                href={`${
                  config.environment === "development"
                    ? config.developmentAPIURL
                    : config.productionAPIURL
                }/note/${note?._id}?action=like`}
                target="_blank"
              >
                <button className="note-footer-button">
                  <Like height="14" width="14" color="#fc035a" />
                </button>
              </a>
            )}
            <p className="note-footer-like-dislike-count">{note?.like_count}</p>
          </div>
          <div className="note-footer-button-container">
            {isAuthenticated ? (
              <button
                className={`note-footer-button ${
                  note?.isDisliked ? "note-disliked-button" : ""
                }`}
                onClick={() => {
                  note?.isDisliked ? undislike() : dislike();
                }}
              >
                <Dislike height="14" width="14" color="#4285F4" />
              </button>
            ) : (
              <a
                href={`${
                  config.environment === "development"
                    ? config.developmentAPIURL
                    : config.productionAPIURL
                }/note/${note?._id}?action=dislike`}
                target="_blank"
              >
                <button className="note-footer-button">
                  <Dislike height="14" width="14" color="#4285F4" />
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
  );
}
