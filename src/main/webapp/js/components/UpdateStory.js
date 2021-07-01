import Observer from "../lib/Observer.js";

export default class UpdateStory extends Observer {

  constructor(currentState = {}) {
    super();
    this.appState = currentState;
  }

  createTemplate() {
    
  }

}