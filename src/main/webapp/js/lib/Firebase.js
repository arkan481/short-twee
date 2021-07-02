export default class Firebase {
  constructor() {
    if (!Firebase.instance) {
      this.initializeFirebase();
    }

    return firebase;
  }

  initializeFirebase() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyAIdrPv5Klll4vj-9Bv-cr7VV37vNnX3cU",
      authDomain: "short-twee.firebaseapp.com",
      projectId: "short-twee",
      storageBucket: "short-twee.appspot.com",
      messagingSenderId: "721851096982",
      appId: "1:721851096982:web:c67be3241025e7b17607b7",
      measurementId: "G-4XQ5LS0V30",
      databaseURL: "https://short-twee-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

   static getInstance() {
    let instance;
    if(!Firebase.instance) {
      instance = new Firebase();
    }

    return instance;
  }

  static getDatabaseInstance() {
    return this.getInstance().database();    
  }

  static getAuthInstance() {
    return this.getInstance().auth();
  }
}