function checkAuthority(req, res, next) {
    if (!req.headers) {
        const err = "Not authorized"
        res.status(403)
        next(err)
    }

    if (req.headers.isadmin === 'true') {
        next()
    }
    else {
        const err = "Not authorized";
        res.status(403)
        next(err)
    }
}

module.exports = {
    checkAuthority
}