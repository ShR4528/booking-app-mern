import jwt from 'jsonwebtoken'
import { createError } from './error.js'


export const verifyTokent = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, 'You are not auth '))
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid'))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyTokent(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, 'You are not aut!'))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyTokent(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            if (err) return next(createError(403, 'You are not aut!'))
        }
    })
}