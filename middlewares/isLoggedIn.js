const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async (req, res, next) => {
    if (req.cookies.token=== "" || req.cookies.token === undefined) {
        req.flash('error', 'You must be logged in to access this page');
        res.redirect('/login');
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email})
        .select('-password -__v');
        req.user = user;
        next();
    }
    catch(err) {
        req.flash('error', 'Invalid token, please login again');
        res.redirect('/login');
    }
}