const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


exports.getAllOperators= async (req, res)=>{
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id;

    try {
        let response = await prisma.operator.findMany({
            where:{isActive: true}
        });

        return res.send(response);

    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

exports.getOperatorById= async(req, res)=>{
    let {id} = req.params;

    const operator = await prisma.operator.findUnique({
        where:{isActive: true, id}
    });

    return res.send(operator);
}

exports.getOperatorAccounts= async (req, res)=>{
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id;

    let {id} = req.params;

    try {
        // Get the connected employee
        const employee = await prisma.employee.findUnique({
            where:{id_user: userId}
        })

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
        return res.status(500).send(error.message);
    }

}




exports.updateOperator=(req, res)=>{

}

exports.deleteOperator=(req, res)=>{

}
