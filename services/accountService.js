// services/accountService.js
const prisma = require('../prisma/client');

exports.createAccount = async (accountData) => {
  const { name, displayName, amount, idOperator, idEntity, idEmployee, idExternalEntity } = accountData;
  return prisma.account.create({
    data: {
      name,
      displayName,
      amount: amount || 0.0,
      idOperator,
      idEntity,
      idEmployee,
      idExternalEntity,
    },
  });
};

exports.getAllAccounts = async () => {
  return prisma.account.findMany({
    where: { isActive: true },
  });
};

exports.getAccountById = async (id) => {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) {
    throw new Error('Account not found');
  }
  return account;
};

exports.updateAccount = async (id, accountData) => {
  const { name, displayName, amount, idOperator, idEntity, idEmployee, idExternalEntity } = accountData;
  return prisma.account.update({
    where: { id },
    data: {
      name,
      displayName,
      amount,
      idOperator,
      idEntity,
      idEmployee,
      idExternalEntity,
    },
  });
};

exports.deleteAccount = async (id) => {
  const account = await prisma.account.findUnique({ where: { id } });
  if (!account) {
    throw new Error('Account not found');
  }
  await prisma.account.delete({ where: { id } });
};