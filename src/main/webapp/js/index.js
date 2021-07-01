import State from "./lib/State.js";
import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Test from "./components/Test.js";
import Story from "./components/Story.js";

const AppState = new State();

const header = new Header();
const form = new Form(AppState);
const test = new Test();
const story = new Story(AppState);

AppState.subscribe(test);
AppState.subscribe(story);

AppState.update({ user: { id: 1, name: 'arkan' }, stories: [] });

header.render('header-container');
form.render('form-container');