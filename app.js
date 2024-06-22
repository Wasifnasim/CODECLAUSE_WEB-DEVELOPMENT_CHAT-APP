// Room selection logic
const roomForm = document.querySelector('#room-form');
const roomSelect = document.querySelector('#room-select');
const roomSelectionPage = document.querySelector('#room-selection');
const chatAppPage = document.querySelector('#chat-app');
const currentRoomSpan = document.querySelector('#current-room');

roomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedRoom = roomSelect.value;
  if (selectedRoom) {
    currentRoom = selectedRoom;
    currentRoomSpan.textContent = selectedRoom;
    roomSelectionPage.style.display = 'none';
    chatAppPage.style.display = 'block';
  }
});

// Chat logic
const rahulSelectorBtn = document.querySelector('#rahul-selector');
const priyaSelectorBtn = document.querySelector('#priya-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Rahul' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'Rahul';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting in ${currentRoom}...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'Rahul') {
    rahulSelectorBtn.classList.add('active-person');
    priyaSelectorBtn.classList.remove('active-person');
  } else {
    priyaSelectorBtn.classList.add('active-person');
    rahulSelectorBtn.classList.remove('active-person');
  }

  chatInput.focus();
};

rahulSelectorBtn.onclick = () => updateMessageSender('Rahul');
priyaSelectorBtn.onclick = () => updateMessageSender('Priya');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
    room: currentRoom,
  };

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
