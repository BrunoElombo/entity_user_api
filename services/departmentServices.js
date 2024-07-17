// services/departmentService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt =require('jsonwebtoken');

exports.getAllDepartments = async () => {
  const { authorization } = req.header
  const userId = jwt.decode(authorization.split(' ')[1]);
  try{
    let user = await prisma.user.findUnique({
      where: {id: userId}
    });
    if(user.is_staff){
      return await prisma.department.findMany();      
    }
    
    let employee = await prisma.employee.findUnique({
      where: {id: userId},
      select:{
        entity: true,
        department: true,
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
      User: true,
      Entity: true,
      employee: true,
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