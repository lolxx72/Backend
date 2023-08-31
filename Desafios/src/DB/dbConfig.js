import mongoose from 'mongoose'

const URI = 'mongodb+srv://IngridHeis:Villacarlospaz15@cluster0.es6x0qf.mongodb.net/Backend?retryWrites=true&w=majority'
mongoose.connect(URI)
.then(() => console.log('Conectado a la BDD'))
.catch(error => console.log(error))