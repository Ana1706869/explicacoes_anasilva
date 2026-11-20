const mongoose=require('mongoose')

// Guarda o pedido e o estado do ciclo de confirmação da explicação.
const ExplicacaoSchema=new mongoose.Schema({
    explicandoId:{type:mongoose.Schema.Types.ObjectId, ref:"Explicandos"},
    data:{type:Date, required:true},
    horaInicio:{type:String,required:true},
    horaFim: {type:String, required:true},
    linguagem: {type:String},
    tipo:{type:String},
    pagamento: {type:String},
    // Limita o estado aos valores usados pelos fluxos de aluno e explicador.
    confirmacao: {type:String, enum:["Pendente","Confirmada","Recusada"], default:"Pendente"}

    
})

module.exports=mongoose.model('Explicacoes',ExplicacaoSchema)