import passport from 'passport'
import {BasicStrategy} from 'passport-http'
import {NextFunction, Request, Response} from 'express'
import { User } from '../models/User'

const notAuthorizedJson = {status: 401, message: 'Não autorizado'}

//strategy
passport.use(new BasicStrategy(async (email, password, done) =>{
    if(email && password){
        const user = await User.findOne({
            where:{email, password}
        })
        if(user){
            return done(null, user)
        }
    }
    return done(notAuthorizedJson, false)
}))

//middleware with passport
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('basic', (err, user) => {
        return user ? next() : next(notAuthorizedJson)
    })(req, res, next())
}

export default passport