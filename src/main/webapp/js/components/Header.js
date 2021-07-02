export default class Header {

  constructor(currentState = {}) {
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

  render(idSelector) {
    // TODO: IMPLEMENT USER AUTH AND PASS THE PARAM

    const template = this.createTemplate(this.appState.get().user);
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

}