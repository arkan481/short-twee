export default class Subject {

  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    if(this.observers.length > 0) {
      this.observers.forEach(obs => obs.update(data));
    }
  }
  
}