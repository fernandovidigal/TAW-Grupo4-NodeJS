const { body, param } = require('express-validator'); // Para sanitização e validação de inputs

// Validação dos dados enviados pelo formulário de registo
exports.validateRegisterFields = [
    body('username').isLength({ min: 3, max: 15 }).trim().escape()
        .withMessage('Username deve ter entre 3 e 15 caracteres'),
    body('email').isEmail().normalizeEmail()
        .withMessage('Email inválido'),
    body('password').isLength({ min: 8 })
        .withMessage('Password deve ter pelo menos 8 caracteres'),
    body('nome').notEmpty().trim().escape()
        .withMessage('Nome obrigatório'),
    body('telemovel').isMobilePhone('pt-PT')
        .withMessage('Número de telemóvel inválido'),
    body('nif').isLength({ min: 9, max: 9 }).isNumeric()
        .withMessage('NIF deve conter 9 dígitos numéricos'),
    body('morada').notEmpty().trim().escape()
        .withMessage('Morada obrigatória'),
];

// Validação dos dados enviados pelo formulário de login
exports.validateLoginFields = [
    // 'identifier' é a variável que identifica inequivocamente um username ou email
    body('identifier').notEmpty().trim().escape()
        .withMessage('Username ou email obrigatório'),
    body('password').notEmpty()
        .withMessage('Password obrigatória'),
];

// Validação e sanitização do parâmetro 'username'
exports.validateUsernameField = [
    param('username')
        .isLength({ min: 3, max: 15 }).trim().escape()
        .withMessage('Username inválido'),
]