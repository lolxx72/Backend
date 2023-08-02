import fs from 'fs'
import { prodManager } from './utils.js'


const prod = prodManager()
export class CartManager {
    constructor(path) {
        this.path = path
    }
    async getCart() {
        try {
            if (fs.existsSync(this.path)) {
                const cart = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(cart)
            } else return []
        }
        catch { (error) => { return error } }

    }

    async crateCart() {
        try {
            const cart = await this.getCart()
            const id = cart.length == 0 ? 1 : cart[cart.length - 1].id + 1
            cart.push({ id: id, products: [] })
            await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
            return `Carrito creado con el ID ${id}`
        }
        catch { (error) => { return error } }


    }

    async findCart(cid) {
        try {
            const cart = await this.getCart()
            const list = cart.find(e => e.id == cid)
            if (list) {
                return list.products
            }
            else { return `No se encontro carrito con el ID ${cid}` }
        }
        catch { (error) => { return error } }
    }

    async addProduct(cid, pid) {
        const cart = await this.getCart()
        const cartWanted = await cart.find(e => e.id == cid)
        if (!cartWanted) { return `No se encontró carrito con ID ${cid}` } 
        const product = await prod.getProductsById(pid)
        if (typeof(product)=="string") { return product} 
        try {
            const findCartProd = await cartWanted.products
            const findProd = await findCartProd.find(e => e.id == pid)
            if (findProd) {
                findProd.quantity = findProd.quantity + 1
                await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
                return `Añadido al carrito con ID ${cid}. Product ${product.title.toUpperCase()}. Total: ${findProd.quantity}`
            } else {
                let newProd = { id: +pid, quantity: 1 }
                findCartProd.push(newProd)
                await fs.promises.writeFile(this.path, JSON.stringify(cart), 'utf-8')
                return `Añadido al carrito con ID ${cid} Product ${product.title.toUpperCase()}. Total: 1`
            }
        }
        catch { (error) => { return error } }
    }
}