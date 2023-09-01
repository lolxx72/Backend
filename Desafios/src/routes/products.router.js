import { Router } from "express";
import { productMongo } from "../manager/product/productManagerMongo.js";

const router= Router()

router.get('/',async(req,res)=>{
    const {limit=10,page=1,sortPrice,...query} =req.query
    try{
        const products = await productMongo.getproducts(limit,page,query,sortPrice)
        res.status(200).json(products)
    }
    catch(error){res.status(500).json({error})}
})

router.get('/:pid',async(req,res)=>{
    const pid= req.query.id
    console.log(pid)
    if (pid.length != 24){
        res.status(400).json({mesage:`Coloque un ID valido`})
        return}
    try{
        const prodById= await productMongo.getproductById(pid)
        if (!prodById || prodById.name== "CastError"){
            res.status(400).json()
        }else{
            res.status(200).json({mesage:"product: ", prodById})
    }}
    catch(error){res.status(500).json({error})}
})

router.post('/',async (req,res)=>{
    const {title, description, price, thumbnail, code, stock, category, status}=req.body
    if(!title || !description || !price || !thumbnail || !stock || !code || !category){

        res.status(400).json({mesage:'ERROR: Complete todos los campos'})
    }
    try{
        const newProd = await productMongo.createProduct(req.body)
        res.status(200).json({mesage:"Producto nuevo: ", newProd})}
    catch(error){res.status(500).json({error})}
})

router.put('/:pid',async(req,res)=>{
    const pid= req.params.pid
    const prod = req.body
    if (pid.length != 24){
        res.status(400).json({mesage:`Coloque un ID valido`})
        return}
    const prodById= await productMongo.getproductById(pid)
    if (!prodById || prodById.name== "CastError"){
        res.status(500).json({mesage:"No existente"})
        return}
    try{
        const mod= await productMongo.updateProduct(pid,prod)
        if (!mod){
            res.status(400).json({mesage:`No existe producto con ID: ${pid}`})
        }else{
            res.status(200).json({mesage:"Producto modificado"})}
    }
    catch(error){res.status(500).json({error})}
})

router.delete('/:pid',async(req,res)=>{
    const pid = req.params.pid
    if (pid.length != 24){
        res.status(400).json({mesage:`Coloque un ID valido`})
        return}
    try{
        const del = await productMongo.deleteProduct(pid)
        if (!del|| del.name== "CastError"){
            res.status(400).json({mesage:"El ID no existe"})
        }else {res.status(200).json({mesage:"El producto fue eliminado"})
    }}
    catch(error){res.status(500).json({error})}
})

export default router