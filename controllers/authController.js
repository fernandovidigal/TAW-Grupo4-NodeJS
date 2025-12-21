const User = require('../models/User'); // Modelo Mongoose para utilizadores
const jwt = require('jsonwebtoken');     // Biblioteca para trabalhar com JSON Web Tokens (tokens de autenticação)
const bcrypt = require("bcrypt"); // Para encriptar a password
const cloudinary = require("cloudinary").v2; // Cloudinary CDN
const dotenv = require("dotenv");
const { validationResult } = require('express-validator'); // Para sanitização e validação de inputs

dotenv.config();
const saltRounds = 10;

// Cloudinary CDN Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


/* Controller que permite registar novos utilizadores, validando unicidade de username/email, e com sanitização de dados */
exports.register = async (req, res) => {
    // Verifica erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Dados inválidos',
            errors: errors.array()
        });
    }

    try {
        const { username, email, password, nome, telemovel, nif, morada } = req.body;

        // Verifica se já existe um utilizador com o mesmo username OU email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({
                success: false, 
                message: 'Username ou email já registados.'
            });
        }

        if(!req.file){
            return res.status(400).json({
                success: false, 
                message: 'A fotografia é obrigatória.'
            }); 
        }

        // Upload da fotografia para o CDN Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                (error, uploaded) => (error ? reject(error) : resolve(uploaded))
            );
            stream.end(req.file.buffer);
        });

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Cria um novo utilizador na base de dados. Por segurança, a flag isAdmin é 'false' por defeito
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            nome,
            telemovel,
            nif,
            morada,
            fotografia: uploadResult.secure_url,
        });

        // Guarda o novo utilizador no MongoDB
        await newUser.save();

        // Responde com sucesso (201 = Created)
        res.status(201).json({ 
            success: true, 
            message: 'Utilizador registado com sucesso.',
            user: { username: newUser.username, email: newUser.email, nome: newUser.nome }
        });

    } catch (error) {
        console.error("Erro no registo:", error);
        res.status(500).json({
            success: false, 
            message: 'Erro interno do servidor.'
        });
    }
};

/* Controller que valida e sanitiza o login de utilizadores, retornando o token de autenticação */
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Dados inválidos',
            errors: errors.array()
        });
    }

    try {
        // 'identifier' é a variável que identifica inequivocamente um username ou email
        const { identifier, password } = req.body;

        // Procura utilizador pelo respetivo username OU email
        const user = await User.findOne({ 
            $or: [{ username: identifier }, { email: identifier }] 
        });

        // Caso o utilizador não seja encontrado
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas.'
            });
        }

        // Verifica se a password é válida e compara com a hash armazenada na base de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                success: false, 
                message: 'Credenciais inválidas.'
            });
        }

        // Cria um payload do token com informações essenciais do utilizador
        const payload = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin // Flag de autorização
        };

        /* Gera o token JWT com:
            - payload: dados do utilizador
            - secret: chave secreta do .env
            - expiresIn: tempo de expiração do .env */
        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: process.env.TOKEN_EXPIRATION 
        });

        /* Servidor responde com sucesso e envia o token ao Cliente
        Frontend deverá guardar este token (localStorage) */
        res.status(200).json({
            success: true,
            message: 'Login bem-sucedido.',
            token, //Token JWT armazenado no Frontend para enviar em requisições futuras
            user: { username: user.username, isAdmin: user.isAdmin, nome: user.nome }
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({
            success: false, 
            message: 'Erro interno do servidor durante a autenticação.'
        });
    }
};