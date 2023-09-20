import {dirname} from 'path';
import {fileURLToPath} from 'url';
import bcrypt from 'bcrypt';


export const __dirname= dirname(fileURLToPath(import.meta.url))

export const URI ="mongodb+srv://IngridHeis:Villacarlospaz15@cluster0.es6x0qf.mongodb.net/Backend?retryWrites=true&w=majority"

export const hashdata=  async (data)=>{
    return bcrypt.hash(data, 10)
}

export const compareHash = async (data, hash)=>{
    return bcrypt.compare(data, hash)
}