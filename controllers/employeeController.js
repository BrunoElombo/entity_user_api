const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const employeeService = require('../services/employeeService');
const jwt = require('jsonwebtoken');

exports.getEmployeeHierarchy = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id
    const currentUser = await prisma.employee.findUnique({
      where:{
        id_user: userId, is_active: true
      },
      include: { role: true, Function: true },
    });

    const entityHierarchy = await prisma.employee.findMany({
      where:{
        AND:[
          { id_entity: currentUser.id_entity },
          {
            role: {
              power: { lte: currentUser.role ? currentUser.role.power : 0 },
            },
          }
        ]
      },
      select:{
        User:{
          select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            profile_picture: true,
            gender: true,
            niu: true,
            is_admin: true,
            is_staff: true
          }
        },
        role:true,
        Function: true
      }
    });

    const departementHierarchy = await prisma.employee.findMany({
      where:{
        AND:[
          { id_department: currentUser.id_department },
          {
            Function: { 
              power: {lte: currentUser.Function ? currentUser.Function.power : 0}
             }
          }
        ]
      },
      include:{
        User:{
          select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            profile_picture: true,
            gender: true,
            niu: true,
            is_admin: true,
            is_staff: true
          }
        },
        role:true,
        Function:true
      }
    });

    res.json({"entity_hierarchy": (entityHierarchy), "department_hierarchy":(departementHierarchy)});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};

exports.getEmployeeMandatory = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userId = decodedToken.id;
    
    const currentUser = await prisma.employee.findUnique({
      where:{
        id_user: userId, is_active: true
      }
    });

    const role = await prisma.role.findFirst({
      where:{name: 'bank_mandate', isActive: true}
    });

    const employee = await prisma.employee.findMany({
      where:{id_entity: currentUser.id_entity, id_role: role.id},
      select:{
        User:{
          select:{
            id: true,
            name: true,
            displayName: true
          }
        }
      }
    });

    return res.send(employee);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

};
  
exports.getEmployeeColleagues = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(employeeId) },
      include: { colleagues: true },
    });
    return res.status(200).json(employee.colleagues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
  
exports.getEmployeeEntities = async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;
  
  const entity_id = req.params.entity_id;
  
  if(entity_id){
    try {
      const employeeInEntity = await prisma.employee.findUnique({
        where:{
          id_user: userId
        },
        select:{
          User:{
            include:{
              employee:true
            }
          },
          entity:true,
          Function:true,
          role:{
            where:{
              OR: [
                {name: 'president'}, 
                {name: 'accountant'}, 
                {name:"general_manager"}, 
                {name:"chief_financial_officer"}, 
                {name:"budgetary_department_manager"}, 
                {name:"paymaster_general"},
                {name:"cordinator"},
                {name:"cashier"},
                {name:"management_controller"},
                {name:"bank_mandate"},
              ]
            },
            include:{
              employee:{
                include:{
                  User:{
                    select:{
                      id: true,
                      name: true,
                      email: true,
                      phone: true,
                      profile_picture: true,
                      gender: true,
                      niu: true,
                      is_admin: true,
                      is_staff: true
                    }
                  },
                }
              },
            }
          },
          Departement:{
            include:{
              User:{
                select:{
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                  profile_picture: true,
                  gender: true,
                  niu: true,
                  is_admin: true,
                  is_staff: true
                }
              },
            }
          }
        }
      });

      res.status(200).send(employeeInEntity);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
  
}

exports.getEmployeeControllers = async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;

  try {
    const employee = await prisma.employee.findUnique({
      where:{id_user: userId}
    });

    const employees = await prisma.employee.findMany({
      where:{
        id_entity: employee.id_entity,
        Function:{
          is:{
            name: "coordinator"
          },
        }
      },
      select:{
        User:{
          select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            profile_picture: true,
            gender: true,
            niu: true,
            is_admin: true,
            is_staff: true
          }
        },
      }
    });

    return res.status(200).send(employees);
  } catch (error) {
    return res.status(404).json({error :error.message});
  }
}
  
exports.getEmployeeBanks = async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id;

  const id = req.params.id;
  const employeeWithUserId = await prisma.employee.findUnique({
    where:{
      id_user: id,
    }
  })

  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { id_employee: employeeWithUserId.id },
    });

    const bankMap = new Map();

    for (const bankAccount of bankAccounts) {
      const bankId = bankAccount.id_bank;

      // Check if bankId already exists in the map
      if (!bankMap.has(bankId)) {
        const bank = await prisma.bank.findUnique({
          where: { id: bankId },
        });

        bankMap.set(bankId, {
          bank: bank,
          bankAccounts: [],
        });
      }

      // Add bank account to corresponding bank
      bankMap.get(bankId).bankAccounts.push(bankAccount);
    }

    // Convert map values to an array and send the response
    const result = Array.from(bankMap.values());
    return res.send(result);
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({error: error.message});
  }
}

exports.getEmployeeByEntity = async (req, res)=>{
  const decodedToken = jwt.decode(req.headers.authorization.split(' ')[1]);
  const userId = decodedToken.id
  try {
    const employee = await prisma.employee.findUnique({
      where:{id_user: userId}
    });

    const employees = await prisma.employee.findMany({
      where:{
        id_entity: employee.entity
      },
      include:{
        User:{
          select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            displayName: true,
            profile_picture: true,
            gender: true,
            niu: true,
            is_admin: true,
            is_staff: true
          }
        },
        role: true,
        Function: true,
        Departement: true
      }
    });

    return res.status(200).send(employees);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message);
  }
}


exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.employee.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateEmployeeProfile = async (req, res) => {
  let { id } = req.params
  try {
    const employee = await employeeService.updateEmployee(id, req.body);
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.employee.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};