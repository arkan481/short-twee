import Firebase from "./lib/Firebase.js";

const auth = Firebase.getAuthInstance();

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const el = e.target;
  const email = el.username.value;
  const password = el.password.value;

  if (password.length > 8) {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      window.location.replace("./index.html");
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("password should be more than 8 characters long!");
  }
});