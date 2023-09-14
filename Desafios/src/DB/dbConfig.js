import mongoose from 'mongoose'
import { URI } from '../utils.js'



mongoose.connect(URI)
.then(()=>console.log('Conectado a la BDD'))
.catch((error)=>console.log(error))