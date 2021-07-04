import Observer from "../lib/Observer.js";

import Firebase from "../lib/Firebase.js";

export default class UpdateStory extends Observer {

  constructor(currentState = {}) {
    super();
    this.appState = currentState;
  }

  createTemplate() {
    return `<div id="upd-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Story</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form id="upd-form">
          <div class="modal-body">
            <div class="form-group">
              <input type="hidden" id="story-id">
              <label for="story-title">Story Title</label>
              <input class="form-control" id="story-title">
            </div>
            <div class="form-group">
              <label for="story-content">Story Content</label>
              <textarea style="overflow: auto; resize: none" rows="5" class="form-control" id="story-content"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Save changes</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
  }

  render() {
    const template = this.createTemplate();
    const parent = document.getElementById('update-container');

    parent.innerHTML = template;

    this.bindEvents();
  }

  bindEvents() {
    const appState = this.appState;
    window.openUpdate = function(storyId) {
      $('#upd-modal').modal('toggle');

      const currentStories = appState.get().stories;

      const updStory = currentStories.filter(story => story.id === storyId)[0];

      document.getElementById('story-id').value = updStory.id;
      document.getElementById('story-title').value = updStory.title;
      document.getElementById('story-content').value = updStory.content;
    }

    document.getElementById('upd-form').addEventListener('submit', async e => {
      e.preventDefault();

      const updatingStory = {
        id: document.getElementById('story-id').value,
        title: document.getElementById('story-title').value,
        content: document.getElementById('story-content').value
      }

      const updIndex = appState.get().stories.findIndex(story => story.id === updatingStory.id);

      if(updIndex === -1) {
        alert('something went really wrong :(');
        return;
      }

      updatingStory.user = appState.get().stories[updIndex].user;
      updatingStory.createdAt = appState.get().stories[updIndex].createdAt;

      /**
       * Details
       * 
       * @asignee       Saga
       * @DatabaseRef   stories
       * @Task          Write firebase update function to update the database
       * @Notes         Use the @var updatingStory variable to fetch the updated data, 
       *                and query the database to udpate its value.
       */

      try {
        const storiesRef = Firebase.getDatabaseInstance().ref('stories');
        await storiesRef.child(updatingStory.id).set(updatingStory);

        document.getElementById('story-id').value = null;
        document.getElementById('story-title').value = '';
        document.getElementById('story-content').value = '';
  
        $('#upd-modal').modal('toggle');
      } catch (error) {
        alert(error.message);
      }

    });
  }

}