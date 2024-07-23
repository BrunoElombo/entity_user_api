// services/employeeRoleService.js
const prisma = require('../prisma/client');

exports.createEmployeeRole = async (employeeRoleData) => {
  const { id_employee } = employeeRoleData;
  return prisma.employeeRole.create({
    data: {
      id_employee,
    },
  });
};

exports.getAllEmployeeRoles = async () => {
  return prisma.employeeRole.findMany({
    where: { isActive: true },
  });
};

exports.getEmployeeRoleById = async (id) => {
  const employeeRole = await prisma.employeeRole.findUnique({ where: { id } });
  if (!employeeRole) {
    throw new Error('Employee role not found');
  }
  return employeeRole;
};

exports.updateEmployeeRole = async (id, employeeRoleData) => {
  const { id_employee } = employeeRoleData;
  return prisma.employeeRole.update({
    where: { id },
    data: {
      id_employee,
    },
  });
};

exports.deleteEmployeeRole = async (id) => {
  const employeeRole = await prisma.employeeRole.findUnique({ where: { id } });
  if (!employeeRole) {
    throw new Error('Employee role not found');
  }
  await prisma.employeeRole.update({ 
    where: { id },
    data:{
        isActive: false,
    }
});
};