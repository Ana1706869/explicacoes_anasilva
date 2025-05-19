const mongoose=require('mongoose')

const ExplicacaoSchema=new mongoose.Schema({
    explicandoId:{type:mongoose.Schema.Types.ObjectId, ref:"Explicandos"},
    data:{type:Date, required:true},
    horaInicio:{type:String,required:true},
    horaFim: {type:String, required:true},
    linguagem: {type:String},
    tipo:{type:String},
    pagamento: {type:String},
    confirmacao: {type:String, enum:["Pendente","Confirmada","Recusada"], default:"Pendente"}

    
})

module.exports=mongoose.model('Explicacoes',ExplicacaoSchema)