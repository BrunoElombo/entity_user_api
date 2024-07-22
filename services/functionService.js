// services/functionService.js
const prisma = require('../prisma/client');

exports.createFunction = async (functionData) => {
  const { name, displayName, power } = functionData;
  return prisma.function.create({
    data: {
      name,
      displayName,
      power,
    },
  });
};

exports.getAllFunctions = async () => {
  return prisma.function.findMany({
    where: { isActive: true },
  });
};

exports.getFunctionById = async (id) => {
  const func = await prisma.function.findUnique({ where: { id } });
  if (!func) {
    throw new Error('Function not found');
  }
  return func;
};

exports.updateFunction = async (id, functionData) => {
  const { name, displayName, power } = functionData;
  return prisma.function.update({
    where: { id },
    data: {
      name,
      displayName,
      power,
    },
  });
};

exports.deleteFunction = async (id) => {
  const func = await prisma.function.findUnique({ where: { id } });
  if (!func) {
    throw new Error('Function not found');
  }
  await prisma.function.delete({ where: { id } });
};