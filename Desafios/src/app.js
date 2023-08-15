import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import ProductsManager from './productManager.js'
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js'
import { Server } from 'socket.io'; 

const app = express();

//Express
app.use (express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Hooks
app.use('/api/views',viewsRouter);

const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
});

const socketServer = new Server (httpServer);

socketServer.on ('connection', socket =>{
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente', socket.id, 'desconectado');
    });

    socketServer.emit('bienvenida',`Bienvenido a Pet Funes usuario ${socket.id}`);

    socket.on('addProd', async (obj) => {
        console.log('Data recibida del cliente', obj);
        const newProduct = await ProductsManager.addProduct(obj);
        if (!(newProduct instanceof Error)){
            const newProductsArray = await ProductsManager.getProducts();
            socket.emit ("addedProd", newProductsArray);
        } else{
            console.error(newProduct);
        }
    });

    socket.on('deleteProd', async (id) => {
        await ProductsManager.deleteProduct(Number (id));

        const newProductsArray = await ProductsManager.getProducts();

        socketServer.emit("deletedProd",await newProductsArray);
    });
    
});