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

exports.getAllCashDesks = async (idEntity) => {
  return prisma.cashDesk.findMany({
    where: { isActive: true, idEntity },
  });
};

exports.getCashDeskById = async (id, idEntity) => {
  const cashDesk = await prisma.cashDesk.findUnique({ where: { id, idEntity } });
  if (!cashDesk) {
    throw new Error('Cash desk not found');
  }
  return cashDesk;
};

exports.updateCashDesk = async (id, cashDeskData, id_entity) => {
  const { name, displayName, amount, idEntity } = cashDeskData;
  return prisma.cashDesk.update({
    where: { id, idEntity:id_entity },
    data: {
      name,
      displayName,
      amount,
      idEntity,
    },
  });
};

exports.deleteCashDesk = async (id, idEntity) => {
  const cashDesk = await prisma.cashDesk.findUnique({ where: { id, idEntity } });
  if (!cashDesk) {
    throw new Error('Cash desk not found');
  }
  await prisma.cashDesk.update({ 
    where: { id, idEntity },
    data:{
      isActive: false,
    }
  });
};