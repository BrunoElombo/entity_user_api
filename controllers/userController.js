const bcrypt = require('bcryptjs');
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


  exports.getUser =async (req, res) => {
    try {
      // Extract employee ID from JWT token payload
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;
  
      // Fetch employee details along with related entities
      const employee = await prisma.employee.findUnique({
        where: {
          id_user: userId,
        },
        include: {
          User: {
            select:{
              id: true,
              name: true,
              email: true,
              phone: true,
              profile_picture: true,
              gender: true,
              niu: true,
              is_admin: true,
              is_staff: true
            }
          },
          entity:{
            include:{
              site:true
            }
          },
          role:true,
          Function: true,
          Departement:true
        },
      });
  
      return res.status(200).json(employee);
    } catch (error) {
      console.error('Error fetching employee entities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.createUser = async (req, res) => {
    const { username, password, is_admin, is_staff, email, phone } = req.body;
    
    try {
      if(!username || !password){
        return res.status(401).json({ message: 'Invalid request' });
      }
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
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.user.delete({ where: { id: Number(id) } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


  // Updates

  // controllers/userController.js
const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const { user, token } = await userService.loginUser(name, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  let { id } = req.params;
  let userData = await req.body
  try {
    const user = await userService.updateUser(id, userData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};