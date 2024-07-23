const jwt = require('jsonwebtoken');
require('dotenv').config();
const prisma = require('../prisma/client');

verifyToken = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let token = auth?.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;

    if(!decoded.id) return res.status(401).send('Not an employee');

    const employee  = await prisma.employee.findUnique({
      where: {id_user: req.userId}
    });

    if(!employee) return res.status(401).send('No employee account found');
    let entityId = employee.id_entity
    req.entity = entityId;
    
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = verifyToken;