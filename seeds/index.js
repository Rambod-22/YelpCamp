const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require("../models/campground")
mongoose.connect('mongodb+srv://rambod22:Rambod2013@cluster0.exifm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price: price,
            author: '6463b7ced72a8400148d10f9',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/dxsrcnub4/image/upload/v1630205235/YelpCamp/qvebpmn1c7uyogty3hz3.jpg',
                  filename: 'YelpCamp/qvebpmn1c7uyogty3hz3'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dxsrcnub4/image/upload/v1630205235/YelpCamp/g2grhbclqadnh56heswk.jpg',
                  filename: 'YelpCamp/g2grhbclqadnh56heswk'
                }
              ],
            description: "    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis velit libero illo, consectetur officia eos ad ullam ut eligendi quam excepturi hic temporibus adipisci est tempora minima assumenda ab sapiente!"
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})