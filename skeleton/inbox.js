const MessageStore = require('./message_store.js');

class Inbox{
  constructor() {

  }

  render() {
    let container = document.createElement("ul");
    container.className = "messages";
    let inboxMessages = MessageStore.getInboxMessages();
    inboxMessages.forEach(message => {
      container.appendChild(this.renderMessage(message));
    });
    return container;
  }

  renderMessage(message) {
    let listItem = document.createElement("li");
    listItem.className = "message";
    listItem.innerHTML = `<span class="from">${message.from}</span> <span class="subject">${message.subject}</span> <span class="body">${message.body}</span>`;
    return listItem;
  }
}

module.exports = Inbox;
