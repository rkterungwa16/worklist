[![Build Status](https://travis-ci.org/rkterungwa16/worklist.svg?branch=develop)](https://travis-ci.org/rkterungwa16/worklist)
[![Coverage Status](https://coveralls.io/repos/github/rkterungwa16/worklist/badge.svg?branch=develop)](https://coveralls.io/github/rkterungwa16/worklist?branch=develop)


# WorkList


## Introduction
*  **`WorkList`** is an Express Js Powered web app built to enable users to create a list of things todo.
* You can find the link to the application here **[kombol-worklist](https://kombol-worklist.herokuapp.com)**.

*  It has the following features;
  *  Allows users to:
        *  Sign in or Sign up and logout when signed in
        *  Create a list of things to do.
        *  Create a list of tasks for each todo.
        *  Click on a task that is completed
        *  Set reminders for tasks
        *  Collaborate with other users for a todo
        *  Users can edit a task
        *  Users can delete a task

## Key Features
Based on project requirement, Worklist has the following features:

### Users
- Users can successfully create a new account by providing some signup details
- Registered Users can successfully login to the application
- A jsonwebtoken is generated on successful signup/login
- Users can edit their login information
- Users can signup/signin using google+ authentication

### Todo
- A todo created by a registered user
- A todo can be shared with other users

### Tasks
- A user can create tasks for each todo
- Reminders can be set on each task
- Tasks have priority with color codes for each priority
- Tasks can be marked as completed
- Tasks can be edited
- Tasks can be deleted

## Technologies
*  **[Node.js](https://nodejs.org/en/)**
*  **[Express Js](https://expressjs.com/)**
*  **[MongoDB](https://www.mongodb.com/)**
*  **[React.js](https://reactjs.org/)**
*  **[Redux.js](http://redux.js.org/)**

## Documentation
For more in depth documentation see: **[here](https://kombolworklist.docs.apiary.io/)**


## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
    >`https://github.com/rkterungwa16/worklist`

*  Navigate to the repo's folder on your computer
  *  `cd worklist/`
*  Install the app's dependencies. For best results, using a node package manager.
  *  `npm install`
* 
    >In order to use app dependencies, you need to install it through **npm**. You also need to have **node** installed on your system.

* Run the app
  *  `npm start`
That should start your server. You are ready to go from there

## Contributing to the Project
Contributions are welcome and appreciated. To contribute
* Fork this repository [here](https://github.com/rkterungwa16/worklist/)
* Open a terminal and execute the following command to make a local copy
`$ git clone git@github.com:your-username/worklist`
* Run this code to navigate into the folder `cd worklist`
* Make your contributions to your local repo
* Add a connection to the original repo using
`$ git remote add repo_nickname https://github.com/rkterungwa16/worklist/`
* Note that `repo_nickname` is a nickname you choose.
* Run `git remote -v` to verify that the connection is established
* Make your contributions to your local copy of the project
* Run `git add` and `git commit` to commit your contributions to the project
* Run `git push` to push your changes to your copy of the repository
* If you feel you've made a contribution that will improve the project, raise a Pull Request against the `develop` branch.
* Be descriptive enough about your contributions so other contributors will understand what you've done
* I look forward to your Pull Requests!

## Limitations
  kombol-worklist's current limitations (aka features in development) include:
  - User cannot archive tasks

## License
  This project is available for use and modification under the MIT License. See the LICENSE file for more details.
