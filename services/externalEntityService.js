// services/externalEntityService.js
const prisma = require('../prisma/client');

exports.createExternalEntity = async (externalEntityData) => {
  const { name, displayName, id_entity } = externalEntityData;
  return await prisma.externalEntity.create({
    data: {
      name,
      displayName,
      id_entity,
    },
  });
};

exports.getAllExternalEntities = async (id_entity) => {
  return prisma.externalEntity.findMany({
    where: { isActive: true, id_entity },
  });
};

exports.getExternalEntityById = async (id, id_entity) => {
  const externalEntity = await prisma.externalEntity.findUnique({ where: { id, isActive: true, id_entity } });
  if (!externalEntity) {
    throw new Error('External Entity not found');
  }
  return externalEntity;
};

exports.updateExternalEntity = async (id, externalEntityData, id_entity) => {
  return prisma.externalEntity.update({
    where: { id, isActive: true, id_entity },
    data: {
      ...externalEntityData
    },
  });
};

exports.deleteExternalEntity = async (id, id_entity) => {
  const externalEntity = await prisma.externalEntity.findUnique({ where: { id, isActive: true, id_entity } });
  if (!externalEntity) {
    throw new Error('External Entity not found');
  }
  await prisma.externalEntity.update({ 
    where: { id, isActive: true, id_entity },
    data:{
      isActive: false
    }
  });
};