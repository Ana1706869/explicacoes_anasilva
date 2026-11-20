const mongoose=require('mongoose')

// A palavra-passe guardada neste modelo é o hash criado durante o registo.
const explicandoSchema=new mongoose.Schema({
    nome:{type: String, required: true, unique:true},
    email:{type: String, required:true, unique:true},
    password: {type: String, required:true}


})

module.exports=mongoose.model('Explicandos',explicandoSchema)