const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();


const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  try {
    const user = await prisma.user.findUnique({ where: { name:username } });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: error.message });
  }
};
