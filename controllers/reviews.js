const Restaurant = require('../models/restaurant')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        req.flash('error', 'Cannot find that restaurant!')
        return res.redirect('/restaurants')
    }
    const review = new Review(req.body.review);
    review.author = req.user._id;
    restaurant.reviews.push(review);
    await review.save();
    await restaurant.save();
    req.flash('success', 'Successfully made a new review!')
    res.redirect(`/restaurants/${restaurant._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/restaurants/${id}`)
}