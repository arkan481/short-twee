import Firebase from "./Firebase.js";

export default class User {
  constructor(user) {
    if (!User.instance) {
      this.createInstance(user);
    }

    return User.instance;
  }

  createInstance(user) {
    // TODO: FIND OUT IF CLASS.variablename is the same as defining in constructor variable
    User.instance = user;
    User.instance.logout = async function () {
      User.initialize();
      try {
        const auth = Firebase.getAuthInstance();
        await auth.signOut();
        window.location.replace("./login.html");
      } catch (error) {
        alert("error when logging out");
        console.error(error);
      }
    };
  }

  static initialize() {
    User.instance = null;
  }
}
