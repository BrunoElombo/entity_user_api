const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create the user inforamtion
 */
exports.createUser = async (data) => {
  const { username, password, is_admin, is_staff, email, phone } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: username,
      password: hashedPassword,
      is_admin,
      is_staff,
      email,
      phone
    },
  });
  return user;
};

/**
 * Read the user information
 */
exports.readUser = async (id) =>{
  let user = await prisma.user.findUnique({
    where:{id: id, is_active: true}
  });
  return user;
}

/**
 * Get users
 */
exports.getAllUsers = async () =>{
  let users = await prisma.user.findMany({
    where: {is_active: true}
  });
  return users;
}

/**
 * Update the user information
 */
exports.updateUser = async (id, data)=>{
  let user = await prisma.user.update({
    where:{id: id, is_active: true},
    data:{
      ...data
    }
  });
  return user
}

/**
 * Delete the user information
 */
exports.deleteUser = async (id) =>{
  let user = await prisma.user.update({
    where: {id: id},
    data:{
      is_active: false
    }
  });
  return user;
}