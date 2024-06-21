import React from "react";
import { useState, useRef } from "react";

import "./PostInput.css";

import PropTypes from "prop-types";

// axios
import axios from "axios";

// Config
import { config } from "../../../config/config";

// Components
import Logo from "../../../assets/general/Logo";
import Link from "../../../assets/svgs/Link";
import Warning from "../../../assets/svgs/Warning";
import NoteTypePage from "../main/NoteTypePage";

// Context
import { usePopup } from "../../../context/popupContext";

import { getNiceURL } from "../../../utilities/getNiceURL";
import BackArrow from "../../../assets/svgs/BackArrow";
import NextButton from "./NextButton";

export default function PostInput() {
  const [body, setBody] = useState<string>("");
  const [currentURL, setCurrentURL] = useState<string>("");
  const [niceURL, setNiceURL] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const { placeholder, setPlaceholder } = usePopup();
  const { postButtonText, setPostButtonText } = usePopup();
  const { isAgainstContext, setIsAgainstContext } = usePopup();
  const { addNoteStep, setAddNoteStep } = usePopup();
  const [acceptsNotes, setAcceptsNotes] = useState<boolean>(true);

  const bodyInput = useRef<HTMLDivElement>(null);

  const checkNoteStatus = (url: string) => {
    axios
      .post(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/notes/note-status`,
        {
          url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setAcceptsNotes(res.data.status);
        if (!res.data.status) {
          console.log("res.data.placeholderText", res.data.placeholderText);
          setPlaceholder(
            res.data.placeholderText
              ? res.data.placeholderText
              : "To prevent abuse, notes can't be added to this page."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loading && setShowLoading(true);
    }, 200);
    setPostButtonText("Adding");
    const formData = new FormData();
    formData.append("body", body);
    formData.append("url", currentURL);
    formData.append("isAgainstContext", isAgainstContext.toString());

    await axios
      .post(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/notes/add-note`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setLoading(false);

        setPostButtonText("Note Added");

        // clear inputs
        setBody("");
        if (bodyInput.current) {
          bodyInput.current.innerHTML = "";
        }
        setCharacterCount(0);
        setAddNoteStep(1);

        setTimeout(() => {
          setPostButtonText("Next");
        }, 2000);
      })
      .catch((err) => {
        console.log("Post Input Error", err);
        setPostButtonText("Error");
        setTimeout(() => {
          console.log("Resetting button text");
          setPostButtonText("Add Note");
        }, 2000);
        setLoading(false);
      });
  };

  const bodyChangeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (e.target.innerText.length > 1000) {
      setError(
        "Notes cannot exceed 1000 characters. Only the first 1000 characters will be posted."
      );
      setCharacterCount(e.target.innerText.length);
    } else {
      setError("");
      setBody(e.target.innerText);
      setCharacterCount(e.target.innerText.length);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default paste action
    const text = e.clipboardData.getData("text/plain"); // Get pasted text
    document.execCommand("insertText", false, text); // Insert text where the cursor is
  };

  const refillInputWithText = () => {
    setTimeout(() => {
      if (bodyInput.current) {
        // Replace newline characters with <br> tags
        const formattedBody = body.replace(/\n/g, "<br>");
        bodyInput.current.innerHTML = formattedBody;
      } else {
        console.error("bodyInput.current is null");
      }
    }, 0);
  };

  // const getNiceURL = (url: string) => {
  //   const temp = url
  //     .replace(/(https?:\/\/)?(www.)?/i, "")
  //     .split("#")[0]
  //     .split("?")[0]
  //     .split(":")[0]
  //     .toLowerCase();
  //   const splicedURL = temp[temp.length - 1] === "/" ? temp.slice(0, -1) : temp;
  //   return splicedURL;
  // };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    if (currentTab) {
      setCurrentURL(currentTab.url);
      checkNoteStatus(currentTab.url);
      setNiceURL(getNiceURL(currentTab.url));
    }
  });

  return (
    <div className="postInputContainer">
      {addNoteStep === 1 && (
        <div className="header">
          <div
            className={`header_text_url_container ${
              !acceptsNotes ? "header_text_url_container_warning" : ""
            }`}
          >
            {acceptsNotes ? (
              <div className="header_text_url_link_icon">
                <Link width="22" height="22" color="#4285F4" />
              </div>
            ) : (
              <div className="header_text_url_warning_icon">
                <Warning width="14" height="14" color="#EED202" />
              </div>
            )}
            <p className="header_text_url">
              {niceURL ? niceURL : "current page url"}
            </p>
          </div>
        </div>
      )}
      <div className="postInputContainer">
        <form onSubmit={handleSubmit} className="form">
          {addNoteStep === 2 ? (
            <NoteTypePage />
          ) : (
            <div className="input_container">
              <div
                className="input"
                contentEditable={acceptsNotes ? "true" : "false"}
                role="textbox"
                spellCheck="true"
                placeholder={
                  placeholder
                    ? placeholder
                    : "Does this page need more context? Add it here."
                }
                onInput={(e) =>
                  bodyChangeHandler(e as React.ChangeEvent<HTMLDivElement>)
                }
                onPaste={handlePaste}
                ref={bodyInput}
              ></div>
            </div>
          )}
          {error && <div className="error_container">{error}</div>}
          <div className="post_input_footer">
            <div className="post_input_footer_right">
              {addNoteStep === 2 && (
                <div className="post_input_back_button">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAddNoteStep(1);
                      setPostButtonText("Next");
                      refillInputWithText();
                    }}
                    className="back_button"
                  >
                    <BackArrow width="24" height="24" />
                  </button>
                </div>
              )}
            </div>
            <div className="post_input_footer_left">
              {loading && (
                <div className="lds_ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}

              <div className="character_count_container">
                <div
                  className={
                    characterCount > 1000
                      ? "character_count_error"
                      : "character_count"
                  }
                >
                  {characterCount}/1000
                </div>
              </div>
              <NextButton
                loading={loading}
                acceptsNotes={acceptsNotes}
                body={body}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

PostInput.propTypes = {
  placeholder: PropTypes.string,
};
