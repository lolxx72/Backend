import express, { urlencoded }  from "express";

import { __dirname } from "./utils.js";
import productsRouter from './routes/products.router.js'
import cartsRouter from "./routes/carts.router.js"
const app= express()
const PORT =8080



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"./publc"))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)



app.listen(PORT,()=>{
    console.log(`Puerto ${PORT}`)
})