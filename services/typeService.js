// services/typeService.js
const prisma = require('../prisma/client');

exports.createType = async (typeData) => {
  const { name } = typeData;
  return prisma.type.create({
    data: {
      name,
    },
  });
};

exports.getAllTypes = async () => {
  return prisma.type.findMany({
    where: { isActive: true },
  });
};

exports.getTypeById = async (id) => {
  const type = await prisma.type.findUnique({ where: { id } });
  if (!type) {
    throw new Error('Type not found');
  }
  return type;
};

exports.updateType = async (id, typeData) => {
  const { name } = typeData;
  return prisma.type.update({
    where: { id },
    data: {
      name,
    },
  });
};

exports.deleteType = async (id) => {
  const type = await prisma.type.findUnique({ where: { id } });
  if (!type) {
    throw new Error('Type not found');
  }
  await prisma.type.delete({ where: { id } });
};