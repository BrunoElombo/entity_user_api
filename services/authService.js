const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (username, userPassword,keepMeIn) => {
    const user = await prisma.user.findUnique({ 
      where: { name: username }
    });
    
    if (!user) {
      return {message: 'Invalid username'};
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordValid) {
      return {message: 'Invalid password'};
    }
    try{
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        let { password, ...rest } = user;
        await prisma.user.update({
          where:{id: user.id},
          data:{ 
            keepMeIn: keepMeIn || false,
            refreshToken,
          }
        })
        return { user: rest, access: accessToken, refresh: refreshToken };
    }catch(error){
      throw new Error('Internal server error'+ error.message);
    }
};