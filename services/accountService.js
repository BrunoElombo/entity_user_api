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

exports.getAllAccounts = async (idEntity) => {
  return prisma.account.findMany({
    where: { 
      idEntity, 
      isActive: true 
    },
  });
};

exports.getAccountById = async (id, idEntity) => {
  const account = await prisma.account.findUnique({ where: { id, isActive: true, idEntity } });
  if (!account) {
    throw new Error('Account not found');
  }
  return account;
};

exports.updateAccount = async (id, accountData, id_entity) => {
  const { name, displayName, amount, idOperator, idEntity, idEmployee, idExternalEntity } = accountData;
  return prisma.account.update({
    where: { id, isActive: true, idEntity:id_entity  },
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

exports.deleteAccount = async (id, idEntity) => {
  const account = await prisma.account.findUnique({ where: { id, isActive: true, idEntity } });
  if (!account) {
    throw new Error('Account not found');
  }
  await prisma.account.update({ 
    where: { id, isActive: true, idEntity },
    data:{
      isActive: false
    } 
  });
};