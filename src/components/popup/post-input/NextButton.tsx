import React from "react";
import "./NextButton.css";

// Context
import { usePopup } from "../../../context/popupContext";

export default function NextButton({
  loading,
  addNoteStep,
  setAddNoteStep,
  acceptsNotes,
}: {
  loading: boolean;
  addNoteStep: number;
  setAddNoteStep: React.Dispatch<React.SetStateAction<number>>;
  acceptsNotes: boolean;
}) {
  const { postButtonText } = usePopup();

  return (
    <button
      disabled={loading || !acceptsNotes || postButtonText === "Note Added"}
      type="submit"
      className={
        loading || !acceptsNotes || postButtonText === "Note Added"
          ? "disabled_button_container"
          : "button_container"
      }
      onClick={(e) => {
        if (addNoteStep === 1) {
          e.preventDefault();
          setAddNoteStep(2);
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
            `${addNoteStep === 1 ? "Next" : postButtonText}`
          )}
        </div>
      </div>
    </button>
  );
}
