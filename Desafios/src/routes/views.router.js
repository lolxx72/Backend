import { Router } from "express";
import { productMongo } from "../manager/product/productManagerMongo.js";


const router = Router()

router.get('/', async (req, res) => {
    res.render('index');
});


router.get('/allproducts', async (req, res) => {
    const allprod = await fetch('http://localhost:8080/api/products')
    const getProd= await allprod.json()
    const allProds =getProd.payload
    const allProdMap= allProds.map(e=>({
        _id:e._id,
        title:e.title,
        description:e.description,
        code: e.code,
        price:e.price,
        stock:e.stock,
        category:e.category
    }))
    res.render("home", {allProdMap})
});


router.get('/realTimeProducts', (req,res)=>{

    res.render('realTimeProducts')
})

router.get('/message', (req,res)=>{

    res.render('message')
})

router.get('/cart', async(req,res)=>{
    const cart = await fetch('http://localhost:8080/api/carts/')
    const getCart= await cart.json()
    const allprod =getCart.products
    const allProdMap= allprod.map(e=>({
        prodId:e.prodId,
        quantity:e.quantity }))
    res.render('cartId',{allProdMap})
})






export default router