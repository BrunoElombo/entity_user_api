// services/employeeService.js
const prisma = require('../prisma/client');

exports.createEmployee = async (employeeData) => {
  const { id_level, id_grade, id_department, id_user, id_entity, id_function, id_role } = employeeData;
  return prisma.employee.create({
    data: {
      id_level,
      id_grade,
      id_department,
      id_user,
      id_entity,
      id_function,
      id_role
    }
  });
};

exports.getEmployeeById = async (id) => {
  const employee = await prisma.employee.findUnique({ where: { id } });
  if (!employee) {
    throw new Error('Employee not found');
  }
  return employee;
};

exports.updateEmployee = async (id, employeeData) => {
  const { id_level, id_grade, id_department, id_function, id_role } = employeeData;
  return prisma.employee.update({
    where: { id },
    data: {
      id_level,
      id_grade,
      id_department,
      id_function,
      id_role
    }
  });
};

exports.deleteEmployee = async (id) => {
  const employee = await prisma.employee.findUnique({ where: { id } });
  if (!employee) {
    throw new Error('Employee not found');
  }
  await prisma.employee.delete({ where: { id } });
};