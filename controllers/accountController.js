const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

exports.getAllEntityAccounts=async(req, res)=>{
    // Get the user tokens
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id;

    // Get the query parameters "types"
    let  { type } = req.query;

    try {
        let employee = await prisma.employee.findUnique({
            where:{id_user: userId}
        })
        let idEntity = employee.id_entity;

        if(type){
            let account = await getAccountByType(idEntity, type);
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
        let account = await prisma.account.findMany({
            where:{type: type?.toUpperCase(), idEntity: idEntity}
        });
        return account;
    }catch(e){
        console.error(e);
        return res.send(500);
    }
}