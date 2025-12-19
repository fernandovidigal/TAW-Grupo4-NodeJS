const mongoose = require('mongoose'); // Importa o Mongoose, a biblioteca ODM para o MongoDB.

const UserSchema = new mongoose.Schema({ // Cria um novo Esquema Mongoose, definindo a estrutura dos documentos de utilizador
    username: {
        type: String,
        required: true,  // É um campo obrigatório para criar um novo utilizador
        unique: true,   // Garante que não existem dois utilizadores com o mesmo username
        trim: true            // Remove espaços em branco no início e no fim da string antes de guardar.
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Converte a string para minúsculas antes de guardar
    },
    password: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        trim: true,
        required: true
    },
    telemovel: {
        type: Number,
        trim: true,
        required: true
    },
    nif: {
        type: Number,
        trim: true,
        required: true
    },
    morada: {
        type: String,
        trim: true,
        required: true
    },
    fotografia: {
        type: String,
        required: true
    },
    // Campo de Autorização (Para a área de Administrador)
    isAdmin: {
        type: Boolean,
        default: false // Por defeito, um utilizador registado NÃO é admin
    }
}, {
    _id: true,
    timestamps: true    // Adiciona automaticamente os campos createdAt e updatedAt
});

const User = mongoose.model('User', UserSchema); // Cria o modelos no Mongoose, que atua como interface para a coleção do MongoDB 

module.exports = User;