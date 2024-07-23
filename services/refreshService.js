const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.refreshToken = async (cookies) => {
    const refreshToken = cookies.jwt;
    const user = await prisma.user.findUnique({
        where:{refreshToken}
    })
    if (!user) throw new Error("Forbidden");

    let access = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    if(!access || user.id !== access.id) throw new Error("Forbidden");

    const accessToken = jwt.sign(
        {userId: user.id}, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'}
    );
    
    return {access: accessToken}
};