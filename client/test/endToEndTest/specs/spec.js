describe('PostIt App', () => {
  it('should have not have a title', () => {
    browser.get('http://localhost:3000/#/');
    expect(browser.getTitle()).toEqual('');
  });

  it('should locate button to create user account', () => {
    browser.get('http://localhost:3000/#/');
    const createUser = browser.findElement(by.id('signup-btn'));
    expect(createUser.getText()).toEqual('SIGNUP');
  });

  it('should create a new user', () => {
    browser.get('http://localhost:3000/#/');
    const username = browser.findElement(by.id('signup-username'));
    const password = browser.findElement(by.id('signup-password'));
    const email = browser.findElement(by.id('signup-email'));
    const button = browser.findElement(by.id('signup-btn'));
    username.sendKeys('django');
    password.sendKeys('django');
    email.sendKeys('django@gmail.com');
    button.click();
    browser.sleep(2000).then(() => {
      expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/');
    });
  });

  it('should login a registered user', () => {
    browser.get('http://localhost:3000/#/login');
    const email = browser.findElement(by.id('login-email'));
    const password = browser.findElement(by.id('login-password'));
    const button = browser.findElement(by.id('login-btn'));
    email.sendKeys('django@gmail.com');
    password.sendKeys('django');
    button.click();
    browser.sleep(10000).then(() => {
      expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/dashboard');
      browser.get('http://localhost:3000/#/dashboard');
      const createTodo = browser.findElement(by.id('todo-btn'));
      expect(createTodo.getText()).toEqual('CREATE TODO LIST');
      const todo = browser.findElement(by.id('todo-input-form'));
      const button = browser.findElement(by.id('todo-btn'));
      todo.sendKeys('Another todo');
      button.click();
      const todoLink = browser.findElement(by.id('todo-link-btn5a0b3379756f4f6d096b46d3'));
      todoLink.click();
      // expect(todoText.getText()).toEqual('Another todo');
      browser.sleep(10000).then(() => {
        const task = browser.findElement(by.id('task-input-form'));
        const taskClick = browser.findElement(by.id('task-btn'));
        task.sendKeys('Another task');
        taskClick.click();
        const nav = browser.findElement(by.id('profile-dropdown'));
        nav.click();
        const editProfileClick = browser.findElement(by.id('edit-profile-link'));
        editProfileClick.click();
        browser.sleep(2000).then(() => {
          expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/edit-profile');
          browser.get('http://localhost:3000/#/edit-profile');
          const goBack = browser.findElement(by.id('edit-back-btn'));
          goBack.click();
          browser.get('http://localhost:3000/#/dashboard');
          const nav = browser.findElement(by.id('profile-dropdown'));
          nav.click();
          const profilePic = browser.findElement(by.id('change-profile-pic-link'));
          profilePic.click();
          browser.sleep(2000).then(() => {
            browser.get('http://localhost:3000/#/change-profile-picture');
            const profilePic = browser.findElement(by.id('dropzone-click'));
            profilePic.click();
          });
        });
      });
    });
  });
});

// describe('Protractor Demo App', () => {

//   it('should locate button to create user account', () => {
//     browser.get('http://localhost:3000/#/login');
//     const email = browser.findElement(by.id('login-email'));
//     const password = browser.findElement(by.id('login-password'));
//     const button = browser.findElement(by.id('login-btn'));
//     email.sendKeys('django@gmail.com');
//     password.sendKeys('django');
//     button.click();
//     browser.get('http://localhost:3000/#/dashboard');
//     const createUser = browser.findElement(by.id('todo-btn'));
//     expect(createUser.getText()).toEqual('CREATE TODO LIST');
//   });
// });
