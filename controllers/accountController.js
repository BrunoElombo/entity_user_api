const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

exports.getAllAccounts=(req, res)=>{

}


exports.getAccountByType= async (req, res)=>{
    let  { type } = req.query;
    let 
}

exports.getAccountById=(req, res)=>{

}