const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(() => {
    console.log(`MONGO CONNECTION OPEN`)
})
.catch( err => {
    console.log(`HOUSTON. WE HAVE A PROBLEM`)
    console.log(err)
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
});

const port = 6190;
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//-------- Some session updates

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

//-------- Passport needs to be set AFTER session 
app.use(passport.initialize());
app.use(passport.session({ secret: 'algo'}));
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
});

// app.get('/fakeUser', async(req, res) => {

//     const user = new User({ email: 'saharYM@gmail.com', username: 'saharYM'});
//    const newUser = await User.register(user, 'rabbit');
//    res.send(`<h2>${newUser}</h2>`);
// });

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


const validateCampground = (req, res, next) => {   

   const { error } = campgroundSchema.validate(req.body);
   if(error){
    const msg = error.details.map( el => el.message).join(',')
    throw new ExpressError(msg, 400)
   }else{
        next()
   }
  
}

const validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body)
    //console.log(error)
    if(error){
        const msg = error.details.map( el => el.message).join(',')
        throw new ExpressError(msg, 400)
       }else{
            next()
       }
}

//app.use('/campgrounds', campgrounds)

app.get('/', (req, res) => {
    res.render('campgrounds/home')
});



//  ----------- All Routes completed

app.all('/{*path}', (req, res, next) => {

    //res.send(' <h1>404 Error 🦖 </h1>')
    next( new ExpressError('Page Not Found', 404) );
});

//******* Generic error message */
app.use((err, req, res, next) => {

    const { statusCode=500 } = err
    if(!err.message) err.message = "Aww man, something is wrong here!"
    res.status(statusCode).render('error', { err });    
    
});


app.listen(port, () => 
    {
        console.log(`Servicing on port ${port}`);
    });

    //include this code in the SHOW app.get function
    //console.log(await Campground.find({}))       
    //const campground = await Campground.findByIdAndDelete('6a5285630b86abf5cf2dce58')

    //      http://localhost:6190/campgrounds/

    // POST/campgrounds/:id/reviews