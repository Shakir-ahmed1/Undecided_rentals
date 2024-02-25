const Review = require('../models/reviewModel');
const { houseModel } = require('../models/housesModel');
const User = require('../models/userModel');

async function postReview(req, res) {
  const { houseId } = req.params;
  const { text } = req.body;
  try {
    const house = await houseModel.findOne({ _id: houseId });
    const user = await User.findOne({ _id: req.user });
    const checkReview = await Review.findOne({ user: req.user, house: house.id });
    if (checkReview) {
      return res.status(400).json({ error: 'Bad request, you have already reviewed the house' });
    }
    if (house.user === user) {
      return res.status(400).json({ error: 'Bad request, you can not review your own house' });
    } if (house) {
      await Review.validate({ user, house, text });
      const review = await Review.create({ user: req.user, house: houseId, text });
      return res.status(201).json(review);
    }
    return res.status(404).json({ error: 'Not found. cannot find the house' });
  } catch (e) {
    const errors = { text: '' };
    if (e.message.includes('Validation failed')) {
      Object.values(e.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return res.status(400).json({ errors });
  }
}
async function getReview(req, res) {
  const { reviewId } = req.params;

  try {
    const review = await Review.findOne({ _id: reviewId });
    if (review) {
      return res.json(review);
    }
    return res.status(404).json({ error: "review couldn't be found" });
  } catch (e) {
    return res.status(500).json({ error: 'something went wrong' });
  }
}
async function allReview(req, res) {
  try {
    const reviews = await Review.find();

    return res.json(reviews);
  } catch (e) {
    return res.status(500).json({ error: 'something went wrong' });
  }
}
async function deleteReview(req, res) {
  const { reviewId } = req.params;
  try {
    const review = await Review.findOne({ _id: reviewId });
    if (review) {
      if (review.user.toString() === req.user) {
        await review.deleteOne();
        return res.json({ success: 'review was deleted successfully' });
      }
      return res.status(403).json({ error: 'Forbidden, You are not the owner of the review' });
    }
    return res.status(404).json({ error: 'Review does not exist' });
  } catch (e) {
    return res.status(500).json({ error: 'something went wrong' });
  }
}
async function houseReview(req, res) {
  const { houseId } = req.params;
  try {
    const house = await houseModel.findOne({ _id: houseId });
    if (house) {
      const reviews = await Review.find({ house });
      return res.json(reviews);
    }
    return res.status(404).json({ error: "Page not found, house doesn't exist" });
  } catch (e) {
    return res.status(500).json({ error: 'something went wrong' });
  }
}

module.exports = {
  postReview, getReview, allReview, deleteReview, houseReview,
};
