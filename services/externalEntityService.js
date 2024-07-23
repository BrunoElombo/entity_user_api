// services/externalEntityService.js
const prisma = require('../prisma/client');

exports.createExternalEntity = async (externalEntityData) => {
  const { name, displayName, id_entity } = externalEntityData;
  return prisma.externalEntity.create({
    data: {
      name,
      displayName,
      id_entity,
    },
  });
};

exports.getAllExternalEntities = async () => {
  return prisma.externalEntity.findMany({
    where: { isActive: true },
  });
};

exports.getExternalEntityById = async (id) => {
  const externalEntity = await prisma.externalEntity.findUnique({ where: { id, isActive: true } });
  if (!externalEntity) {
    throw new Error('External Entity not found');
  }
  return externalEntity;
};

exports.updateExternalEntity = async (id, externalEntityData) => {
  return prisma.externalEntity.update({
    where: { id, isActive: true },
    data: {
      ...externalEntityData
    },
  });
};

exports.deleteExternalEntity = async (id) => {
  const externalEntity = await prisma.externalEntity.findUnique({ where: { id, isActive: true } });
  if (!externalEntity) {
    throw new Error('External Entity not found');
  }
  await prisma.externalEntity.update({ 
    where: { id, isActive: true },
    data:{
      isActive: false
    }
  });
};