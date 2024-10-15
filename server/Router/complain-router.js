const express = require("express");
const router = express.Router();
const complainController = require("../controllers/complain-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/complain").post(complainController.Complains);


// this is the logic part of the admin getting all complain lists

router.route("/viewcomplain").get(authMiddleware, adminMiddleware,complainController.AllComplains);

module.exports = router;