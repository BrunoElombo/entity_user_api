// services/siteService.js
const prisma = require('../prisma/client');

exports.createSite = async (siteData) => {
  const { name, displayName, type, id_entity } = siteData;
  return prisma.site.create({
    data: {
      name,
      displayName,
      type,
      id_entity,
    },
  });
};

exports.getAllSites = async () => {
  return prisma.site.findMany({
    where: { isActive: true },
  });
};

exports.getSiteById = async (id) => {
  const site = await prisma.site.findUnique({ where: { id, isActive: true } });
  if (!site) {
    throw new Error('Site not found');
  }
  return site;
};

exports.updateSite = async (id, siteData) => {
  const { name, displayName, type, id_entity } = siteData;
  return prisma.site.update({
    where: { id, isActive: true },
    data: {
      name,
      displayName,
      type,
      id_entity,
    },
  });
};

exports.deleteSite = async (id) => {
  const site = await prisma.site.findUnique({ where: { id, isActive: true } });
  if (!site) {
    throw new Error('Site not found');
  }
  await prisma.site.update({ 
    where: { id, isActive: true },
    data:{
      isActive: false
    }
  });
};