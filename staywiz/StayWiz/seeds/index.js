const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');

mongoose.set("strictQuery",false);
main().catch(err=>console.log(err));
async function main(){
await mongoose.connect('mongodb://127.0.0.1:27017/staywiz');
console.log("Connection Open")
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const camp = new Campground({
            author: '643bd0e370dfdaca3a707b03',
            location: `${cities[i].city}, ${cities[i].state}`,
            title: `${cities[i].title}`,
            image: `${cities[i].image}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price : 1000*i,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})