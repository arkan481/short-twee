import State from "./lib/State.js";
import User from './lib/User.js';
import { getCookie } from "./lib/Cookie.js";

import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Story from "./components/Story.js";
import UpdateStory from "./components/UpdateStory.js";

const AppState = new State();

const header = new Header(AppState);
const form = new Form(AppState);
const story = new Story(AppState);
const updateStory = new UpdateStory(AppState);

const userId = getCookie('userId');

if(!userId) {
  // FIXME: USE DYNAMIC ROUTE
  window.location.replace("/src/main/webapp/login.html");
}

const user = new User({ id: userId, name: 'Arkan' });

AppState.subscribe(story);

AppState.update({ user, stories: [] });

header.render('header-container');
form.render('form-container');
updateStory.render();