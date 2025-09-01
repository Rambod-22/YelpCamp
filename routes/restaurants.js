const express = require('express');
const router = express.Router();
const ExpressError = require('../helpers/ExpressError')
const catchAsync = require('../helpers/catchAsync')
const { isLoggedIn, isAuthor, validateRestaurant } = require('../middleware')
const Restaurant = require('../models/restaurant')
const restaurants = require('../controllers/restaurants')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(restaurants.index))
    .post(isLoggedIn, upload.array('image'), validateRestaurant, catchAsync(restaurants.createRestaurant))


router.get('/new', isLoggedIn, restaurants.renderNewForm)

router.route('/:id')
    .get(catchAsync(restaurants.showRestaurant))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateRestaurant, catchAsync(restaurants.updateRestaurant))
    .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleteRestaurant))




router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(restaurants.editRestaurant))





module.exports = router