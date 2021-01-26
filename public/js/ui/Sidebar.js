/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();

  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarOpen = document.querySelector('.sidebar-toggle');

    sidebarOpen.addEventListener('click',(e)=>{
      const body = document.body;
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
  
    const buttons = Array.from(document.querySelectorAll('li a'));

    buttons[0].addEventListener('click', login);
    buttons[1].addEventListener('click', register);
    buttons[2].addEventListener('click', logout);

    function login() {
      App.getModal( 'login' ).open();
    }

    function register() {
      App.getModal( 'register' ).open();
    }
 
    function logout() {
      User.logout('', (err, response) => {
        if (response)
          App.setState('init');
      });
    }  

  }

}
