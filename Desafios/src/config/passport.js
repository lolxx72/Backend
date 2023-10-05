import passport from "passport";

import {Strategy as localStrategy} from "passport-local";

import githubStrategy from "passport-github2";

import { userModel } from "../DB/models/user.model.js";

import { userMongo } from "../manager/user/userManagerMongo.js";

import {compareHash } from "../utils.js";

import { Strategy as JWTstrategy, ExtractJwt} from "passport-jwt";

import { Cookie } from "express-session";


// strategy

 passport.use("local", new localStrategy(

async (username, password, done) => {

console.log("hola")

try {

const userDb = await userModel.findUser(username)

if (!userDb) {

return done(null, false)

}

const passwordCheck = await compareHash(password, userDb.password)

if (!passwordCheck) {

return done(null, false)

}

return done(null, userDb)

}

catch (error) { done(error) }

}))



passport.use(new githubStrategy(

{clientID: 'Iv1.0cb6621ba9e659e0',

clientSecret: '5133800ffcdf060882d2294c44f530d2db8ef9a5',

callbackURL:'http://localhost:8080/api/user/github'

},

async function (accessToken, refreshToken, profile, done) {

try {

const userbd = await userMongo.findUser(profile.username)

if(userbd){

console.log("Usuario existente")

return done(null, userbd)

}

const newUser={

first_name: profile.displayName.split(" ")[0],

last_name: profile.displayName.split(" ")[1],

username: profile.username,

email: profile.username,

age: 10,

password: " ",

githubLog:"true"}

await userMongo.createUser(newUser)

return done(null, newUser)}

catch(error){done(error)}}

))

// JWT strategy
const SECRET_KEY = 'secretKey'
const cookieExtractor =  (req) => {
    const cook=req.cookies["token"]
    return cook

}

passport.use("jwt",new JWTstrategy({
    secretOrKey:"secretKey",
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
},
    async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        }
        catch (error) { done(null, false) }
    })) 

//serial and deserial User

passport.serializeUser((user, done) => {

try {

done(null, user);

}

catch (error) { done(error)}

});

passport.deserializeUser(async (data, done) => {

try {

const user = await userMongo.findUser(data)

done(null, user);

}

catch (error) { done(error)}

});