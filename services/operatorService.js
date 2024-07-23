// services/operatorService.js
const prisma = require('../prisma/client');

exports.createOperator = async (operatorData) => {
  const { name, displayName, type } = operatorData;
  return prisma.operator.create({
    data: {
      name,
      displayName,
      type: type || 'MOBILE',
    },
  });
};

exports.getAllOperators = async () => {
  return prisma.operator.findMany({
    where: { isActive: true },
  });
};

exports.getOperatorById = async (id) => {
  const operator = await prisma.operator.findUnique({ where: { id } });
  if (!operator) {
    throw new Error('Operator not found');
  }
  return operator;
};

exports.updateOperator = async (id, operatorData) => {
  const { name, displayName, type } = operatorData;
  return prisma.operator.update({
    where: { id },
    data: {
      name,
      displayName,
      type,
    },
  });
};

exports.deleteOperator = async (id) => {
  const operator = await prisma.operator.findUnique({ where: { id } });
  if (!operator) {
    throw new Error('Operator not found');
  }
  await prisma.operator.delete({ where: { id } });
};