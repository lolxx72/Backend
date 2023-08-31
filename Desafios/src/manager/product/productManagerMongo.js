import { productModel } from "../../DB/models/products.model.js";

class ProductMongo {
    async getproducts(){
        try{
            const products =await  productModel.find({})
            return products
        }
        catch(error){return error}
    }
    async getproductById(id){
        try{
            const prod =await productModel.findById(id)
            return prod
        }
        catch(error){return error}
    }
    async createProduct(obj){
        try{
            const newProd =await productModel.create(obj)
            return newProd
        }
        catch(error){return error}
    }
    async deleteProduct(id){
        try{
            const prod =productModel.findByIdAndDelete(id)
            return prod
        }
        catch(error){return error}
    }
    async updateProduct(id,obj){
        try{
            const prod =productModel.updateOne({_id:id},{...obj})
            return prod
        }
        catch(error){return error}
    }
}

export const productMongo = new ProductMongo()