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

exports.getAllDepartments = async (id_entity) => {
  return prisma.department.findMany({
    where: { isActive: true, id_entity },
  });
};

exports.getDepartmentById = async (id, id_entity) => {
  const department = await prisma.department.findUnique({  where: { id, isActive: true, id_entity } });
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

exports.updateDepartment = async (id, departmentData, idEntity) => {
  const { id_entity, name, displayName, description, budget, id_employee, id_user } = departmentData;
  return prisma.department.update({
    where: { id, isActive: true, id_entity: idEntity },
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

exports.deleteDepartment = async (id, id_entity) => {
  const department = await prisma.department.findUnique({ where: { id, isActive: true, id_entity } });
  if (!department) {
    throw new Error('Department not found');
  }
  await prisma.department.update({ 
    where: { id, id_entity },
    data:{
      isActive: false,
    }
  });
};