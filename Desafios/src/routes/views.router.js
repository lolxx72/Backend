import { Router } from "express";
import { prodManager,msjManager } from "../utils.js";


const router =Router()
const prod =prodManager()
const msj =msjManager()

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/allproducts', async (req, res) => {
    let allprod = await prod.getProducts()
    res.render('home',{allprod});
});

router.get('/createProd', (req,res)=>{
    res.render('createProd')
})

router.get('/realTimeProducts', (req,res)=>{

    res.render('realTimeProducts')
})
router.get('/searchProd', (req,res)=>{

    res.render('searchProd')
})
router.get("/message",async (req,res)=>{
    const message =await msj.readMessage()
    await msj.deleteMesage()
    res.render("message",{message})
})


export default router;