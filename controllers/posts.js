const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const fetch = require('cross-fetch');

module.exports = {
	getProfile: async (req, res) => {
		try {
			const posts = await Post.find({ user: req.user.id });
			res.render('profile.ejs', { posts: posts, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	getFeed: async (req, res) => {
		try {
			// get upcoming launches
			const launchData = await fetch(
				'https://lldev.thespacedevs.com/2.2.0/launch/upcoming'
			);
			const launches = await launchData.json();
			// get upcoming events
			const eventsData = await fetch(
				'https://lldev.thespacedevs.com/2.2.0/event/upcoming'
			);
			const events = await eventsData.json();
			res.render('feed.ejs', {
				launches: launches.results,
				events: events.results,
			});
		} catch (err) {
			console.log(err);
		}
	},
	getPost: async (req, res) => {
		try {
			let url = `https://lldev.thespacedevs.com/2.2.0/launch/${req.params.id}`;
			const data = await fetch(url);
			const launch = await data.json();
			console.log(data);
			res.render('post.ejs', {
				launch: launch,
			});
		} catch (err) {
			console.log(err);
		}
	},
	getEvent: async (req, res) => {
		try {
			let url = `https://lldev.thespacedevs.com/2.2.0/event/upcoming/${req.params.id}`;
			const data = await fetch(url);
			const event = await data.json();
			console.log(event);
			res.render('event.ejs', {
				event: event,
			});
		} catch (err) {
			console.log(err);
		}
	},
	likePost: async (req, res) => {
		try {
			await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$inc: { likes: 1 },
				}
			);
			console.log('Likes +1');
			res.redirect(`/post/${req.params.id}`);
		} catch (err) {
			console.log(err);
		}
	},
	deletePost: async (req, res) => {
		try {
			// Find post by id
			let post = await Post.findById({ _id: req.params.id });
			// Delete image from cloudinary
			await cloudinary.uploader.destroy(post.cloudinaryId);
			// Delete post from db
			await Post.remove({ _id: req.params.id });
			console.log('Deleted Post');
			res.redirect('/profile');
		} catch (err) {
			res.redirect('/profile');
		}
	},
};
