const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const redis_client = require('../redis_connect');

async function Register(req, res){

    // encrypt password
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const saved_user = await user.save();
        res.json({status: true, message: "Registered successfully.", data: saved_user});
    } catch (error) {
        // do logging in DB or file.
        res.status(400).json({status: false, message: "Something went wrong.", data: error});
    }
}

async function Login (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({username: username, password: password}).exec();
        

        if(user === null) res.status(401).json({status: false, message: "username or password is not valid."});
        console.log('user', user);
        const access_token = jwt.sign({sub: user._id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME});
        console.log('access_token', access_token);
        const refresh_token = GenerateRefreshToken(user._id);
        return res.json({status: true, message: "login success", data: {access_token, refresh_token}});
    } catch (error) {
        return res.status(401).json({status: true, message: "login fail", data: error});
    }

    
}

async function Logout (req, res) {
    const user_id = req.userData.sub;
    const token = req.token;

    // remove the refresh token
    await redis_client.del(user_id.toString());

    // blacklist current access token
    await redis_client.set('BL_' + user_id.toString(), token);
    
    return res.json({status: true, message: "success."});
}

function GetAccessToken (req, res) {
    const user_id = req.userData.sub;
    const access_token = jwt.sign({sub: user_id}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME});
    const refresh_token = GenerateRefreshToken(user_id);
    return res.json({status: true, message: "success", data: {access_token, refresh_token}});
}

function GenerateRefreshToken(user_id) {
    const refresh_token = jwt.sign({ sub: user_id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME });
    
    redis_client.get(user_id.toString(), (err, data) => {
        if(err) throw err;

        redis_client.set(user_id.toString(), JSON.stringify({token: refresh_token}));
    })

    return refresh_token;
}

module.exports = {
    Register,
    Login,
    Logout,
    GetAccessToken
}