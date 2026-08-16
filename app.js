const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const joi = require('joi')
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const campground = require('./models/campground')
const { campgroundSchema, reviewSchema } = require('./schemas')
const Review = require('./models/review')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(() => {
    console.log(`MONGO CONNECTION OPEN`)
})
.catch( err => {
    console.log(`HOUSTON. WE HAVE A PROBLEM`)
    console.log(err)
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const port = 6190
const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const validateCampground = (req, res, next) => {   

   const { error } = campgroundSchema.validate(req.body)
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

app.get('/', (req, res) => {
    res.render('campgrounds/home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {

    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
    
     
        const campground = new Campground(req.body.campground)
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)    
}))

//** SHOW APP.GET */
app.get('/campgrounds/:id', catchAsync(async (req, res) => {

    const id = req.params.id    
    const campground = await Campground.findById(id).populate('reviews')
    
    res.render('campgrounds/show', { campground })    
}))

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {

    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

//---------  Reviews Route

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async(req, res) => {

   const campground = await Campground.findById(req.params.id)
   const review = new Review(req.body.review)
   campground.reviews.push(review)
   await review.save()
   await campground.save()
   console.log(req.body.review.rating)
   res.redirect(`/campgrounds/${campground._id}`)
}))

//  ----------- All Routes completed

app.all('/{*path}', (req, res, next) => {

    //res.send(' <h1>404 Error 🦖 </h1>')
    next( new ExpressError('Page Not Found', 404) )
})

//******* Generic error message */
app.use((err, req, res, next) => {

    const { statusCode=500 } = err
    if(!err.message) err.message = "Aww man, something is wrong here!"
    res.status(statusCode).render('error', { err })
    
    
})


app.listen(port, () => 
    {
        console.log(`Servicing on port ${port}`)
    })

    //include this code in the SHOW app.get function
    //console.log(await Campground.find({}))       
    //const campground = await Campground.findByIdAndDelete('6a5285630b86abf5cf2dce58')

    //      http://localhost:6190/campgrounds/

    // POST/campgrounds/:id/reviews