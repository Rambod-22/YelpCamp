const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: {virtuals: true}}
const RestaurantSchema = new Schema({
    name: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$', '$$$$'],
        required: true
    },
    cuisine: String,
    description: String,
    address: String,
    phone: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

RestaurantSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/restaurants/${this._id}">${this.name}</a></strong>
    <p>${this.description}</p>`
})

RestaurantSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);