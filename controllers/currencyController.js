const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken' );


exports.getCurrencies = async (req, res)=>{
    try {
        // Get the connected user
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;

      const currencies = await prisma.Currency.findMany({
        
        where:{
            isActive: true
        },
        include:{
            currencyCuts: true
        }
      });


      return res.status(200).json(currencies);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

