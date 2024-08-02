// services/departmentService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllDepartments = async (userId) => {

  try{
    // let employee = await prisma.employee.findUnique({
    //   where: {id: userId.id, is_active: true},
    //   include:{
    //     entity: true,
    //     Departement: true,
    //   }
    // })

    let departments = await prisma.department.findMany({
      where:{
        // id_entity: employee.id_entity
        isActive: true,
      }
    })
    return departments
  }catch(error){
    throw new Error(error)
  }
};

exports.getDepartmentById = async (id) => {
  return await prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      Entity: true
    },
  });
};

exports.createDepartment = async (departmentData) => {
  return await prisma.department.create({
    data: departmentData,
  });
};

exports.updateDepartment = async (id, departmentData) => {
  return await prisma.department.update({
    where: {
      id,
    },
    data: departmentData,
  });
};

exports.deleteDepartment = async (id) => {
  return await prisma.department.delete({
    where: {
      id,
    },
  });
};