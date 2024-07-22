// services/departmentService.js
const prisma = require('../prisma/client');

exports.createDepartment = async (departmentData) => {
  const { id_entity, name, displayName, description, budget, id_employee, id_user } = departmentData;
  return prisma.department.create({
    data: {
      id_entity,
      name,
      displayName,
      description,
      budget,
      id_employee,
      id_user,
    },
  });
};

exports.getAllDepartments = async () => {
  return prisma.department.findMany({
    where: { isActive: true },
  });
};

exports.getDepartmentById = async (id) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

exports.updateDepartment = async (id, departmentData) => {
  const { id_entity, name, displayName, description, budget, id_employee, id_user } = departmentData;
  return prisma.department.update({
    where: { id },
    data: {
      id_entity,
      name,
      displayName,
      description,
      budget,
      id_employee,
      id_user,
    },
  });
};

exports.deleteDepartment = async (id) => {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new Error('Department not found');
  }
  await prisma.department.delete({ where: { id } });
};