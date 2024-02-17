import React from "react";
import "./AccessCodeScreen.css";

// Context
import { usePopup } from "../../context/popupContext";

// Config
import { config } from "../../config/config";

// Axios
import axios from "axios";

// General
import Logo from "../../assets/general/Logo";
import { set } from "mongoose";

export default function AccessCodeScreen() {
  const { userInfo, setUserInfo } = usePopup();
  const [accessCode, setAccessCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(
        `${
          config.environment === "development"
            ? config.developmentAPIURL
            : config.productionAPIURL
        }/auth/add-access-code`,
        { accessCode }
      )
      .then((res) => {
        setUserInfo(res.data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <div className="access-code-container">
      <Logo />

      <div className="access-code-container-main">
        {/* <h1 className="access-code-container-title">
          Welcome{userInfo?.name ? `, ${userInfo.name.split(" ")[0]}` : null}!
          Welcome
        </h1> */}
        <input
          className="access-code-container-input"
          type="text"
          placeholder="Enter your access code"
          value={accessCode}
          onChange={(e) =>
            setAccessCode(e.target.value.replace(/\s/g, "").toUpperCase())
          }
        />
        <button
          disabled={accessCode.length === 0}
          type="submit"
          className={
            // accessCode.length === 0
            //   ? "access-code-container-disabled-button-container"
            "access-code-container-button-container"
          }
          onClick={handleSubmit}
        >
          <div className="button">
            <div className="button_text">Continue</div>
          </div>
        </button>
        {error && <p className="access-code-container-error">{error}</p>}
      </div>
    </div>
  );
}
