// Config
import { config } from "../config/config";

chrome?.runtime?.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkURL") {
    const query = new URLSearchParams({ url: request.url }).toString();
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/get-note?${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ message: "URL checked", data: data });
      })
      .catch((error) => {
        sendResponse({ message: "Error checking URL", error: error });
      });
    return true; // Will respond asynchronously
  }
});

// Post actions

// Like
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "like") {
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: request.noteId }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Send a response with the note data
        sendResponse({ data: data });
      })
      .catch((error) => {
        // Send a response with the error
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// Unlike
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "unlike") {
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/unlike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: request.noteId }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Send a response with the note data
        sendResponse({ data: data });
      })
      .catch((error) => {
        // Send a response with the error
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// Dislike
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "dislike") {
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/dislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: request.noteId }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Send a response with the note data
        sendResponse({ data: data });
      })
      .catch((error) => {
        // Send a response with the error
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// Undislike
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "undislike") {
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/undislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: request.noteId }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Send a response with the note data
        sendResponse({ data: data });
      })
      .catch((error) => {
        // Send a response with the error
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// Hide note
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "hideNote") {
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/notes/hide-note`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId: request.noteId }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Send a response with the note data
        sendResponse({ data: data });
      })
      .catch((error) => {
        // Send a response with the error
        sendResponse({ error: error.message });
      });
    return true;
  }
});

// isAuthenticated
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "isAuthenticated") {
    // Perform the isAuthenticated action
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/auth/me`
    )
      .then((response) => response.json())
      .then((data) => {
        data?._id
          ? sendResponse({ data: true, hasAccess: data?.hasAccess })
          : sendResponse({ data: false });
        // test
      })
      .catch(() => {
        // Send a response false
        sendResponse({ data: false });
      });
    return true;
  }
});

// accessCodeRequired
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "accessCodeRequired") {
    // Perform the accessCodeRequired action
    fetch(
      `${
        config.environment === "development"
          ? config.developmentAPIURL
          : config.productionAPIURL
      }/auth/access-code-required`
    )
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ data: data });
      })
      .catch(() => {
        // Send a response false
        sendResponse({ data: false });
      });
    return true;
  }
});
