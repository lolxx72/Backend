import { Router } from "express";
import { cartMongo } from "../manager/cart/cartManagerMongo.js";
import { productMongo } from "../manager/product/productManagerMongo.js";
const router = Router()

router.post("/", async (req, res) => {

    try {
        await cartMongo.getCarts()
        res.status(200).json({ mesage: 'Carrito creado' })
    }
    catch (error) { res.status(500).json({ error }) }
}
)

router.get("/:cid", async (req, res) => {
   let cid = req.params.cid
   if(cid.length!=24){
    res.status(400).json({mesage:"Coloque un ID valido"})
    return
   }
   try{
    const cart = await cartMongo.getCartById(cid)
    if(!cart || cart.name== "CastError"){
        res.status(400).json({mesage:`No existe carrito con ID ${cid}`})
    }else {res.status(200).json({mesage:cart})}
   }
   catch (error){ res.status(500).json({ error }) }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let cid = req.params.cid
    let pid = req.params.pid
    try{
    if(cid.length!=24){
        res.status(400).json({mesage:"Coloque un ID de carrito valido"})
        return
    }if(pid.length!=24){
        res.status(400).json({mesage:"Coloque un ID de producto valido"})
        return
    }
    const cartUpdate = await cartMongo.updatecart(cid,pid)
    if(cartUpdate=="Carrito actualizado"){res.status(200).json({mesage:cartUpdate})  }
    else{
        res.status(400).json({mesage:cartUpdate})
    }
     }
    catch (error){ res.status(500).json({ error }) }
})

router.delete("/:cid", async (req, res) => {
    let cid = req.params.cid
    if(cid.length!=24){
     res.status(400).json({mesage:"Coloque un ID valido"})
     return
    }
    try{
     const del = await cartMongo.deleteCart(cid)
     if(!del || del.name== "CastError"){
         res.status(400).json({mesage:`No existe carrito con el ID ${cid}`})
     }else {res.status(200).json({mesage:"Carrito eliminado"})}
    }
    catch (error){ res.status(500).json({ error }) }
 })
 

export default router