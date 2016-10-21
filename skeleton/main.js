const Router = require('./router.js');
const Inbox = require('./inbox.js');
const MessageStore = require('./message_store.js');

document.addEventListener("DOMContentLoaded", function(){

  let content = document.querySelectorAll('.content');
  new Router(content[0], routes).start();

  let listitems = document.querySelectorAll('.sidebar-nav li');
  for (var i = 0; i < listitems.length; i++) {
    listitems[i].addEventListener("click", (e) => {
      let location = e.target.innerText.toLowerCase();
      window.location.hash = location;
    });
  }
});

let routes = {inbox: new Inbox()};
