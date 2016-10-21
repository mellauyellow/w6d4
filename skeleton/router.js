class Router{
  constructor(node, routes){
    this.node = node;
    this.routes = routes;
  }

  start() {
    this.render();
    console.log("start run");
    window.addEventListener("hashchange", () => {
      console.log("event triggered");
      this.render();
    });
  }

  activeRoute() {
    let route = window.location.hash;
    route = route.slice(1);
    return this.routes[route];
  }

  render() {
    let component = this.activeRoute();
    if (component === undefined) {
      this.node.innerHTML = "";
    } else {
      this.node.innerHTML = "";
      let compNode = component.render();
      this.node.appendChild(compNode);
    }
  }
}

module.exports = Router;
