// services/userService.js
const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (userData) => {
  const { name, displayName, email, phone, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      email,
      displayName,
      phone,
      password: hashedPassword
    }
  });
};

exports.getAllUsers = async () =>{
  const users = await prisma.user.findMany({
    where: {is_active: true}
  });

  let formatedUsers = users.map(user =>
    {
      let {password, refreshToken, ...rest} = user;
      return rest
    }
  )
  return formatedUsers;
}

exports.getUserById = async (authorization) => {
  if(!authorization) throw new Error("Expired or no token found");
  const decodedToken = jwt.decode(authorization.split(' ')[1]);
  const userId = decodedToken.id;
  const user = await prisma.user.findUnique({ where: { id : userId, is_active: true} });
  if (!user) {
    throw new Error('User not found');
  }
  let {refreshToken, password, ...rest} = user;
  return rest;
};

exports.updateUser = async (id, userData) => {
  if (userData.password){
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword
  }
  const user = await prisma.user.update(
    {
      where: {id, is_active: true},
      data:{
        ...userData
      }
    });
    let { password, refreshToken, ...rest} = user;
  return rest;
};

exports.deleteUser = async (id) => {
  const user = await prisma.user.findUnique({ where: { id, is_active: true } });
  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.update({ 
    where: { id },
    data:{
      is_active: false
    }
  });
};