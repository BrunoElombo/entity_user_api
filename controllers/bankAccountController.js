const PrismaClient = require('@prisma/client').PrismaClient;
const bankAccountService = require('../services/bankAccountService');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');



exports.createBankAccount = async (req, res) =>{
    try{
        let bankAccount = bankAccountService.createBankAccount(req.body);
        res.json(bankAccount);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
}
exports.getAllBankAccounts = async (req, res) =>{
    try{
        let bankAccounts = await bankAccountService.getAllBankAccounts();
        return res.json(bankAccounts);
    }catch(error){
        return res.sendStatus(404);
    }
}
exports.getBankAccountById = async (req, res) =>{

}
exports.updateBankAccount = async (req, res) =>{

}
exports.deleteBankAccount = async (req, res) =>{

}


exports.getBankByEntity = async (req, res) =>{
    let entity_id = req.params.entity_id;
    try {
        const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
        const userId = decodedToken.id;
        
        const employee = await prisma.employee.findUnique({
            where:{id_user: userId, is_active:true},
            include:{
                entity: true
            }
        });

        const entityBanks = await prisma.bankAccount.findMany({
            where:{
                AND:[
                    {id_entity: entity_id},
                    {id_entity: employee.entity.id}
                ]
            }
        });

        return res.status(200).send(entityBanks)

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

exports.getBankByEmployee = async (req, res) =>{
    let employee_id = req.params.employee_id;
    try {
        const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
        const userId = decodedToken.id;

        const employee = await prisma.employee.findUnique({
            where:{id_user: userId, is_active:true},
            include:{
                entity: true
            }
        });

        const employeeBanks = await prisma.bankAccount.findMany({
            where:{
                AND:[
                    {id_employee: employee_id},
                    {id_employee: employee.id}
                ]
            }
        });

        return res.status(200).send(employeeBanks);

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}

exports.getEmployeeBankAccounts = async (req, res)=>{
    if(req.query.entity_id){
        entity_id = req.query.entity_id;
        try {
          const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
          const userId = decodedToken.id;
          const employee = await prisma.employee.findUnique({
              where:{id_user: userId, is_active:true}
          });
    
          const employeeBanks = await prisma.bank.findMany({
            where:{
                id_employee: employee.id
            }
          });
    
          console.log(employeeBanks)
    
    
          return res.status(200).json(employeeBanks);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' });
        }
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

      const entityBanks = await prisma.bank.findMany({
        where:{
            id_entity: employee.entity.id
        }
      });


      return res.status(200).json(entityBanks);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
