import { setCookie } from './lib/Cookie.js'

document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();

  const el = e.target;
  const username = el.username.value;
  const password = el.password.value;

  if(username.length > 5 && password.length > 8) {
    setCookie('userId', 100, 30);
    window.location.replace("/src/main/webapp/index.html");
  } else {
    alert('username should be more than 5 characters long and password should be more than 8 characters long!');
  }
});