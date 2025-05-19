const mongoose=require("mongoose")

const ForumMessageSchema=new mongoose.Schema({
    nome:{type: String},
    mensagem:{type: String},
    password: {type: String},
    ficheiro:{type:String},
    criadoEm:{
        type: Date,
        default: ()=> new Date().toLocaleString("en-US",{timezone:"Europe/lisbon"})
    }
})

module.exports=mongoose.model("Forum",ForumMessageSchema)
