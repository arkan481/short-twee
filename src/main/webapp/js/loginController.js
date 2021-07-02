import { setCookie } from './lib/Cookie.js'

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();

  const el = e.target;
  const username = el.username.value;
  const password = el.password.value;

  if(username === 'arkan' && password === 'haryo') {
    setCookie('userId', 100, 30);
    window.location.replace("/src/main/webapp/index.html");
  } else {
    alert('wrong credentials!');
  }

});