function createMessageElement({ username, content, timestamp, type }) {
  const messageElement = document.createElement("article");
  const normalizedType = type === "SYSTEM" ? "system" : "chat";

  messageElement.classList.add("message", normalizedType);

  const headerElement = document.createElement("div");
  headerElement.classList.add("message-header");

  if (normalizedType === "system") {
    headerElement.textContent = `Sistema · ${formatTimestamp(timestamp)}`;
  } else {
    headerElement.textContent = `${username || "Usuario"} · ${formatTimestamp(timestamp)}`;
  }

  const contentElement = document.createElement("p");
  contentElement.textContent = content;

  messageElement.appendChild(headerElement);
  messageElement.appendChild(contentElement);

  return messageElement;
}

function appendMessage(container, messageData) {
  const messageElement = createMessageElement(messageData);
  container.appendChild(messageElement);
  container.scrollTop = container.scrollHeight;
}

function updateConnectionStatus(element, text) {
  element.textContent = text;
}

function toggleChatControls(messageInput, sendButton, enabled) {
  messageInput.disabled = !enabled;
  sendButton.disabled = !enabled;
}