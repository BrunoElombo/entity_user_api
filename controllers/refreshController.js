const { refreshToken } = require('../services/refreshService')

exports.refreshTokenController = async (req, res)=>{
    let cookies = req.cookies;
    try{
        if (!cookies?.jwt) return res.sendStatus(401);
        const response = await refreshToken(cookies);
        res.json(response);
    }catch(err){
        console.log(err);
        return res.status(403).send(err.message)
    }
}
