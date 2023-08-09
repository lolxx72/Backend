import express  from "express";
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import {prodManager} from "./utils.js"

const app= express()
const PORT = 8080
const prod=prodManager()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/',viewsRouter)

app.engine('handlebars', engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

const httpServer= app.listen(PORT,()=>{
    console.log(`Puerto ${PORT}`)
})

const socketServer= new Server(httpServer)

socketServer.on('connection', async(socket)=>{
    console.log(`Se conectó ${socket.id}`)
    const allProds = await prod.getProducts()
    socket.on('disconnect',()=>{console.log(`Se desconectó ${socket.id}`)})
    socketServer.emit('allProds',allProds)
    
})