// services/cashDeskService.js
const prisma = require('../prisma/client');

exports.createCashDesk = async (cashDeskData) => {
  const { name, displayName, amount, idEntity } = cashDeskData;
  return prisma.cashDesk.create({
    data: {
      name,
      displayName,
      amount: amount || 0.0,
      idEntity,
    },
  });
};

exports.getAllCashDesks = async () => {
  return prisma.cashDesk.findMany({
    where: { isActive: true },
  });
};

exports.getCashDeskById = async (id) => {
  const cashDesk = await prisma.cashDesk.findUnique({ where: { id } });
  if (!cashDesk) {
    throw new Error('Cash desk not found');
  }
  return cashDesk;
};

exports.updateCashDesk = async (id, cashDeskData) => {
  const { name, displayName, amount, idEntity } = cashDeskData;
  return prisma.cashDesk.update({
    where: { id },
    data: {
      name,
      displayName,
      amount,
      idEntity,
    },
  });
};

exports.deleteCashDesk = async (id) => {
  const cashDesk = await prisma.cashDesk.findUnique({ where: { id } });
  if (!cashDesk) {
    throw new Error('Cash desk not found');
  }
  await prisma.cashDesk.delete({ where: { id } });
};