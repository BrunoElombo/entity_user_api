const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const siteService = require('../services/siteService');

exports.createSite = async (req, res) => {
  try {
    const site = await siteService.createSite(req.body);
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeeSites = async (req, res)=>{
    try {
      const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
      const userId = decodedToken.id;

      const employee = await prisma.employee.findUnique({
          where:{id_user: userId},
          include: {
            Function: true,
            role: true,
          }
      });

      if(employee.Function != null){
        if(employee.Function.name === "gueritte_chef" || employee.Function.name === "coordinator"){
          const sites = await prisma.site.findMany({
            where:{id_entity: employee.id_entity, type: "ONFIELD"}
          });
          return res.status(200).json(sites);
        }

        const sites = await prisma.site.findMany({
          where:{id_entity: employee.id_entity, type: "HEADQUARTER"}
        });
        return res.status(200).json(sites);

      }
      const sites = await prisma.site.findMany({
        where:{id_entity: employee.id_entity, type: "HEADQUARTER"}
      });
      return res.status(200).json(sites);
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
    // const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    // const userId = decodedToken.id;

}

exports.getAllSites = async (req, res)=>{
  try {
    // const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    // const userId = decodedToken.id;

    // const employee = await prisma.employee.findUnique({
    //     where:{id_user: userId}
    // });

    const sites = await prisma.site.findMany({
      // where:{id_entity: employee.id_entity}
    });

    return res.status(200).json(sites);
    
  } catch (error) {
      return res.status(404).json({ error: error.message });
  }
  // const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  // const userId = decodedToken.id;

}

exports.getSiteById = async (req, res) => {
  try {
    const site = await siteService.getSiteById(req.params.id);
    res.json(site);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const site = await siteService.updateSite(req.params.id, req.body);
    res.json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    await siteService.deleteSite(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};