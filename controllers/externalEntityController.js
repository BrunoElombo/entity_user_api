// controllers/externalEntityController.js
const externalEntityService = require('../services/externalEntityService');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.createExternalEntity = async (req, res) => {
  try {
    const externalEntity = await externalEntityService.createExternalEntity(req.body);
    res.status(201).json(externalEntity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllExternalEntities = async (req, res) => {
  try {
    const externalEntities = await externalEntityService.getAllExternalEntities();
    res.json(externalEntities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExternalEntityById = async (req, res) => {
  try {
    const externalEntity = await externalEntityService.getExternalEntityById(req.params.id);
    res.json(externalEntity);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateExternalEntity = async (req, res) => {
  try {
    const externalEntity = await externalEntityService.updateExternalEntity(req.params.id, req.body);
    res.json(externalEntity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExternalEntity = async (req, res) => {
  try {
    await externalEntityService.deleteExternalEntity(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getExternalEntityBanks= async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;
  const id = req.params.id;
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { id_external_entity: id, isActive: true },
    });
    

    const bankMap = new Map();

    for (const bankAccount of bankAccounts) {
      const bankId = bankAccount.id_bank;

      // Check if bankId already exists in the map
      if (!bankMap.has(bankId)) {
        const bank = await prisma.bank.findUnique({
          where: { id: bankId },
        });

        bankMap.set(bankId, {
          bank: bank,
          bankAccounts: [],
        });
      }

      // Add bank account to corresponding bank
      bankMap.get(bankId).bankAccounts.push(bankAccount);
    }

    // Convert map values to an array and send the response
    const result = Array.from(bankMap.values());
    return res.send(result);

  } catch (error){
    console.log(error.message);
    return res.status(400).json({error: error.message});
  }
}

// module.exports = EntityController;