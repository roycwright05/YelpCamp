to start mongo, connect 

mongod
mongosh

For the third one, in order to successfully use db.users.find() you need to:
1. run 'mongo'
2. run 'show dbs'
3. run 'use relationshipDemo' (the name of the folder where your db is)
4. run 'show collections' (here you will see 'users')
5. run 'db.users.find()'

mongodb://127.0.0.1:27017/

morgan - middleware

New Middleware:

ejs-mate

Bootstraps link:
https://getbootstrap.com/

npm i bootstrap@5.3.8

No need to install

#add a link to the header, and add two script tags to the body at the end of your boilerplate
#template file

image: `https://picsum.photos/400?random=${Math.random()}`,

So, instead of this line in your seeds/index.js code:

image: 'https://source.unsplash.com/collection/483251',
Change that line to exactly the line shown below (copy-paste the line below into your code as a replacement):

image: `https://picsum.photos/400?random=${Math.random()}`,

https://github.com/Colt/YelpCamp/blob/c12b6ca9576b48b579bc304f701ebb71d6f9879a/seeds/seedHelpers.js


<!-- # app.all('/{*path}', (req, res, next) => { -->

    JOI - data validator for javaScript

    https://joi.dev/api/18.x.x

    npm install mongoose@"<7.0.0"

https://www.udemy.com/course/the-web-developer-bootcamp/learn/lecture/36751378#questions/13952562

GitHub link:        https://github.com/roycwright05/YelpCamp/tree/remote

<!-- router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});  -->

<!-- 1. In the middleware.js file, add the code that creates a new middleware function called storeReturnTo which is used to save the returnTo value from the session (req.session.returnTo) to res.locals:

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
Also, just a note: as seen in the upcoming video lecture, you still need to add the req.session.returnTo = req.originalUrl line to the isLoggedIn middleware (in the middleware.js file), like this:

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
2. In the POST /login route (in the routes/users.js file), call the storeReturnTo middleware function before passport.authenticate(). Remember that middleware functions are executed in the order they are specified in the route. So, in this case, storeReturnTo should be called first, followed by passport.authenticate() and then the final middleware function to redirect the user.

First, at the top of the routes/users.js code, add this line to import the storeReturnTo function from the middleware.js file that we just created:

const { storeReturnTo } = require('../middleware');
Then, in the same file, add the storeReturnTo middleware function before the passport.authenticate middleware in the /login POST route.

router.post('/login',
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    // Now we can use res.locals.returnTo to redirect the user after login
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
        res.redirect(redirectUrl);
    });
In the login POST route code above, be sure to update the redirectUrl variable line to this: const redirectUrl = res.locals.returnTo || '/campgrounds'; -->

