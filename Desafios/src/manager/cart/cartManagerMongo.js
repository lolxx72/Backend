import { cartModel } from "../../db/models/cart.model.js";
import { productMongo } from "../product/productManagerMongo.js";
class CartMongo {
    async getCarts(obj){
        try{
            const carts =await cartModel.create(obj)
            return carts
        }
        catch(error){return error}
    }
    
    async getCartById(id){
        try{
            const cart = await cartModel.findById(id)
            return cart
        }
        catch(error){return error}}




    async deleteCart(id){
        try{
            const cart =cartModel.findByIdAndDelete(id)
            return cart
        }
        catch(error){return error}
    }
    async updatecart(cid,pid){

        try{
            const fCart = await cartModel.findById(cid) //busco el carrito
            if(!fCart || fCart.name =="CastError" ){
            return "No existe carrito con el ID"}
            const fProd =await productMongo.getproductById(pid)//busco el prod
            if(!fProd || fProd.name =="CastError" ){
            return "No existe producto con el ID"}
            const prod =fCart.products
            if(!prod.length){
                console.log("if")
                const obj = {prodId:pid,quantity:1}
                prod.push(obj)
                await cartModel.updateOne({_id:cid},fCart)
                return "Carrito actualizado"
            }else{
                const findP= prod.find(e=>e.prodId==pid)
                if(findP){
                    findP.quantity =findP.quantity+1
                    await cartModel.updateOne({_id:cid},fCart)
                    return "Carrito actualizado"
                }else{
                    const obj = {prodId:pid,quantity:1}
                prod.push(obj)
                await cartModel.updateOne({_id:cid},fCart)
                return "Carrito actualizado"
                }
            }
    
        }
        catch(error){return error}
    }
}

export const cartMongo =new CartMongo()