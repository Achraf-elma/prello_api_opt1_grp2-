const express = require("express");
const router = express.Router();


router.use("/cards", require("./card"));
router.use("/lists", require("./list"));

module.exports=router;

