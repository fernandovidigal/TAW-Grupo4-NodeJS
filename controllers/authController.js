const User = require('../models/User'); // Importa o modelo Mongoose
const jwt = require('jsonwebtoken'); // Para criar tokens de sessão
const bcrypt = require("bcrypt"); // Para encriptar a password
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

const saltRounds = 10;

// Cloudinary CDN Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.register = async (req, res) => {
    try {
        const { username, email, password, nome, telemovel, nif, morada } = req.body;
 
        // Validação de Unicidade
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
                message: 'Não foi enviada nenhuma fotografia.'
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

        // Criar o novo utilizador
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            nome,
            telemovel,
            nif,
            morada,
            fotografia: uploadResult.secure_url
            // A flag isAdmin é 'false' por defeito (definido no Schema)
        });

        console.log(newUser);

        // Guardar no MongoDB o novo utilizador que criámos
        await newUser.save();

        // Resposta de Sucesso
        res.status(201).json({ 
            success: true, 
            message: 'Utilizador registado com sucesso.',
            user: { username: newUser.username, email: newUser.email, nome: newUser.nome }
        });

    } catch (error) {
        console.error("Erro no registo:", error);
        res.status(500).json({
            success: false, 
            message: 'Erro interno do servidor durante o registo.'
        });
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { identifier, password } = req.body; // 'identifier' pode ser username ou e-mail
 
        // Encontrar o utilizador com base no username ou e-mail
        const user = await User.findOne({ 
            $or: [{ username: identifier }, { email: identifier }] 
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciais inválidas.'
            });
        }

        // Verifica se a password é válida. Compara com a hash que está guardada na base de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                success: false, message: 'Credenciais inválidas.'
            });
        }

        // Geração do JWT (JSON Web Tokens)
        // O payload deve conter a informação mínima necessária para identificar o utilizador e autorização
        const payload = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { 
            expiresIn: process.env.TOKEN_EXPIRATION 
        });

        // Resposta de Sucesso
        res.status(200).json({
            success: true,
            message: 'Login bem-sucedido.',
            token, // Este token deverá ser guardado no frontend (localStorage)
            user: { username: user.username, isAdmin: user.isAdmin, nome: user.nome }
        });
 
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({
            success: false, 
            message: 'Erro interno do servidor durante o login.'
        });
    }
};