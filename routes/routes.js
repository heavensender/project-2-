const UserController = require("../controller/userController");
const routes = [
 { path: '/', method: 'get', controller:  UserController.root },
 { path: '/index', method: 'get', controller: UserController.index },
 { path: '/new', method: 'get', controller: UserController.New },
 { path: '/create', method: 'post', controller: UserController.Create },
 { path: '/show/:id', method: 'get', controller: UserController.Show },
 { path: '/update/:id', method: 'post', controller: UserController.Update },
 { path: '/destroy/:id', method: 'get', controller: UserController.Delete },
]

module.exports = routes;