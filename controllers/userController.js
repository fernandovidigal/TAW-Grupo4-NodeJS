const User = require('../models/User'); // Importa o modelo Mongoose

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if(!users){
            return res.status(204).json({
                success: true,
                message: "Não existem utilizadores registados."
            });
        }

        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {

    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const {id, username} = req.user;

        // Verifica na base de dados se o utilizador existe
        const user = await User.findOne({
            _id: id,
            username,
        });

        if(!user){
            return res.status(400).json({
                success: false, 
                message: 'Utilizador não encontrado.'
            });
        }

        res.status(200).json({
            success: true,
            message: "Username existente.",
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
            message: 'Erro interno do servidor durante a exibição do perfil.'
        });
    }
}