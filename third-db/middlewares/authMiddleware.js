const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.sendStatus(401)
    }

    const token = authHeaders.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }

        req.user = user;

        next()
    })
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.json({
            success: false,
            message: 'access denied'
        })
    };
    next()
}