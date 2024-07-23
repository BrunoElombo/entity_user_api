require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {logger} = require('./middlewares/logEvents');
const { errorHandler } = require('./middlewares/errorHandlers');
const { notFoundeHandler } = require('./middlewares/notFoundHandler');

// Routes files
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const refreshRoutes = require('./routes/refreshRoutes');
const employeeRoutes = require("./routes/employee");
const employeeRoleRoutes = require('./routes/employeeRoleRoutes');
const roleRoutes = require('./routes/roleRoutes');
const functionRoutes = require('./routes/functionRoutes');
const echelonCategoryRoutes = require('./routes/echelonCategoryRoutes');
const entitiesRoutes = require("./routes/entityRoutes");
const entityRoutes = require('./routes/entityRoutes');
const associateRoutes = require('./routes/associateRoutes');
const externalEntityRoutes = require('./routes/externalEntityRoutes');
const typeEntityRoutes = require('./routes/typeEntityRoutes');
const typeRoutes = require('./routes/typeRoutes');
const operatorRoutes = require('./routes/operatorRoutes');
const productRoutes = require('./routes/productRoutes'); 
const sitesRoutes = require("./routes/siteRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const accountRoutes = require('./routes/accountRoutes');
const bankRoutes = require("./routes/bankRoutes");
const cashDeskRoutes = require('./routes/cashDeskRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const currencyCutsRoutes = require('./routes/currencyCutsRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const externalEntitiesRoutes = require("./routes/externalEntityRoutes");
const fileRoutes = require("./routes/file"); 
const path = require('path');

const app = express();

/**
 * CORS Settings
 */

// Updates
// const whiteList = [];
// const corsOptions = {
//     origin: (origin, callback)=>{
//         if(whiteList.indexOf(origin) !== -1){
//             callback(null, true);
//         }
//         callback(new Error("Blocked by CORS"));
//     },
//     optionsSuccessStatus: 200
// };

const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * Logs middlewares
 */
app.use(logger);

/**
 * Handling errors
 */
app.use(errorHandler);

/**
 * File upload directory
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res)=>{
    res.send("Entity API");
});

app.use("/api/login", authRoutes);
app.use("/api/refresh", refreshRoutes);
app.use('/api/banks', bankRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/functions', functionRoutes);
app.use('/api/associates', associateRoutes);
app.use('/api/echelon-categories', echelonCategoryRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/external-entities', externalEntityRoutes);
app.use('/api/type-entities', typeEntityRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/employee-roles', employeeRoleRoutes);
app.use('/api/accounts', accountRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/entities",entitiesRoutes);
app.use("/api/external_entities",externalEntitiesRoutes);
app.use("/api/sites",sitesRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/currencies", currencyRoutes);
app.use('/api/currency-cuts', currencyCutsRoutes);
app.use("/api/cash-desk", cashDeskRoutes);
app.use("/api/file", fileRoutes);
// app.all('*', notFoundeHandler);



app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
});
