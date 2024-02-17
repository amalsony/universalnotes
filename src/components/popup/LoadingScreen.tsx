import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

// Components
import Loading from "../../assets/general/Loading";
import Logo from "../../assets/general/Logo";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 400);

    setTimeout(() => {
      setShowWarning(true);
    }, 4000);
  }, []);

  return (
    <div className="loading-screen-container">
      {isVisible ? (
        <>
          <div className="loading-screen-loading-container">
            <Logo />
          </div>
          <Loading />
          {showWarning ? (
            <div className="loading-screen-warning-container">
              <p>
                This is taking much longer than expected. Please check your
                connection.
              </p>
              <p>Or message universalnotesorg@gmail.com if this persists.</p>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
