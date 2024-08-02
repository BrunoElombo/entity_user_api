// services/gradeService.js
const prisma = require('../prisma/client');

exports.createGrade = async (gradeData) => {
  const { name, displayName, power } = gradeData;
  return prisma.grade.create({
    data: {
      name,
      displayName,
      power: power || 0,
    },
  });
};

exports.getAllGrades = async () => {
  return prisma.grade.findMany({
    where: { isActive: true },
  });
};

exports.getGradeById = async (id) => {
  const grade = await prisma.grade.findUnique({ where: { id } });
  if (!grade) {
    throw new Error('Grade not found');
  }
  return grade;
};

exports.updateGrade = async (id, gradeData) => {
  const { name, displayName, power } = gradeData;
  return prisma.grade.update({
    where: { id },
    data: {
      name,
      displayName,
      power,
    },
  });
};

exports.deleteGrade = async (id) => {
  const grade = await prisma.grade.findUnique({ where: { id } });
  if (!grade) {
    throw new Error('Grade not found');
  }
  await prisma.grade.delete({ where: { id } });
};