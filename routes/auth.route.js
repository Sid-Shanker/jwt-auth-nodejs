const route = require('express').Router();
const user_controller = require('../controllers/user.controller');
const auth_middleware = require('../middlewares/auth.middleware');



route.post('/register', user_controller.Register);
route.post('/login', user_controller.Login);
route.post('/token', auth_middleware.verifyRefreshToken, user_controller.GetAccessToken);
route.get('/logout', auth_middleware.verifyToken, user_controller.Logout);

module.exports = route;