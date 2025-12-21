const express = require('express'); 
const router = express.Router();     // Cria uma nova instância de um objeto Router para agrupar rotas de forma lógica
const userController = require('../controllers/userController');   // Importa o authController que irá conter a lógica para o login, register, logout, etc.
const { verifyToken, isAdmin} = require('../middlewares/authMW'); // Importa middlewares de autenticação e autorização
const { validateUsernameField, validateEditFields } = require ('../middlewares/validations');

router.get('/', [verifyToken, isAdmin], userController.getUsers); // Rota para listar todos os utilizadores apenas disponivel para administrador

router.get('/profile', verifyToken, userController.getUserProfile); // Rota para o perfil de um utilizador

router.delete('/:username', [verifyToken, isAdmin, validateUsernameField], userController.apagarUtilizador); // Rota para apagar um utilizador  apenas disponivel para administrador

router.put("/editProfile", [verifyToken, validateEditFields], userController.editarPerfil); // Rota para editar o perfil do utilizador

module.exports = router;