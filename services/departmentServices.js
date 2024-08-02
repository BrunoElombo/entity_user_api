// services/departmentService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllDepartments = async (userId) => {

  try{
    let user = await prisma.user.findUnique({
      where: {id: userId.id}
    });
    if(user.is_staff){
      return await prisma.department.findMany();      
    }
    
    let employee = await prisma.employee.findUnique({
      where: {id: userId.id},
      select:{
        entity: true,
        Departement: true,
      }
    })
  }catch(error){
    console.log(error.message);
    return error;
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