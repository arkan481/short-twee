import Firebase from "../lib/Firebase.js";

export default class Form {
  constructor(currentState = {}) {
    this.appState = currentState;
  }

  createTemplate() {
    return `<form id="post-form">
    <div class="input-group">
    <input type="text" placeholder="Story Title..." name="title"
      class="form-control search">
    <div class="input-group-prepend">
      <span class="input-group-text search_btn"><i
        class="fas fa-italic"></i></span>
    </div>
    </div>
    <div class="input-group my-3">
    <textarea name="content" style="overflow: auto; resize: none" rows="9"
      placeholder="Story Contents..." name="" class="form-control search"></textarea>
    <div class="input-group-prepend">
      <span class="input-group-text search_btn"><i
        class="fas fa-itali"></i></span>
    </div>
    </div>
    <div class="input-group">
    <button type="submit" class="btn btn-block btn-dark">Post</button>
    </div>
    </form>`;
  }

  render(idSelector) {
    const template = this.createTemplate();
    const parent = document.getElementById(idSelector);

    parent.innerHTML = template;
    this.bindEvents();
  }

  showAlert(message, timeOut = 3000, idSelector = "alert") {
    const alert = `<div class="alert alert-danger" role="alert">
      ${message}
    </div>`;
    const parent = document.getElementById(idSelector);
    parent.innerHTML = alert;
    setTimeout(() => {
      parent.innerHTML = "";
    }, timeOut);
  }

  bindEvents() {
    const form = document.getElementById("post-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const currentState = this.appState.get();

      const el = e.target;
      const title = el.title.value;
      const content = el.content.value;
      const user = currentState.user;

      if (!title || !content || !user) {
        this.showAlert(
          "Please fill out the title and the content of the story!"
        );
        return;
      }

      // TODO: SAVE TO FIREBASE
      try {
        const storiesRef = Firebase.getDatabaseInstance().ref("stories");
        const autoId = await storiesRef.push().key;
        storiesRef.child(autoId).set({
          title,
          content,
          user: { id: user.id, name: user.name },
          createdAt: new Date().toString(),
        });

        // const stories = [
        //   ...currentState.stories,
        //   {
        //     id: autoId,
        //     title,
        //     content,
        //     user,
        //     createdAt: new Date(),
        //   },
        // ];

        el.title.value = "";
        el.content.value = "";

        // this.appState.update({ user, stories });
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
