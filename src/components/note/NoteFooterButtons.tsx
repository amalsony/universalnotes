import React from "react";
import root from "react-shadow";
import styles from "./NoteFooter.shadow.css";

// Config
import { config } from "../../config/config";

// Components
import Dislike from "../../assets/svgs/Dislike";
import Like from "../../assets/svgs/Like";

export default function NoteFooterButtons({
  note,
  isAuthenticated,
  like,
  unlike,
  dislike,
  undislike,
}) {
  return (
    <root.fragment>
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
                ? config.developmentClientURL
                : config.productionClientURL
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
                ? config.developmentClientURL
                : config.productionClientURL
            }/note/${note?._id}?action=dislike`}
            target="_blank"
          >
            <button className="note-footer-button">
              <Dislike height="14" width="14" color="#4285F4" />
            </button>
          </a>
        )}
        <p className="note-footer-like-dislike-count">{note?.dislike_count}</p>
      </div>
    </root.fragment>
  );
}
