import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {productManager} from "./productManager.js";
import { cartManager } from './cartManager.js';


export const __dirname= dirname(fileURLToPath(import.meta.url));

export  function prodManager (){
    const manager =new productManager("./productos.json")
    return manager
}

export function cManager(){
    const manager =new cartManager("./carrito.json")
    return manager
}