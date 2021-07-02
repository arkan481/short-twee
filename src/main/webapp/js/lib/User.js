export default class User {

  constructor(user) {
    if(! User.instance) {
      this.createInstance(user);
    }

    return User.instance;
  }

  createInstance(user) {
    // TODO: FIND OUT IF CLASS.variablename is the same as defining in constructor variable
    User.instance = user;
    User.instance.logout = function() {
      User.initialize();
      window.location.replace("./login.html");
    }
  }

  static initialize() {
    User.instance = null;
  }

}