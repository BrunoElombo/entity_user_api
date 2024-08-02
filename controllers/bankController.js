const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bankService = require('../services/bankService');

exports.createBank = async (req, res) => {
  try {
    const bank = await bankService.createBank(req.body);
    res.status(201).json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const banks = await bankService.getAllBanks();
    res.json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBankById = async (req, res) => {
  try {
    const bank = await bankService.getBankById(req.params.id);
    res.json(bank);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateBank = async (req, res) => {
  try {
    const bank = await bankService.updateBank(req.params.id, req.body);
    res.json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    await bankService.deleteBank(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


exports.getEmployeeBanks = async (req, res)=>{
    try {
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;
      const employee = await prisma.employee.findUnique({
          where:{id_user: userId, is_active:true}
      });

      const employeeBanks = await prisma.employeeBank.findMany({
        where:{
          id_employee: employee.id
        },
        select:{
          bank: {
            select:{
              id: true,
              name: true,
              sigle: true,
              Acronyme: true,
              bank_account:true
            }
          },
        }
      });

      // const banks = await prisma.Bank.findMany({
      //   where:{
      //     id: employeeBanks.id_bank
      //   }
      // });

      return res.status(200).json(employeeBanks);
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
}

exports.getEntityBanks = async (req, res)=>{
    try {
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;

      const employee = await prisma.employee.findUnique({
          where:{id_user: userId, is_active:true},
          include:{
            entity:true
          }
      });

      const bankAccounts = await prisma.bankAccount.findMany({
        where:{
          id_entity: employee.entity.id
        },
      })

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
      
    } catch (error) {
      console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

