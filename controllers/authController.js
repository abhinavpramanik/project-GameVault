const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken= require('../utils/generateToken');
const e = require('express');

module.exports.registerUser = async (req, res) => {

    let { fullname, email, password, contact } = req.body;
    
    let user = await userModel.findOne({email: email});
    if (user) {
        req.flash('error','User already exists. Please Login')
        // return res.status(400)
        return res.redirect('/login')
    }
    //for flash messages during fill form
    // if (!fullname || !email || !password || !contact) {
    //     return res.status(400).send("All fields are required");
    // }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt , async function(err, hash) {
            if(err) {
                return res.status(500).send(err.message);      
            }
            else{
                const user = await userModel.create({
                    fullname: fullname,
                    email: email,
                    password: hash,
                    contact: contact
                });
                let token = generateToken(user);
                res.cookie('token', token);
                req.flash('success','User registered successfully!, Login Now');
                res.redirect('/login')
            }
        });
    });

}

module.exports.loginUser = async (req, res) => {
    try{
        let { email, password } = req.body;
        let user = await userModel.findOne({email});
    
        if (!user) {
            req.flash("error", "Invalid email or password");
            return res.redirect('/login')
        }
    
        bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
                let token = generateToken(user);
                res.cookie('token', token);
                req.flash("success", "Login successful");
                return res.redirect("/product");
            }
            else{
                req.flash("error", "Invalid email or password");
                return res.redirect('/login')
            }
        });
    }
    catch(err) {
        // console.log(err);
        // res.status(500).send("Internal server error");
        req.flash("error", "Invalid email or password");
        res.redirect('/login')
    }
}

module.exports.logoutUser = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}