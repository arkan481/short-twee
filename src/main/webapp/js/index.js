import State from "./lib/State.js";
import User from "./lib/User.js";

import Header from "./components/Header.js";
import Form from "./components/Form.js";
import Story from "./components/Story.js";
import UpdateStory from "./components/UpdateStory.js";
import Firebase from "./lib/Firebase.js";

const AppState = new State();

const header = new Header(AppState);
const form = new Form(AppState);
const story = new Story(AppState);
const updateStory = new UpdateStory(AppState);
const auth = Firebase.getAuthInstance();

AppState.subscribe(story);
AppState.subscribe(header);

AppState.update({ user: { name: "loading...", id: 0 }, stories: [] });

auth.onAuthStateChanged((user) => {
  if (user) {
    const currentUser = new User({ id: user.uid, name: user.email });
    AppState.update({ user: currentUser, stories: [] });
  } else {
    window.location.replace("./login.html");
  }
});

Firebase.getDatabaseInstance()
  .ref("stories")
  .on("value", (snap) => {
    const results = snap.val();

    if (results) {
      let stories = [];

      Object.keys(results).forEach((key) => {
        stories.push({
          id: key,
          title: results[key].title,
          content: results[key].content,
          user: results[key].user,
          createdAt: results[key].createdAt,
        });
      });

      AppState.update({ stories });
    }
  });

form.render("form-container");
updateStory.render();
