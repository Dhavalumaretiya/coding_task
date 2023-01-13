const express = require("express");
const router = express.Router();

const user = require("../controller/userController");
//====================================================================== 
//User API
router.post('/createUser', user.createUser);
router.get('/getUser',user.getUser);
router.get('/getUserById', user.getUserById);
router.get('/getAllUser', user.getAllUser);
router.delete('/deleteUser', user.deleteUser);
//======================================================================
module.exports = router;