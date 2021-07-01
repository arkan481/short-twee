import Observer from "../lib/Observer.js";

export default class Test extends Observer {
  update(data) {
    console.log(data);
  }
}