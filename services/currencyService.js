// services/currencyService.js
const prisma = require('../prisma/client');

exports.createCurrency = async (currencyData) => {
  const { code, name, displayName, symbol } = currencyData;
  return prisma.currency.create({
    data: {
      code,
      name,
      displayName,
      symbol,
    },
  });
};

exports.getAllCurrencies = async () => {
  return prisma.currency.findMany({
    where: { isActive: true },
  });
};

exports.getCurrencyById = async (id) => {
  const currency = await prisma.currency.findUnique({ where: { id } });
  if (!currency) {
    throw new Error('Currency not found');
  }
  return currency;
};

exports.updateCurrency = async (id, currencyData) => {
  const { code, name, displayName, symbol } = currencyData;
  return prisma.currency.update({
    where: { id },
    data: {
      code,
      name,
      displayName,
      symbol,
    },
  });
};

exports.deleteCurrency = async (id) => {
  const currency = await prisma.currency.findUnique({ where: { id } });
  if (!currency) {
    throw new Error('Currency not found');
  }
  await prisma.currency.delete({ where: { id } });
};