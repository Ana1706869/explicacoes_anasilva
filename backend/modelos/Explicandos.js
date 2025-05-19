const mongoose=require('mongoose')

const explicandoSchema=new mongoose.Schema({
    nome:{type: String, required: true, unique:true},
    email:{type: String, required:true, unique:true},
    password: {type: String, required:true}


})

module.exports=mongoose.model('Explicandos',explicandoSchema)