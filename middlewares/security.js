function verifyAccessToken(token){
    try{
        const decode = jwt.verify(token, JWTSECRET);
        return {success: true, data: decoded};
    }catch(err){
        return {success: false, error: e.message};
    }
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    const result = verifyAccessToken(token);

    if(!result.success){
        return res.status(403).json({ error: result.error })
    } 

    req.user = result;
    next()
}

module.exports = { verifyAccessToken, authenticateToken };