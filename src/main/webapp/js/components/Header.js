import Observer from "../lib/Observer.js";

export default class Header extends Observer {

  constructor(currentState = {}) {
    super();
    this.appState = currentState;
  }
  
  createTemplate(user) {
    return `<div class="d-flex bd-highlight">
    <div class="img_cont">
      <div
        class="rounded-circle user_img h4 text-white font-weight-light">${user.name.toUpperCase().charAt('0')}</div><span
        class="online_icon"></span>

    </div>
    <div class="user_info">
      <span>${user.name}</span>
    </div>
  </div>
  <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
  <div id="menu" class="action_menu">
  <ul>
    <li id="logout-btn"><i class="fas fa-ban"></i>Logout</li>
  </ul>
  </div>`;
  }

  render(currentState, idSelector) {
    const template = this.createTemplate(currentState.user);
    const parent = document.getElementById(idSelector);

    parent.innerHTML = template;

    this.bindEvents();
  }

  bindEvents() {
    const menuBtn = document.getElementById('action_menu_btn');
    menuBtn.addEventListener('click', e => {
      $('.action_menu').toggle();
    });

    document.getElementById('logout-btn').addEventListener('click', e => {
      this.appState.get().user.logout();
    });
  }

  update(currentState) {
    this.render(currentState, "header-container");
  }

}