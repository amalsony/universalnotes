import React, { createContext, useContext, useEffect, useState } from "react";

interface PopupContextType {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  placeholder: string;
  setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  postButtonText: string;
  setPostButtonText: React.Dispatch<React.SetStateAction<string>>;
  accessCodeRequired: boolean;
  setAccessCodeRequired: React.Dispatch<React.SetStateAction<boolean>>;
}

// Ensure the default value matches the structure, including any new fields
const defaultPopupContextValue: PopupContextType = {
  userInfo: null,
  setUserInfo: () => {},
  token: null,
  setToken: () => {},
  isAuthenticated: null,
  setIsAuthenticated: () => {},
  placeholder: "",
  setPlaceholder: () => {},
  postButtonText: "Add note",
  setPostButtonText: () => {},
  accessCodeRequired: false,
  setAccessCodeRequired: () => {},
};

// Create context with the default value
const popupContext = createContext<PopupContextType>(defaultPopupContextValue);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [placeholder, setPlaceholder] = useState<string>("");
  const [postButtonText, setPostButtonText] = useState<string>("Add Note");

  const [accessCodeRequired, setAccessCodeRequired] = useState<boolean>(false);

  return (
    <popupContext.Provider
      value={{
        userInfo,
        setUserInfo,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        placeholder,
        setPlaceholder,
        postButtonText,
        setPostButtonText,
        accessCodeRequired,
        setAccessCodeRequired,
      }}
    >
      {children}
    </popupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(popupContext);
};
