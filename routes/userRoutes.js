const express = require('express'); 
const router = express.Router();     // Cria uma nova instância de um objeto Router para agrupar rotas de forma lógica
const userController = require('../controllers/userController');   // Importa o authController que irá conter a lógica para o login, register, logout, etc.

// Middlewares
const { verifyToken, isAdmin} = require('../middlewares/authMiddleware');

router.get('/', [verifyToken, isAdmin], userController.getUsers); // Rota listar todos os utilizadores

router.get('/profile/:username', verifyToken, userController.getUserProfile); // Rota para o perfil de um utilizador

// Rota para o perfil do administrador

//router.delete('/')

module.exports = router;