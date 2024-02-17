import React from "react";

const Options = () => {
  return (
    <div>
      <h1 className="text-4xl text-green-500">
        Hi! Thank you for using UniversalNotes.
      </h1>
      <p>
        UniversalNotes comes pre-configured but we may add options to this page
        later.
      </p>
      <p>
        You can view our privacy policy at{" "}
        <a
          href="https://www.universalnotes.org/privacy-policy"
          target="_blank"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          universalnotes.org/privacy-policy
        </a>{" "}
        and our terms of service at{" "}
        <a
          href="https://www.universalnotes.org/privacy-policy"
          target="_blank"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          universalnotes.org/terms-of-service
        </a>
      </p>
      <p>Thank you for helping us fight misinformation.</p>
    </div>
  );
};

export default Options;
