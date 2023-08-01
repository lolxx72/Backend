import { Router } from "express";
import {prodManager}from "../utils.js"

const prods = prodManager()
const prodsList= await prods.getProducts()
const router = Router()

router.get('/',async(req,res)=>{
    try{const limit = req.query.limit
    const resLimit = prodsList.slice(0,limit)
    if (!limit){
        res.send(`${prodsList}`)}
    else {res.send(resLimit)}}
    catch{res.status(400).send("error")}
})

router.get('/:pid',async (req,res)=>{
    const pid= req.params.pid
    const pfind= await prodsList.find(e=>e.id==pid)
    try{
        if(!pfind){
            res.send(`No hay ningún producto con ID: ${pid.toUpperCase()}`)
        }
        else{res.status(200).send(pfind)}
    }
    catch{res.status(400).send("error")}
})


router.post('/',async (req,res)=>{
    const prod = req.body
    try{
        
        res.status(200).send(await prods.addProduct(prod))
    }
    catch{res.status(400).send("error")}
})

router.put('/:pid',async (req,res)=>{
    const pid= req.params.pid
    const prod = req.body
    try{ 
        res.status(200).send(await prods.updateProduct(pid,prod))}
    catch{res.status(400).send("error")}
})

router.delete('/:pid',async (req,res)=>{
    const pid= req.params.pid
    try {
        
        res.status(200).send(await prods.deleteProduct(+pid))
    } catch {res.status(400).send("error")}
})

export default router;