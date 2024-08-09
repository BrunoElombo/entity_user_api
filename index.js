require("dotenv").config();
const fs = require('fs');
const path = require('path');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const employeeRoleRoutes = require('./routes/employeeRoleRoutes');
const externalEntityRoutes = require('./routes/externalEntityRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const roleRoutes = require('./routes/roleRoutes');
const functionRoutes = require('./routes/functionRoutes');
const associateRoutes = require('./routes/associateRoutes');
const echelonCategoryRoutes = require('./routes/echelonCategoryRoutes');  
const gradeRoutes = require('./routes/gradeRoutes');
const entityRoutes = require('./routes/entityRoutes');
const typeEntityRoutes = require('./routes/typeEntityRoutes');
const typeRoutes = require('./routes/typeRoutes');
const currencyCutsRoutes = require('./routes/currencyCutsRoutes');
const employeeRoutes = require("./routes/employeeRoutes");
const entitiesRoutes = require("./routes/entityRoutes");
// const externalEntitiesRoutes = require("./routes/externalEntityRoutes");
const sitesRoutes = require("./routes/siteRoutes");
const productRoutes = require("./routes/productRoutes");
const bankRoutes = require("./routes/bankRoutes");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const cashDeskRoutes = require("./routes/cashDeskRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const fileRoutes = require("./routes/file"); 
const operatorRoutes = require("./routes/operatorRoutes");
const accountRoutes = require("./routes/accountRoutes");
const swaggerJsdoc = require('swagger-jsdoc');
const {logger} = require('./middlewares/logEvents');
const swaggerUi = require('swagger-ui-express');
const {swaggerOptions} = require('./config/swagger');



const app = express();

/**
 * Logs middlewares
 */
app.use(logger);

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
};

  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const corsOptions = {
    origin: "*"
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    // res.send("Entity API");
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use("/api", authRoutes);
// app.use("/api/account", accountRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/entities",entityRoutes);
app.use("/api/external-entities",externalEntityRoutes);
app.use("/api/sites",sitesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/bank-account", bankAccountRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/cash-desk", cashDeskRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/file", fileRoutes);
app.use("/api", authRoutes);
app.use("/api/refresh", refreshRoutes);
// app.use('/api/banks', bankRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/employees", employeeRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/functions', functionRoutes);
app.use('/api/associates', associateRoutes);
app.use('/api/echelon-categories', echelonCategoryRoutes);
app.use('/api/grades', gradeRoutes);
// app.use('/api/entities', entityRoutes);
app.use('/api/external-entities', externalEntityRoutes);
app.use('/api/type-entities', typeEntityRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/employee-roles', employeeRoleRoutes);
app.use('/api/accounts', accountRoutes);
// app.use("/api/operators", operatorRoutes);
app.use("/api/entities",entitiesRoutes);
// app.use("/api/external_entities",employeeRoleRoutes);
// app.use("/api/sites",sitesRoutes);
// app.use("/api/departments", departmentRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/currencies", currencyRoutes);
app.use('/api/currency-cuts', currencyCutsRoutes);
// app.use("/api/cash-desk", cashDeskRoutes);
app.use("/api/file", fileRoutes);
// app.all('*', notFoundeHandler);

app.listen(process.env.PORT, process.env.ADDRESS, ()=>{
    console.log(`Server listening on http://${process.env.ADDRESS}`)
});

// Start HTTPS server
// https.createServer(options, app).listen(process.env.PORT, process.env.ADDRESS, () => {
//     console.log(`HTTPS server running on https://${process.env.ADDRESS}:${process.env.PORT}`);
//   });