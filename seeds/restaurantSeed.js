const mongoose = require('mongoose');
const cities = require('./cities')
const { cuisines, restaurantNames, adjectives, restaurantDescriptions } = require('./restaurantHelpers')
const { restaurantImages } = require('./restaurantImages')
const Restaurant = require("../models/restaurant")

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

// Function to get cuisine-appropriate images
const getCuisineImages = (cuisine) => {
    const cuisineImageMap = {
        'Italian': restaurantImages.slice(3, 6),
        'Chinese': restaurantImages.slice(6, 9),
        'Japanese': restaurantImages.slice(6, 9),
        'Korean': restaurantImages.slice(6, 9),
        'Vietnamese': restaurantImages.slice(6, 9),
        'Thai': restaurantImages.slice(6, 9),
        'Mexican': restaurantImages.slice(9, 12),
        'French': restaurantImages.slice(21, 24),
        'Indian': restaurantImages.slice(27, 30),
        'American': restaurantImages.slice(12, 15),
        'Mediterranean': restaurantImages.slice(18, 21),
        'Spanish': restaurantImages.slice(18, 21),
        'Brazilian': restaurantImages.slice(30, 33),
        'German': restaurantImages.slice(30, 33)
    };
    
    return cuisineImageMap[cuisine] || restaurantImages.slice(0, 6);
};

const seedDB = async () => {
    await Restaurant.deleteMany({});
    console.log("Cleared existing restaurants");
    
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const priceRanges = ['$', '$$', '$$$', '$$$$'];
        const cuisine = sample(cuisines);
        const phoneNumber = `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
        
        const restaurant = new Restaurant({
            name: `${sample(adjectives)} ${cuisine} ${sample(restaurantNames)}`,
            cuisine: cuisine,
            address: `${Math.floor(Math.random() * 9999) + 1} Main St, ${cities[random1000].city}, ${cities[random1000].state}`,
            priceRange: sample(priceRanges),
            phone: phoneNumber,
            website: `https://${sample(adjectives).toLowerCase()}${cuisine.toLowerCase()}${sample(restaurantNames).toLowerCase()}.com`,
            author: '6463b7ced72a8400148d10f9',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: sample(restaurantImages),
                    filename: `FlavorQuest/restaurant_${i}`
                }
            ],
            description: sample(restaurantDescriptions)
        })
        await restaurant.save();
        if ((i + 1) % 50 === 0) {
            console.log(`Created ${i + 1} restaurants...`);
        }
    }
    console.log("Seeding completed! Created 200 restaurants.");
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database connection closed.");
})