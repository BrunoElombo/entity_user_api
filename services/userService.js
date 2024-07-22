// services/userService.js
const prisma = require('../prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (userData) => {
  const { name, email, phone, password } = userData;
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

exports.loginUser = async (name, userPassword) => {
  const user = await prisma.user.findUnique({ 
    where: { name }
});
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(userPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  try{
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      let { password, ...rest } = user;
      return { user: rest, token };
  }catch(error){
    throw new Error('Internal server error'+ error.message);
  }
};

exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

exports.updateUser = async (id, userData) => {
  if(userData.password !== id) {

  }
  
};

exports.deleteUser = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  await prisma.user.delete({ where: { id } });
};