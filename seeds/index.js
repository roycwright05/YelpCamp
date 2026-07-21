
const mongoose = require('mongoose')
const cites = require('./cities')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

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

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000) + 1
        const price = Math.floor(Math.random() * 20 ) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum adipisci suscipit, esse ut id nisi, soluta, officiis quas impedit nulla accusantium consequatur dolorum laudantium. Doloremque enim dolor atque nulla necessitatibus.',
            price
        })
        await camp.save()
    }
}

seedDB().then( () => {
    mongoose.connection.close()
})