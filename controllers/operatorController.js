const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const operatorService = require('../services/operatorService');


exports.getOperatorAccounts= async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;
  
  let {id} = req.params;
  try {
    // Get the connected employee
    const employee = await prisma.employee.findUnique({
      where:{id_user: decodedToken.id}
    });

    
      // Get operators by id
      const operator = await prisma.operator.findUnique({
          where:{isActive: true, id: id}
      });
      
      // Get accounts of a given operator in for a given entity
      const accounts = await prisma.account.findMany({
        where:{
          isActive: true,
          idOperator: operator.id,
          idEntity: employee.id_entity
        }
      });
      return res.send(accounts);
  } catch (error) {
    console.log(error.message);
      return res.status(404).json({error: error.message});
  }

}

exports.createOperator = async (req, res) => {
  try {
    const operator = await operatorService.createOperator(req.body);
    res.status(201).json(operator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOperators = async (req, res) => {
  try {
    const operators = await operatorService.getAllOperators();
    res.json(operators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOperatorById = async (req, res) => {
  try {
    const operator = await operatorService.getOperatorById(req.params.id);
    res.json(operator);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateOperator = async (req, res) => {
  try {
    const operator = await operatorService.updateOperator(req.params.id, req.body);
    res.json(operator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOperator = async (req, res) => {
  try {
    await operatorService.deleteOperator(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};