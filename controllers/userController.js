const User = require('../models/User'); // Importa o modelo Mongoose
const { param, validationResult } = require('express-validator'); // Importa biblioteca para sanitização e validação de inputs

// Controlador para listar todos os utilizadores (apenas para administradores)
exports.getUsers = async (req, res) => {
    try {
        // Pesquisa todos os utilizadores sem mostrar passwords
        const users = await User.find({}).select('-password');
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
exports.getUserProfile = [
    // Validação e sanitização do parâmetro 'username'
    param('username')
        .isLength({ min: 3, max: 15 }).trim().escape()
        .withMessage('Username inválido'),

    async (req, res) => {
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
            // Pesquisa o utilizador pelo username sem mostrar a password
            const user = await User.findOne({ username }).select('-password');

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
    }
];

// Controlador para obter o perfil do administrador (apenas para administradores)
exports.getAdminProfile = async (req, res) => {
    try {
        // Procura por dados completos do administrador, usando o respetivo ID do token, sem mostrar password
        const user = await User.findById(req.user.id).select('-password');
        
        // Verifica se tem privilégios de administrador
        if (!user || !user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado.'
            });
        }

        // Devolve o perfil completo do administrador
        res.status(200).json({
            success: true,
            message: 'Perfil de administrador carregado!',
            adminProfile: {
                username: user.username,
                email: user.email,
                nome: user.nome,
                telemovel: user.telemovel,
                nif: user.nif,
                morada: user.morada,
                fotografia: user.fotografia,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error("Erro no perfil admin:", error);
        res.status(500).json({
            success: false,
            message: 'Erro no servidor.'
        });
    }
};

// Controlador para apagar um utilizador (apenas para administradores)
exports.apagarUtilizador = [
    // Validação e sanitização do parâmetro 'username'
    param('username')
        .isLength({ min: 3, max: 15 }).trim().escape()
        .withMessage('Username inválido'),

    // Pára se o username for inválido
    async (req, res) => {
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
    }
];