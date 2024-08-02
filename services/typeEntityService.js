// services/typeEntityService.js
const prisma = require('../prisma/client');

exports.createTypeEntity = async (typeEntityData) => {
  const { id_external_entity, id_type } = typeEntityData;
  return prisma.type_Entity.create({
    data: {
      id_external_entity,
      id_type,
    },
  });
};

exports.getAllTypeEntities = async () => {
  return prisma.type_Entity.findMany({
    where: { isActive: true },
  });
};

exports.getTypeEntityById = async (id) => {
  const typeEntity = await prisma.type_Entity.findUnique({ where: { id, isActive: true } });
  if (!typeEntity) {
    throw new Error('Type Entity not found');
  }
  return typeEntity;
};

exports.updateTypeEntity = async (id, typeEntityData) => {
  const { id_external_entity, id_type } = typeEntityData;
  return prisma.type_Entity.update({
    where: { id, isActive: true },
    data: {
      id_external_entity,
      id_type,
    },
  });
};

exports.deleteTypeEntity = async (id) => {
  const typeEntity = await prisma.type_Entity.findUnique({ where: { id, isActive: true } });
  if (!typeEntity) {
    throw new Error('Type Entity not found');
  }
  await prisma.type_Entity.update({ 
    where: { id, isActive: true },
    data:{
      isActive: false
    }
  });
};
