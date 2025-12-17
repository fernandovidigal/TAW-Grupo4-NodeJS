const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    // Verifica se o token existe no cabeçalho do pedido
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({ 
            success: false, 
            message: 'Não existe cabeçalho de autorização.'
        });
    }

    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if(!token){
        return res.status(401).json({ 
            success: false, 
            message: 'Não existe token the autorização.'
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(403).json({ 
            success: false, 
            message: 'Token inválido ou expirado',
            error: result.error
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    
    if(!req.user){
        return res.status(403).json({ 
            success: false, 
            message: 'Acesso não autorizado',
            error: result.error
        });
    }

    if(!req.user.isAdmin){
        return res.status(403).json({ 
            success: false, 
            message: 'Não tem privilégio para aceder a este recurso',
            error: result.error
        });
    } 

    next();
}