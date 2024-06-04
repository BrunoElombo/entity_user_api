const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


exports.getEmployeeBanks = async (req, res)=>{
    try {
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;
      const employee = await prisma.employee.findUnique({
          where:{id_user: userId, is_active:true}
      });

      const employeeBanks = await prisma.EmployeeBank.findMany({
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
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
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
        console.log(error.message)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

