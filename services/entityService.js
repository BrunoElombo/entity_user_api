// services/entityService.js
const prisma = require('../prisma/client');

exports.createEntity = async (entityData) => {
  const { raison_social, Sigle, logo, niu, displayName } = entityData;
  return prisma.entity.create({
    data: {
      raison_social,
      Sigle,
      logo,
      niu,
      displayName,
    },
  });
};

exports.getAllEntities = async () => {
  return prisma.entity.findMany({
    where: { isActive: true },
  });
};

exports.getEntityById = async (id) => {
  const entity = await prisma.entity.findUnique({ where: { id } });
  if (!entity) {
    throw new Error('Entity not found');
  }
  return entity;
};

exports.updateEntity = async (id, entityData) => {
  const { raison_social, Sigle, logo, niu, displayName } = entityData;
  return prisma.entity.update({
    where: { id },
    data: {
      raison_social,
      Sigle,
      logo,
      niu,
      displayName,
    },
  });
};

exports.deleteEntity = async (id) => {
  const entity = await prisma.entity.findUnique({ where: { id } });
  if (!entity) {
    throw new Error('Entity not found');
  }
  await prisma.entity.delete({ where: { id } });
};