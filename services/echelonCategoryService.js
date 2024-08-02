// services/echelonCategoryService.js
const prisma = require('../prisma/client');

exports.createEchelonCategory = async (echelonCategoryData) => {
  const { name, displayName, category, power } = echelonCategoryData;
  return prisma.echelonCategory.create({
    data: {
      name,
      displayName,
      category,
      power,
    },
  });
};

exports.getAllEchelonCategories = async () => {
  return prisma.echelonCategory.findMany({
    where: { isActive: true },
  });
};

exports.getEchelonCategoryById = async (id) => {
  const echelonCategory = await prisma.echelonCategory.findUnique({ where: { id } });
  if (!echelonCategory) {
    throw new Error('Echelon Category not found');
  }
  return echelonCategory;
};

exports.updateEchelonCategory = async (id, echelonCategoryData) => {
  const { name, displayName, category, power } = echelonCategoryData;
  return prisma.echelonCategory.update({
    where: { id },
    data: {
      name,
      displayName,
      category,
      power,
    },
  });
};

exports.deleteEchelonCategory = async (id) => {
  const echelonCategory = await prisma.echelonCategory.findUnique({ where: { id } });
  if (!echelonCategory) {
    throw new Error('Echelon Category not found');
  }
  await prisma.echelonCategory.update({ 
    where: { id },
    data:{
        isActive: false
    }
 });
};