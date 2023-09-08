import { Router } from "express";
import { userMongo } from "../manager/user/userManagerMongo.js";
import session from "express-session";
import MongoStore from "connect-mongo";
const router = Router();

router.post('/', async (req, res) => {
    const { last_name, first_name, email, age, password } = req.body
    console.log(last_name, first_name, email, age, password)
    if (!last_name || !first_name || !email || !age || !password) {
        res.status(400).json({ messge: "Ingrese todos los datos" })
    } else {
        const userExist = await userMongo.findUser(email)
        if (userExist) {
            res.status(400).json({ messge: "Utilice otro e-mail" })
        } else {
            const user = await userMongo.createUser(req.body)
            res.status(200).json({ message: "Usuario creado" })
        }
    }
}
)

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ messge: "Ingrese todos los datos" })
    }
    const userExist = await userMongo.findUser(email)
    if (!userExist) {
        res.status(400).json({ messge: "Algunos datos estan mal" })
    }
    if (userExist.password !== password) {
        res.status(400).json({ messge: "Algunos datos estan mal" })
    }
    req.session
    console.log(req.session)
    res.cookie("user", userExist).redirect("/index")
})

router.get('/logout', async (req, res) => {

    
    res.clearCookie('user').redirect("/")
})


export default router