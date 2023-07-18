const fs = require('fs')


class ProductManager {
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
        } catch {
            (error) => { return error }
        }
    };
    
    async getProducts(){
        try{
            let variablew=await this.product()
            console.log(await variablew)
        }catch{(error) => { return error }}
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !stock || !code) {
                console.log('Ingrese todos los datos')
                return
            }
            let list = await this.product()
            const listCode = list.find(e => e.code === code)
            if (listCode) {
                console.log("El codigo ingresado ya existe, ingrese uno nuevo");
                return
            };
            let obj = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            let id
            if (list.length == 0) {
                id = 1;
            } else {
                id = list[list.length - 1].id + 1
            }

            list.push({ ...obj, id })
            await fs.promises.writeFile(this.path, JSON.stringify(list))
            console.log(`El producto con el ID ${id} se generó correctamente`)

        }
        catch { (error) => { console.log("error") } }
    };

    async getProductsById(id) {
        try {
            let list = await this.product()
            const itemId = list.find(e => e.id === id)
            if (itemId) {
                console.log(itemId)
                return itemId
            }
            else { console.log(`No se encontró producto con el ID ${id}`) }

        } catch { (error) => { return (error) } }
    }
    async deleteProduct(id) {
        try {
            let list = await this.product()
            if (list.findIndex(e => e.id === id) !== -1) {
                const newList = list.filter(e => e.id !== id)
                await fs.promises.writeFile(this.path, JSON.stringify(newList))
                console.log(`El producto con el ID ${id} fue eliminado`)
            }
            else { console.log("El producto que intentas eliminar no existe") }
        }
        catch { (error) => { return error } }
    }

    async updateProduct(id, k) {

        try {
            let list = await this.product()
            let objKey = Object.keys(k)
            let noId = objKey.find(e => e === "id")
            if (noId) {
                console.log("No se puede modificar ID, ingrese valores válidos.")
                return
            };
            const ub = list.findIndex(e => e.id === id)
            if (ub !== -1) {
                const objRaw = list[ub]
                const objMod = { ...objRaw, ...k }
                list[ub] = objMod
                console.log("Cambio realizado")
                fs.promises.writeFile(this.path, JSON.stringify(list))
            }
            else { console.log(`No se encontró producto con el ID ${id}`) }


        }
        catch { (error) => { return error } }
    }
}

// Test

//const manager = new ProductManager("arhivo.json") 
//manager.getProducts() 
//manager.addProduct('League of Legends', 'Juego de campeones', 1500, 1, 3) 
//manager.getProducts() 
//manager.getProductsById(2) 
//manager.updateProduct(1,{title:"Lolsito"}) 
//manager.getProducts() 
//manager.deleteProduct(4) 