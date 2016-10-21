const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg) {
  // if (arg instanceof function) {
    // document.addEventListener("DOMContentLoaded", arg)
  // }
  if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }else{
    let objects = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(objects);
  }
};
