import React from "react";
import "./NoteBody.css";

export default function NoteBody({ body }: { body: any }) {
  if (!body) return null;

  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // split body into an array of lines
  body = body.split("\n");

  body = body.map((line: any) =>
    line.split(" ").map((word: any, index: any) => {
      if (word.match(urlRegex) && !word.match(emailRegex)) {
        const originalWord = word;
        let numberOfNewLines;
        if (word.includes("\n")) {
          numberOfNewLines = word.match(/\n/g).length;
          word = word.split("\n");
          word = word[word.length - 1];
        }
        let charsRemovedBeforeUrl = originalWord.slice(
          0,
          originalWord.indexOf("\n") + numberOfNewLines
        );
        let link;
        if (word.includes("http")) {
          link = word;
        } else {
          link = "https://" + word;
        }
        return (
          <span key={index}>
            {charsRemovedBeforeUrl}
            <a className="link" href={link} target="_blank" rel="noreferrer">
              {word}
            </a>{" "}
          </span>
        );
      } else if (word.includes("@") && !word.match(emailRegex)) {
        const charsRemovedBeforeAt = word.slice(0, word.indexOf("@"));
        word = word.slice(word.indexOf("@"));
        let username;
        if (word.slice(1).match(/^[a-zA-Z0-9]+/) !== null) {
          username = word.slice(1).match(/^[a-zA-Z0-9]+/)[0];
          return (
            <a
              key={index}
              href={`https://twitter.com/${username.toLowerCase()}`}
            >
              <span>
                {charsRemovedBeforeAt}
                <span className="tag_link">@{username}</span>
                {word.split("@")[1].replace(username, "")}{" "}
              </span>
            </a>
          );
        } else {
          return (
            <span key={index}>
              {charsRemovedBeforeAt}
              <span>@</span>{" "}
            </span>
          );
        }
      } else {
        return word + " ";
      }
    })
  );

  return (
    <div className="user_post_body_container">
      <div className="user_post_body">
        <span>
          {body.map((line: any, index: any) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
