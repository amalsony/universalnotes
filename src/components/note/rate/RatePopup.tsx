import React, { useState, useEffect } from "react";
import root from "react-shadow";
import styles from "./RatePopup.shadow.css";

// Icons
import CloseIcon from "../../../assets/svgs/CloseIcon";

// Axios
import axios from "axios";

// Config
import { config } from "../../../config/config";

// Components
import RateNote from "./RateNote";
import LoadingRing from "./LoadingRing";
import RateFooter from "./RateFooter";

export default function RatePopup({ setShowRateNote }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [notes, setNotes] = useState([]);
  const [notesAgainstContext, setNotesAgainstContext] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadingRing, setShowLoadingRing] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "isAuthenticated" }, (response) => {
      setIsAuthenticated(response.data);
    });
  }, []);

  // fetch proposed notes from the server through action "getProposedNotes"
  useEffect(() => {
    showLoading();
    setLoading(true);
    const query = new URLSearchParams({ url: window.location.href }).toString();
    chrome.runtime.sendMessage(
      { action: "getProposedNotes", url: window.location.href },
      (response) => {
        if (response.data) {
          setNotes(response.data.data?.notesWithContext);
          setNotesAgainstContext(response.data.data?.notesAgainstContext);
          setLoading(false);
        } else if (response.error) {
          console.error("Error fetching proposed notes:", response.error);
          setLoading(false);
        }
      }
    );
  }, []);

  // Show loading ring after 1.2 seconds
  function showLoading() {
    setTimeout(() => {
      if (loading) {
        setShowLoadingRing(true);
      }
    }, 1200);
  }

  // Delete Note
  function deleteNote(noteId) {
    chrome.runtime.sendMessage({ action: "deleteNote", noteId }, (response) => {
      if (response.error) {
        console.error("Error deleting the note:", response.error);
      } else if (response.data) {
        // Filter the deleted note from either notes or notesAgainstContext
        setNotes((notes) => notes.filter((note) => note._id !== noteId));
        setNotesAgainstContext((notesAgainstContext) =>
          notesAgainstContext.filter((note) => note._id !== noteId)
        );
      }
    });
  }

  return (
    <root.div>
      <div
        className="universal_notes_rate_popup_container"
        onClick={() => setShowRateNote(false)} // This triggers on clicks outside the popup content
      >
        {showLoadingRing ? (
          <div className="universal_notes_rate_popup_loading_container">
            <LoadingRing />
          </div>
        ) : (
          !loading && (
            <div
              className="universal_notes_rate_popup"
              onClick={(e) => e.stopPropagation()} // This stops propagation of clicks within the popup
            >
              {/* header */}
              <div className="universal_notes_rate_popup_header">
                <h2 className="universal_notes_rate_popup_title"></h2>
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
              {/* main */}
              <div className="universal_notes_rate_popup_main_container">
                <div className="universal_notes_rate_popup_main">
                  <h2 className="universal_notes_rate_popup_main_title">
                    Notes suggesting context to be added to this page
                  </h2>

                  <div className="universal_notes_rate_popup_main_notes">
                    {notes.map((note) => (
                      <RateNote
                        key={note._id}
                        noteData={note}
                        isAuthenticated={isAuthenticated}
                        deleteNote={deleteNote}
                      />
                    ))}
                  </div>
                </div>
                {notesAgainstContext.length > 0 && (
                  <div className="universal_notes_rate_popup_main">
                    <h2 className="universal_notes_rate_popup_main_no_context_title">
                      Notes explaining why added context isn't needed
                    </h2>
                    <div className="universal_notes_rate_popup_main_notes">
                      {notesAgainstContext.map((note) => (
                        <RateNote
                          key={note._id}
                          noteData={note}
                          isAuthenticated={isAuthenticated}
                          deleteNote={deleteNote}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <RateFooter />
              </div>
            </div>
          )
        )}
      </div>
      <style type="text/css">{styles}</style>
    </root.div>
  );
}
