const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

// const departmentController = require('../controllers/departmentController');

// router.get('/', departmentController.getAllDepartments);
// router.get('/:id', departmentController.getDepartmentById);
// router.post('/', departmentController.createDepartment);
// router.put('/:id', departmentController.updateDepartment);
// router.delete('/:id', departmentController.deleteDepartment);


router.post("/", (req, res) => {
  const body = req.body;
  const response = prisma.department.create(body);
  res.send(response);
})

router.get('/', async (req, res) => {
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;

  const employee = await prisma.employee.findUnique({
      where:{id_user: userId},
      include: {
        Function: true,
        role: true,
      }
  });
  try {
    const departments = await prisma.department.findMany({
      where:{id_entity: employee.id_entity}
    });
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

router.get('/all', async (req, res) => {
    try {
      const departments = await prisma.department.findMany({});
      res.json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching departments' });
    }
});

router.get('/:id', async (req, res) => {
const { id } = req.params;
try {
    const department = await prisma.department.findUnique({
      where: { id: id }
    })
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching department' });
}
});

  

  module.exports = router;
  