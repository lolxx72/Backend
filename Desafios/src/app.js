import express from "express";
import { __dirname } from "./utils.js";
import {engine} from "express-handlebars"
import "./db/dbconfig.js"
import porductsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from "./routes/views.router.js" 
import { Server } from "socket.io";
import { productMongo } from "./manager/product/productManagerMongo.js";
import { msjModel } from "./manager/messages/messagesManager.js";


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.engine('handlebars', engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api/products',porductsRouter) 
app.use('/api/carts',cartsRouter)

app.use("/",viewsRouter)

const httpServer =app.listen(PORT,()=>{
    console.log(`Escuchando puerto ${PORT}`)
})  

const socketServer = new Server(httpServer)



socketServer.on('connection',async(socket)=>{
    console.log(`Se conecto ${socket.id}`)
    socket.on('disconnect',()=>{
        console.log(`Se desconecto ${socket.id}`)})
    
        const allProds = await productMongo.getproducts()
        socketServer.emit('allProds',allProds)

        socket.on("msj",async (e)=>{
            console.log(e)
                await msjModel.createMsj(e)
            const listmsjs= await msjModel.findMsj()
            socketServer.emit("msjs",listmsjs)
        })
})