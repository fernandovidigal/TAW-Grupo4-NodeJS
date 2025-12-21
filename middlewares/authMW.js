const jwt = require('jsonwebtoken'); // Biblioteca para trabalhar com JSON Web Tokens

/* Middleware de autenticação - verifica se o utilizador tem um token JWT válido. 
Em caso afirmativo, extrai e valida o token do header do request */
exports.verifyToken = (req, res, next) => {
    // Extrai o token dos headers 'auth-token' ou 'Authorization' (formato Bearer)
    const token = req.header('auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    // O acesso é negado caso não exista token válido
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acesso negado. Token não fornecido.'
        });
    }

    try {
        /* Verifica a assinatura do token usando o JWT_secret do .env
        Se válido, descodifica o payload (id, username, isAdmin) */
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Injeta os dados do utilizador no objeto request para uso posterior
        req.user = verified;
        
        // Passa para o próximo middleware (Autorização)
        next();
    } catch (error) {
        // Token inválido, expirado ou adulterado
        return res.status(401).json({
            success: false,
            invalidToken: true,
            message: 'Token inválido ou expirado.',
            error: error.message
        });
    }
};

/* Middleware de Autorização - Verifica se o utilizador autenticado tem permissões de administrador
Só deve ser utilizado após verificar o token */
exports.isAdmin = (req, res, next) => {
    // Verifica se req.user existe (garante que verifyToken foi executado antes)
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Acesso não autorizado.',
            error: error.message
        });
    }

    // Verificar se o utilizador possui privilégios de administrador
    if (!req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: 'Não tem privilégios para aceder a este recurso.',
            error: error.message
        });
    }

    // Continuar se o user for admin
    next();
};