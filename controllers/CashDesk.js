const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


exports.getCashDesks = async (req, res)=>{
    try {
        // Get the connected user
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;

      const employee = await prisma.employee.findUnique({
          where:{id_user: userId, is_active:true}
      });

      const entityCashDesks = await prisma.CashDesk.findMany({
        where:{
          idEntity: employee.id_entity
        },
      });


      return res.status(200).json(entityCashDesks);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

