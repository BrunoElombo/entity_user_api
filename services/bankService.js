// services/bankService.js
const prisma = require('../prisma/client');

exports.createBank = async (bankData) => {
  const { name, displayName, sigle, Acronyme } = bankData;
  return prisma.bank.create({
    data: {
      name,
      displayName,
      sigle,
      Acronyme,
    },
  });
};

exports.getAllBanks = async () => {
  return prisma.bank.findMany({
    where: { isActive: true },
  });
};

exports.getBankById = async (id) => {
  const bank = await prisma.bank.findUnique({ where: { id } });
  if (!bank) {
    throw new Error('Bank not found');
  }
  return bank;
};

exports.updateBank = async (id, bankData) => {
  const { name, displayName, sigle, Acronyme } = bankData;
  return prisma.bank.update({
    where: { id },
    data: {
      name,
      displayName,
      sigle,
      Acronyme,
    },
  });
};

exports.deleteBank = async (id) => {
  const bank = await prisma.bank.findUnique({ where: { id } });
  if (!bank) {
    throw new Error('Bank not found');
  }
  await prisma.bank.delete({ where: { id } });
};