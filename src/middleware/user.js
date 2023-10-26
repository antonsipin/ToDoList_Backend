const isAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next()
    }
}

const userName = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.userName = req.session.user.name
    }
    next()
}

module.exports = { 
    isAuth,
    userName
}