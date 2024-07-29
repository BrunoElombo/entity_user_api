require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const entitiesRoutes = require("./routes/entities");
const externalEntitiesRoutes = require("./routes/externalEntity");
const sitesRoutes = require("./routes/site");
const productRoutes = require("./routes/product");
const bankRoutes = require("./routes/bank");
const departmentRoutes = require("./routes/department");
const cashDeskRoutes = require("./routes/cashDesk");
const currencyRoutes = require("./routes/currency");
const fileRoutes = require("./routes/file"); 
const operatorRoutes = require("./routes/operator");
const accountRoutes = require("./routes/account");
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {swaggerOptions} = require('./config/swagger');



const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'public')));

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
app.use("/account", accountRoutes);
app.use("/operators", operatorRoutes);
app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);
app.use("/entities",entitiesRoutes);
app.use("/external_entities",externalEntitiesRoutes);
app.use("/sites",sitesRoutes);
app.use("/products", productRoutes);
app.use("/banks", bankRoutes);
app.use("/departments", departmentRoutes);
app.use("/cash-desk", cashDeskRoutes);
app.use("/currencies", currencyRoutes);
app.use("/file", fileRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on http://localhost:${process.env.PORT || 5000}`)
})
// app.listen(process.env.PORT, process.env.ADDRESS, ()=>{
//     console.log(`Server listening on http://${process.env.ADDRESS}:${process.env.PORT}`)
// })
