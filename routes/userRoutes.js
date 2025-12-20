const express = require('express'); 
const router = express.Router();     // Cria uma nova instância de um objeto Router para agrupar rotas de forma lógica
const userController = require('../controllers/userController');   // Importa o authController que irá conter a lógica para o login, register, logout, etc.
const { verifyToken, isAdmin} = require('../middlewares/authMW'); // Importa middlewares de autenticação e autorização

router.get('/', [verifyToken, isAdmin], userController.getUsers); // Rota para listar todos os utilizadores

router.get('/profile/:username', verifyToken, userController.getUserProfile); // Rota para o perfil de um utilizador

router.get('/admin/profile', [verifyToken, isAdmin], userController.getAdminProfile);// Rota para o perfil de administrador

router.delete('/profile/:username', [verifyToken, isAdmin], userController.apagarUtilizador); // Rota para apagar um utilizador

module.exports = router;