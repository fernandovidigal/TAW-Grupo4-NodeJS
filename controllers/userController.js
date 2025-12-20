const User = require('../models/User'); // Importa o modelo Mongoose
const { param, validationResult } = require('express-validator'); // Importa biblioteca para sanitização e validação de inputs

// Controlador para listar todos os utilizadores (apenas para administradores)
exports.getUsers = async (req, res) => {
    try {
        // Pesquisa todos os utilizadores sem mostrar passwords nem a conta de administrador
        const users = await User.find({
            isAdmin: false,
        }).select('-password');
        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        console.error("Erro ao listar utilizadores:", error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor.'
        });
    }
};

// Controlador para obter o perfil de um utilizador específico (requer autenticação)
exports.getUserProfile = async (req, res) => {
    try {
        // Req.user existe porque foi adicionado ao req pelo middleware de validação do token
        const username = req.user.username;

        // Pesquisa o utilizador pelo username sem mostrar a password
        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Utilizador não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            user: {
                username: user.username,
                email: user.email,
                nome: user.nome,
                telemovel: user.telemovel,
                nif: user.nif,
                morada: user.morada,
                fotografia: user.fotografia
            }
        });
    } catch (error) {
        console.error("Erro no perfil:", error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor.'
        });
    }
};

// Controlador para apagar um utilizador (apenas para administradores)
exports.apagarUtilizador = async (req, res) => {
    // Pára se o username for inválido
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Parâmetro inválido',
            errors: errors.array()
        });
    }

    try {
        const username = req.params.username;
        // Encontra e apaga o utilizador na base de dados
        const user = await User.findOneAndDelete({ username });

        // Caso o utilizador indicado para remoção não exista
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Utilizador não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            message: "Utilizador removido.",
            user: {
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Erro ao remover:", error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor.'
        });
    }
};