const jwt = require('jsonwebtoken');
const JWTSECRET = "asda31231-adas123125-nfansn124";

function verifyAccessToken(token){
    try{
        const decode = jwt.verify(token, JWTSECRET);
        return {success: true, data: decode};
    }catch(err){
        return {success: false, error: err.message};
    }
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'Token não fornecido'
        });
    }

    const result = verifyAccessToken(token);

    if(!result.success){
        return res.status(403).json({ 
            status: "Failure",
            message: result.error 
        });
    } 

    req.user = result?.data;
    next();
}

module.exports = { verifyAccessToken, authenticateToken };