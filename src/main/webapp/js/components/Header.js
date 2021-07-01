export default class Header {
  
  createTemplate(user) {
    return `<div class="d-flex bd-highlight">
    <div class="img_cont">
      <img
        src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
        class="rounded-circle user_img"> <span
        class="online_icon"></span>
    </div>
    <div class="user_info">
      <span>${user.name}</span>
    </div>
  </div>
  <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
  <div id="menu" class="action_menu">
  <ul>
    <li><i class="fas fa-ban"></i>Logout</li>
  </ul>
  </div>`;
  }

  render(idSelector) {
    // TODO: IMPLEMENT USER AUTH AND PASS THE PARAM
    const template = this.createTemplate({ name: 'Jason Statham' });
    const parent = document.getElementById(idSelector);

    parent.innerHTML = template;

    this.bindEvents();
  }

  bindEvents() {
    const menuBtn = document.getElementById('action_menu_btn');
    menuBtn.addEventListener('click', e => {
      $('.action_menu').toggle();
    });
  }

}