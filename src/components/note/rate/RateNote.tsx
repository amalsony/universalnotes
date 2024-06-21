import React, { useState } from "react";
import root from "react-shadow";
import styles from "./RateNote.shadow.css";

// Config
import { config } from "../../../config/config";

// Components
import NoteBody from "../NoteBody";
import MenuButton from "./MenuButton";

export default function RateNote({ noteData, isAuthenticated, deleteNote }) {
  const [note, setNote] = useState(noteData);

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
      <div className="universal_notes_rate_popup_main_note">
        <div className="universal_notes_rate_popup_main_note_body">
          <div className="universal_notes_rate_popup_main_text">
            <NoteBody body={note?.body} />
          </div>
          <div className="universal_notes_rate_popup_main_note_body_right">
            <MenuButton
              noteId={note?._id}
              isPostedBySelf={note?.isPostedBySelf}
              deleteNote={deleteNote}
            />
          </div>
        </div>
        {/* footer */}
        <div className="universal_notes_rate_popup_note_footer">
          <p className="universal_notes_rate_popup_note_footer_title">
            Is this note helpful?
          </p>
          <div className="universal_notes_rate_popup_note_footer_buttons">
            <div className="note-footer-button-container">
              {isAuthenticated ? (
                <button
                  className={`universal_notes_rate_popup_note_footer_button ${
                    note?.isLiked
                      ? "universal_notes_rate_popup_note_footer_liked_button"
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
                  <button className="universal_notes_rate_popup_note_footer_button">
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
                  className={`universal_notes_rate_popup_note_footer_button ${
                    note?.isDisliked
                      ? "universal_notes_rate_popup_note_footer_disliked_button"
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
                  <button className="universal_notes_rate_popup_note_footer_button">
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
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
