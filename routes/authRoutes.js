const express = require('express'); 
const router = express.Router();     // Cria uma nova instância de um objeto Router para agrupar rotas de forma lógica
const authController = require('../controllers/authController');   // Importa o authController que irá conter a lógica para o login, register, logout, etc.
const {validateLoginFields, validateRegisterFields} = require('../middlewares/validations');
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 3 * 1024 * 1024 }, // Limite de 3MB
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.startsWith("image/")){
            return cb(new Error("São permitidas apenas imagens"), false);
        }
        cb(null, true);
    },
});

router.post('/register',[upload.single("fotografia"), validateRegisterFields], authController.register);  // Rota para o registo de novos utilizadores

router.post('/login', validateLoginFields, authController.login); // Rota para o login de um utilizador

module.exports = router;