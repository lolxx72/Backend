import fs from 'fs';
import { __dirname } from '../../utils.js';

const path = __dirname+'/products.json'

export class ProductManager {
    constructor(path) {
        this.path = path
    }

    async product() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(data) 
            } else {
                return [] 
            }
        } catch { (error) => { return error } }
    };

    async getProducts() {
        try {
            let variablew = await this.product()
            return await variablew
        } catch { (error) => { return error } }
    }

    async addProduct({ title, description, price, thumbnail, code, stock, category, status = true }) {
        try {
            if (!title || !description || !price || !thumbnail || !stock || !code || !category) {
                return 'ERROR: Complete todos los datos'
            }
            let list = await this.product()
            const listCode = list.find(e => e.code == code)
            if (listCode) {
                return "El código ingresado existe, por favor ingresa uno nuevo"
            };
            let obj = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail
            }
            let id = list.length == 0 ? 1 : list[list.length - 1].id + 1

            list.push({ ...obj, id })
            await fs.promises.writeFile(this.path, JSON.stringify(list))
            return `El producto con ID ${id} fue generado con exito`

        }
        catch { (error) => { console.log("error") } }
    };

    async getProductsById(id) {
        try {
            let list = await this.product()
            const itemId = list.find(e => e.id == id)
            if (itemId) {
                return itemId
            }
            else { return `No se encontró producto con el ID ${id}` }

        } catch { (error) => { return (error) } }
    }
    async deleteProduct(id) {
        try {
            
            let list = await this.product()
            if (list.findIndex(e => e.id == id) !== -1) {
                const newList = list.filter(e => e.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newList))
                return (`El producto con ID ${id} fue eliminado`)
            }
            else { return ("El producto que intentas eliminar, no existe") }
        }
        catch { (error) => { return error } }
    }

    async updateProduct(pid, obj) {
        try {
            let list = await this.product()
            let objKey = Object.keys(obj)
            let noId = objKey.find(e => e == "id")
            if (noId) {
                return ("No se puede modificar el ID, ingrese valores válidos")
            };
            const ub = list.findIndex(e => e.id == pid)
            if (ub !== -1) {
                const objRaw = list[ub]
                const objMod = { ...objRaw, ...obj }
                list[ub] = objMod
                fs.promises.writeFile(this.path, JSON.stringify(list))
                return "Cambio realizado"
            }
            else {
                return `No se encontró producto con el ID ${pid}`
            }
        }
        catch { (error) => { return error } }
    }
}

export const manager = new ProductManager(path)