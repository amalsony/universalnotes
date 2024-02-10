import React from "react";
import { useState, useRef } from "react";

import "./PostInput.css";

import PropTypes from "prop-types";

// axios
import axios from "axios";
import Logo from "../general/Logo";
import Link from "../../assets/svgs/Link";
import { set } from "mongoose";

interface PostInputProps {
  placeholder?: string;
}

export default function PostInput({ placeholder }: PostInputProps) {
  const [body, setBody] = useState<string>("");
  const [currentURL, setCurrentURL] = useState<string>("");
  const [niceURL, setNiceURL] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Add Note");

  const bodyInput = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setButtonText("Adding");
    const formData = new FormData();
    formData.append("body", body);
    formData.append("url", currentURL);

    await axios
      .post("http://localhost:8000/notes/add-note", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        // clear inputs
        setBody("");
        bodyInput.current.innerHTML = "";

        setButtonText("Note Added");
        setTimeout(() => {
          setButtonText("Add Note");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setButtonText("Add Note");
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

  const getNiceURL = (url: string) => {
    const temp = url
      .replace(/(https?:\/\/)?(www.)?/i, "")
      .split("#")[0]
      .split("?")[0]
      .split(":")[0]
      .toLowerCase();
    const splicedURL = temp[temp.length - 1] === "/" ? temp.slice(0, -1) : temp;
    return splicedURL;
  };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    if (currentTab) {
      setCurrentURL(currentTab.url);
      setNiceURL(getNiceURL(currentTab.url));
    }
  });

  return (
    <div className="postInputContainer">
      <div className="header">
        {/* <p className="header_text">You're adding context to</p> */}
        <div className="header_text_url_container">
          <div className="header_text_url_link_icon">
            <Link width="22" height="22" color="#4285F4" />
          </div>
          <p className="header_text_url">
            {niceURL ? niceURL : "current page url"}
          </p>
        </div>
      </div>
      <div className="postInputContainer">
        <form onSubmit={handleSubmit} className="form">
          <div className="input_container">
            <div
              className="input"
              contentEditable="true"
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
          {error && <div className="error_container">{error}</div>}
          <div className="buttons_container">
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
            <button
              disabled={loading}
              type="submit"
              className={
                loading
                  ? "loading_button_container"
                  : buttonText === "Note Added"
                  ? "loading_button_container"
                  : "button_container"
              }
            >
              <div className="button">
                <div className="button_text">
                  {loading ? (
                    <div className="loading">
                      <div className="loading_text">{buttonText}</div>
                    </div>
                  ) : (
                    buttonText
                  )}
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

PostInput.propTypes = {
  placeholder: PropTypes.string,
};
