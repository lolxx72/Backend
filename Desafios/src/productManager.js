import fs from 'fs';

export default class ProductManager {
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
            if (!title || !description || !price || !thumbnail || !stock || !code || !category) {//analiza si todos los campos estan llenos
                return 'ERROR: Complete todos los campos'

            }
            let list = await this.product()
            const listCode = list.find(e => e.code === code)
            if (listCode) {
                return "El codigo ingresado existe, coloque  valores nuevos"
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
            return `El producto con el ID ${id} fue generado correctamente`

        }
        catch { (error) => { return error } }
    };

    async getProductsById(id) {
        try {
            let list = await this.product()
            const itemId = list.find(e => e.id == id)
            if (itemId) {
                return itemId
            }
            else { return `No existe producto con el ID ${id}` }

        } catch { (error) => { return (error) } }
    }
    async deleteProduct(id) {
        try {
            let list = await this.product()
            if (list.findIndex(e => e.id === id) !== -1) {
                const newList = list.filter(e => e.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newList))
                return (`El producto con el ID ${id} fue eliminado`)
            }
            else { return ("El producto que intentas eliminar no existe.") }
        }
        catch { (error) => { return error } }
    }

    async updateProduct(pid, obj) {
        try {
            let list = await this.product()
            let objKey = Object.keys(obj)
            let noId = objKey.find(e => e == "id")
            if (noId) {
                return ("No se pudo modificar el ID, ingrese valores validos")
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


// TESTING

 //const manager = new ProductManager("arhivo.json") 


 //manager.getProducts() 
//manager.addProduct('Excellent Gato Adulto',"Alimento", 22560, " ", 1,6)
/*  manager.addProduct('prueba 1','prueba 1',1, " ",52,55,"alimento") */
/* manager.addProduct('prueba 2 ',"prueba 2", 230, " ", 5,22) */
/* manager.addProduct('prueba 3',"prueba 3", 22, " ", 88,22) */
/* manager.addProduct('prueba 4',"prueba 4", 2200, " ", 44,22)  */
/* export const c = manager.getProducts() */
/* manager.getProductsById(2) */
/* manager.updateProduct(2,{title:"hola"}) */
/* manager.getProducts() */
/* manager.deleteProduct(5) */