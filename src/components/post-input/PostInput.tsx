import React from "react";
import { useState, useRef } from "react";

import "./PostInput.css";

import PropTypes from "prop-types";

// axios
import axios from "axios";
import { set } from "mongoose";

interface PostInputProps {
  placeholder?: string;
}

export default function PostInput({ placeholder }: PostInputProps) {
  const [body, setBody] = useState<string>("");
  const [currentURL, setCurrentURL] = useState<string>("");
  const [niceURL, setNiceURL] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const bodyInput = useRef<HTMLDivElement>(null);
  const postImageInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("body", body);
    formData.append("url", currentURL);

    await axios
      .post("http://localhost:8000/notes/add-note", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        setLoading(false);

        // clear inputs
        setBody("");
        bodyInput.current.innerHTML = "";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const bodyChangeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (e.target.innerText.length > 1000) {
      console.log("too long");
      return;
    }
    setBody(e.target.innerText);
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
        <p className="header_text">Add context to</p>
        <p className="header_text_url">{niceURL}</p>
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
              ref={bodyInput}
            ></div>
          </div>
          <div className="buttons_container">
            <div className="character_count_container">
              <div className="character_count">{body.length}/1000</div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={
                loading ? "loading_button_container" : "button_container"
              }
            >
              <div className="button">
                <div className="button_text">
                  {loading ? (
                    <div className="loading">
                      <div className="lds_ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div className="loading_text">Adding</div>
                    </div>
                  ) : (
                    "Add Note"
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
