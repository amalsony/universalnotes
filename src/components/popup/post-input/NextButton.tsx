import React from "react";
import "./NextButton.css";

// Context
import { usePopup } from "../../../context/popupContext";

export default function NextButton({
  loading,
  acceptsNotes,
  body,
}: {
  loading: boolean;
  acceptsNotes: boolean;
  body: string;
}) {
  const { postButtonText } = usePopup();
  const { addNoteStep, setAddNoteStep, setPostButtonText } = usePopup();

  return (
    <button
      disabled={
        loading ||
        !acceptsNotes ||
        postButtonText === "Note Added" ||
        postButtonText === "Error" ||
        body.length === 0
      }
      type="submit"
      className={
        loading ||
        !acceptsNotes ||
        postButtonText === "Note Added" ||
        postButtonText === "Error" ||
        body.length === 0
          ? "disabled_button_container"
          : "button_container"
      }
      onClick={(e) => {
        if (addNoteStep === 1) {
          e.preventDefault();
          setAddNoteStep(2);
          setPostButtonText("Add Note");
        }
      }}
    >
      <div className="button">
        <div className="button_text">
          {loading ? (
            <div className="loading">
              <div className="loading_text">{postButtonText}</div>
            </div>
          ) : (
            postButtonText
          )}
        </div>
      </div>
    </button>
  );
}
