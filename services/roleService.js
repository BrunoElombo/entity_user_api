// services/roleService.js
const prisma = require('../prisma/client');

exports.createRole = async (roleData) => {
  const { name, displayName, power } = roleData;
  return prisma.role.create({
    data: {
      name,
      displayName,
      power,
    },
  });
};

exports.getAllRoles = async () => {
  return prisma.role.findMany({
    where: { isActive: true },
  });
};

exports.getRoleById = async (id) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new Error('Role not found');
  }
  return role;
};

exports.updateRole = async (id, roleData) => {
  const { name, displayName, power } = roleData;
  return prisma.role.update({
    where: { id },
    data: {
      name,
      displayName,
      power,
    },
  });
};

exports.deleteRole = async (id) => {
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) {
    throw new Error('Role not found');
  }
  await prisma.role.delete({ where: { id } });
};