chrome?.runtime?.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkURL") {
    const query = new URLSearchParams({ url: request.url }).toString();
    fetch(`http://localhost:8000/notes/get-note?${query}`)
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ message: "URL checked", data: data });
      })
      .catch((error) => {
        sendResponse({ message: "Error checking URL", error: error });
      });
    return true; // Indicates that the response is asynchronous
  }
});
