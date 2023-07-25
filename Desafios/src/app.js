import express, { response } from 'express'
import {ProductManager}  from './productManager.js'

const manager = new ProductManager("arhivo.json")
const prods= await manager.product()


const app= express()
app.use(express.urlencoded({extended:true}))

app.listen(8080,()=>{}
)

app.get('/products',(req,res)=>{
    const limit = req.query.limit
    const resLimit =prods.slice(0,limit)
    
    if (!limit){
        res.send({prods})
    }
    else {res.send(resLimit)}
})

app.get('/products/:pid', (req,res)=>{
    const pid= req.params.pid
    const pfid=prods.find(e=>e.id==pid)
    if(!pfid){res.send(`There is no product with ID: ${pid.toUpperCase()}`)}
    else{res.send(pfid)}
})