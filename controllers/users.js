const User = require('../models/user')

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Welcome To FlavorQuest!')
        res.redirect('/restaurants')
    }
    catch (e) {
        if (e.code === 11000) {
            req.flash('error', 'A user with that email already exists.')
        } else {
            req.flash('error', e.message)
        }
        res.redirect('/register')
    }
}

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = req.session.returnTo || '/restaurants'
    delete req.session.returnTo;
    res.redirect(redirectUrl)

}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye')
    res.redirect('/restaurants')
}