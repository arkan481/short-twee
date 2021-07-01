import Subject from "./Subject.js"
import User from "./User.js";


export default class State extends Subject {
  constructor() {
    super();
    // STATE EXAMPLE DATA
    // {
    //   user: User(),
    //   stories: [
    //     {
    //       id: 1,
    //       title: 'this is a title',
    //       content: 'this is a content',
    //       user: 'user-id',
    //       createdAt: '10-10-2021 18:10'
    //     }
    //   ]
    // }
    this.state = {};
  }

  update(data = {}) {
    this.state = Object.assign(this.state, data);
    this.notify(this.state);
  }

  get() {
    return this.state;
  }
}