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

exports.getAllAssociates = async () => {
  return prisma.associate.findMany({
    where: { isActive: true },
  });
};

exports.getAssociateById = async (id) => {
  const associate = await prisma.associate.findUnique({ where: { id } });
  if (!associate) {
    throw new Error('associate not found');
  }
  return associate;
};

exports.updateAssociate = async (id, associateData) => {
  const { id_entity, id_external_entity } = associateData;
  return prisma.associate.update({
    where: { id },
    data: {
      id_entity,
      id_external_entity,
    },
  });
};

exports.deleteAssociate = async (id) => {
  const associate = await prisma.associate.findUnique({ where: { id } });
  if (!associate) {
    throw new Error('associate not found');
  }
  await prisma.associate.delete({ where: { id } });
};