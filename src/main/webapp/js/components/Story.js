import Observer from "../lib/Observer.js";

export default class Story extends Observer {

  constructor(currentState = {}) { 
    super();
    this.appState = currentState;
  }

  createTemplate(currentState) { 
    const currentUserId = currentState.user.id;
    return `<div>
    ${currentState.stories.map(story => { 
      if(story.user.id === currentUserId) {
        return `<div class="d-flex justify-content-end mb-4">
        <div ondblclick=openUpdate(${story.id}) class="msg_cotainer_send">
          <p class="font-weight-bold">${story.title}</p>
          <hr>${story.content}<span class="msg_time_send">${`${story.createdAt.toString().split(' ')[1]} ${story.createdAt.toString().split(' ')[2]} ${story.createdAt.toString().match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)}`}</span>
          <span onclick="deleteStory(${story.id})" class="delete_btn"><i class="fas fa-trash"></i></span>
        </div>
        <div class="img_cont_msg">
          <div src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            class="rounded-circle user_img_msg text-white">${story.user.name.toUpperCase().charAt('0')}</div>
        </div>
        </div>`;
      }

      return `<div class="d-flex justify-content-start mb-4">
      <div class="img_cont_msg">
        <div
          class="rounded-circle sent_img_msg text-white">${story.user.name.toUpperCase().charAt('0')}</div>
      </div>
      <div class="msg_cotainer">
        <p class="font-weight-bold">${story.title}</p>
        <hr> ${story.content} <span class="msg_time">${`${story.createdAt.toString().split(' ')[1]} ${story.createdAt.toString().split(' ')[2]} ${story.createdAt.toString().match(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)}`}</span>
      </div>
    </div>`;
     })}
    </div>`;
  }

  render(currentState, idSelector) {
    const template = this.createTemplate(currentState);
    const parent = document.getElementById(idSelector);

    parent.innerHTML = template;

    this.bindEvents(this.appState);
  }

  update(currentState) {
    this.render(currentState, 'list-container');
  }

  bindEvents(appState) {
    window.deleteStory = function (id) {
      const currentState = appState.get();

      const stories = currentState.stories.filter(story => story.id !== id);

      appState.update({ stories });
    }
  }
}