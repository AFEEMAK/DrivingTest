const User = require('../models/User');
module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId).exec();
        if (!user) {
            return res.redirect('login');
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while checking the user session');
    }
};