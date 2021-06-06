const route = require('express').Router();
const auth_middleware = require('../middlewares/auth.middleware');

route.get('/dashboard', auth_middleware.verifyToken, (req, res) => {
    return res.json({status: true, message: "Hello from dashboard."});
});

module.exports = route;