const express = require("express");
const fileRoutes = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const {uploadFile, toExcel, download, upload} = require("../controllers/fileController");

fileRoutes.post("/export-to-excel", toExcel);
fileRoutes.post("/upload", upload.array('files'), upload.fields([{ name: 'files', maxCount: 1 }]), uploadFile);
fileRoutes.get("/download/:filename", download);

module.exports = fileRoutes;