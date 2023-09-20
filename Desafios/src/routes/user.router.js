import { Router } from "express";
import {userMongo} from "../manager/user/userManagerMongo.js";
import { hashdata , compareHash } from "../utils.js";
import passport from "passport";

const router = Router();


router.post('/', async (req, res) => {
    const { last_name, first_name, email, age, password } = req.body
    if (!last_name || !first_name || !email || !age || !password) {
        res.status(400).json({ messge: "Complete todos los datos" })
        return
    }
    const userExist = await userMongo.findUser(email)
    if (userExist) {
        res.status(400).json({ messge: "Utilice otro email" })
        return
    }
    const hashPassword = await hashdata(password)
    const user = await userMongo.createUser({...req.body,password:hashPassword})
    res.status(200).json({ message: `Usuario creado: ${user}` })
    
}
)

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        res.status(400).json({ messge: "Complete todos los datos" })
    }
    const userExist = await userMongo.findUser(email)
    if (!userExist) {
        res.status(400).json({ messge: "Algún dato es incorrecto" })
    }
    const checkPassword = await compareHash(password, userExist.password)
    if (!checkPassword) {
        res.status(400).json({ messge: "Algún dato es incorrecto" })
    }
    
    req.session['email'] = email
    console.log(req.session)
    res.status(200).redirect("/index")
}) 

/* router.post('/login', passport.authenticate('local',{failureRedirect:"/"}), 
(req, res) => {
    console.log("hola")
    res.redirect("/index")})
 */


    router.get('/logout', async (req, res) => {
        req.session.destroy()
        res.clearCookie("connect.sid").redirect("/")
    })
    
    router.get("/githubSignUp",passport.authenticate('github', { scope: [ 'user:email' ] }))

    router.get("/github", passport.authenticate('github', { failureRedirect: '/login' }),
        async (req, res) => {
            
            res.redirect("/index")

        })

export default router;