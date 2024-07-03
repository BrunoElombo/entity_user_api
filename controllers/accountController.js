const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const { AccountType } = require('@prisma/client');
const jwt = require('jsonwebtoken');

exports.getAllEntityAccounts=async(req, res)=>{
    // Get the user tokens
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id;

    // Get the query parameters "types"
    let  { type, operator } = req.query;

    try {
        let employee = await prisma.employee.findUnique({
            where:{id_user: userId}
        })
        let idEntity = employee.id_entity;

        if(type){
            let account = await getAccountByType(idEntity, type);
            return res.send(account);
        }

        if(operator){
            let account = await getAccountByOperator(idEntity, operator);
            return res.send(account);
        }

        let account = await prisma.account.findMany({
            where: {idEntity: idEntity}
        });

        return res.send(account);

    } catch (error) {
        console.log(error);
        return res.send(error);
    }

}

exports.getAccountById=(req, res)=>{

}



const getAccountByType = async (idEntity, type)=>{
    try{
        let accountType = type.toUpperCase();
        let operator = await prisma.operator.findMany({
            where:{
                type: {
                    equals: accountType,
                    mode: 'insensitive'
                }
            }
        });

        let account = await prisma.account.findMany({
            where:{idOperator: operator.id, idEntity: idEntity}
        });

        return account;
    }catch(e){
        throw new Error(e.message);
    }
}
