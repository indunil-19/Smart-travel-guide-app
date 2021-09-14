const express=require('express');
const AdminController = require('../controller/adminController');
const router=express.Router();
const RootController=require("../controller/rootController")
const UserController=require("../controller/userController")


router.get('/addAdmin', RootController.addAdmin)

router.get('/', RootController.indexPage)
router.get('/logout', RootController.logout)


router.post('/signup',RootController.signup)
router.post('/signin',RootController.login)
router.post('/updateUser',UserController.updateUser)



router.get('/admin/viewAdmins',AdminController.viewAdmins)
router.get('/admin/getProvinceData/:pid', AdminController.getProvinceData)


router.post('/admin/addImgtoProvinceData', AdminController.addImgtoProvinceData)
router.post('/admin/signup',AdminController.signup)
router.post('/admin/signin',AdminController.login)



module.exports=router