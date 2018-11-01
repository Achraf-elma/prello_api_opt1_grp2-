const express = require("express");
const router = express.Router();


router.use("/cards", require("./card"));

module.exports=router;

