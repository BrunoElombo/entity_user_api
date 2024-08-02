// services/currencyCutsService.js
const prisma = require('../prisma/client');

exports.createCurrencyCuts = async (currencyCutsData) => {
  const { value, type, currencyId } = currencyCutsData;
  return prisma.currencyCuts.create({
    data: {
      value,
      type,
      currencyId,
    },
  });
};

exports.getAllCurrencyCuts = async () => {
  return prisma.currencyCuts.findMany({
    where: { isActive: true },
  });
};

exports.getCurrencyCutsById = async (id) => {
  const currencyCuts = await prisma.currencyCuts.findUnique({ where: { id } });
  if (!currencyCuts) {
    throw new Error('Currency cuts not found');
  }
  return currencyCuts;
};

exports.updateCurrencyCuts = async (id, currencyCutsData) => {
  const { value, type, currencyId } = currencyCutsData;
  return prisma.currencyCuts.update({
    where: { id },
    data: {
      value,
      type,
      currencyId,
    },
  });
};

exports.deleteCurrencyCuts = async (id) => {
  const currencyCuts = await prisma.currencyCuts.findUnique({ where: { id } });
  if (!currencyCuts) {
    throw new Error('Currency cuts not found');
  }
  await prisma.currencyCuts.update({ 
    where: { id },
    data:{
      isActive: false,
    }
  });
};