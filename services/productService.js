// services/productService.js
const prisma = require('../prisma/client');

exports.createProduct = async (productData) => {
  const { name, displayName, unit, description, id_entity } = productData;
  return prisma.product.create({
    data: {
      name,
      displayName,
      unit: unit || 0.0,
      description,
      id_entity,
    },
  });
};

exports.getAllProducts = async (id_entity) => {
  return prisma.product.findMany({
    where: { isActive: true, id_entity },
  });
};

exports.getProductById = async (id, id_entity) => {
  const product = await prisma.product.findUnique({ where: { id, id_entity } });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

exports.updateProduct = async (id, productData, idEntity) => {
  const { name, displayName, unit, description, id_entity } = productData;
  return prisma.product.update({
    where: { id, id_entity: idEntity },
    data: {
      name,
      displayName,
      unit,
      description,
      id_entity,
    },
  });
};

exports.deleteProduct = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    throw new Error('Product not found');
  }
  await prisma.product.delete({ where: { id } });
};