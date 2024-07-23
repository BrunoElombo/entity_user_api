// services/associerService.js
const prisma = require('../prisma/client');

exports.createAssociates = async (associateData) => {
  const { id_entity, id_external_entity } = associateData;
  return prisma.associate.create({
    data: {
      id_entity,
      id_external_entity,
    },
  });
};

exports.getAllAssociates = async (id_entity) => {
  return prisma.associate.findMany({
    where: { isActive: true, id_entity },
  });
};

exports.getAssociateById = async (id, id_entity) => {
  const associate = await prisma.associate.findUnique({ where: { id, isActive: true, id_entity } });
  if (!associate) {
    throw new Error('associate not found');
  }
  return associate;
};

exports.updateAssociate = async (id, associateData, idEntity) => {
  const { id_entity, id_external_entity } = associateData;
  return prisma.associate.update({
    where: { id, isActive: true, id_entity },
    data: {
      id_entity: idEntity,
      id_external_entity,
    },
  });
};

exports.deleteAssociate = async (id, id_entity) => {
  const associate = await prisma.associate.findUnique({ where: { id, isActive: true, id_entity } });
  if (!associate) {
    throw new Error('associate not found');
  }
  await prisma.associate.update({ 
    where: { id, isActive: true },
    data:{
      isActive: false,
    }
  });
};