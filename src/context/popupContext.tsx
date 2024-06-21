import React, { createContext, useContext, useState } from "react";

interface PopupContextType {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  placeholder: string;
  setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  addNoteStep: number;
  setAddNoteStep: React.Dispatch<React.SetStateAction<number>>;
  isAgainstContext: boolean;
  setIsAgainstContext: React.Dispatch<React.SetStateAction<boolean>>;
  postButtonText: string;
  setPostButtonText: React.Dispatch<React.SetStateAction<string>>;
  inputContent: string;
  setInputContent: React.Dispatch<React.SetStateAction<string>>;
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
  addNoteStep: 1,
  setAddNoteStep: () => {},
  isAgainstContext: false,
  setIsAgainstContext: () => {},
  postButtonText: "Next",
  setPostButtonText: () => {},
  inputContent: "",
  setInputContent: () => {},
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

  const [addNoteStep, setAddNoteStep] = useState<number>(1);
  const [isAgainstContext, setIsAgainstContext] = useState<boolean>(false);

  const [placeholder, setPlaceholder] = useState<string>("");
  const [postButtonText, setPostButtonText] = useState<string>("Next");
  const [inputContent, setInputContent] = useState<string>("");

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
        isAgainstContext,
        setIsAgainstContext,
        addNoteStep,
        setAddNoteStep,
        postButtonText,
        setPostButtonText,
        inputContent,
        setInputContent,
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
