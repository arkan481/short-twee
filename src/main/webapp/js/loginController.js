import Firebase from "./lib/Firebase.js";

const auth = Firebase.getAuthInstance();

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const el = e.target;
  const email = el.username.value;
  const password = el.password.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.replace("./index.html");
  } catch (error) {
    alert(error.message);
  }
});
