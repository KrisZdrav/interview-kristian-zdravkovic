# Light Todo App v1.0

A simple Todo App with add, edit and complete options, made witth React, Node and express js.

Libraries used:

- Lodash
- Moment.js
- Materialize-css
- Axios
- React Router
- uuid

# Starting development

After cloning the repository we need to create docker network for the first time from the root folder run next command:

    docker network create todo-app

After creating the network we need to build our containers with command:

    docker-compose up --build

To use the app open in browser [127.0.0.1:8080](http://127.0.0.1:8080)

# Special features

- Use spacebar key (or the plus button) to add a new Todo
- Use escape key to navigate back to Todo List
