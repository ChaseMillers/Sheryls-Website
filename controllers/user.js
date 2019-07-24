const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id)
        // populate followers and following users array
        .populate("following", "_id name")
        .populate("followers", "_id name")
        // execute error or user
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user; // adds profile object in req with user info
            next();
        });
};