import { Router } from "express";
import { productMongo } from "../manager/product/productManagerMongo.js";


const router = Router()

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/createProd', (req, res) => {
    res.render('createProd')
})

router.get("/alert", (req, res) => {
    const cook = req.cookies
    res.render("alert", { cook })
})
router.get('/allproducts', async (req, res) => {
    const allprod = await productMongo.getproducts()
    res.render("home", {allprod})
});


router.get('/realTimeProducts', (req,res)=>{

    res.render('realTimeProducts')
})

router.get('/message', (req,res)=>{

    res.render('message')
})


export default router