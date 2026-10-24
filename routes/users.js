const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync( async (req, res) => {

   try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash('success', `Bienvenidos A YelpCamp`);
    res.redirect('/campgrounds');
   }catch(e){
    //console.log(registeredUser);
    req.flash('error', `${e.message}`);
    res.redirect('/register');
   } 
  
}));

//-- Create a route to login

    router.get('/login', (req, res) => {
        res.render('users/login');
    });

//-- Create a route to verify login credentials

    router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),(req, res) => {
            req.flash('success', 'Welcome back!');
            res.redirect('/campgrounds');
    });

    router.get('/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Come back soon! 👋');
            res.redirect('/campgrounds');
        });
    });

module.exports = router;

// timmeh2
// timmeh2@gmail.com