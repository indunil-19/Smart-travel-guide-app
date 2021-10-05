const express=require('express');
const AdminController = require('../controller/adminController');
const router=express.Router();
const RootController=require("../controller/rootController")
const UserController=require("../controller/userController")


router.get('/addAdmin', RootController.addAdmin)
router.get('/test' , UserController.getTouristAttractions)

router.get('/', RootController.indexPage)
router.get('/logout', RootController.logout)


router.get('/user/getTravelPlans',UserController.getTravelPlans)
router.post('/user/getReview',UserController.getReviews)
router.post('/user/updateTravelPlan', UserController.updateTravelPlan)
router.post('/user/sharePlan', UserController.shareTravelPlan)
router.delete('/user/deleteTravelPlan', UserController.deleteTravelPlan)
router.post('/user/addReview', UserController.addReview)



router.post('/signup',RootController.signup)
router.post('/signin',RootController.login)
router.post('/updateUser',UserController.updateUser)



router.post('/user/saveTravelPlan',UserController.saveTravelPlan)


router.get('/admin/viewAdmins',AdminController.viewAdmins)
router.get('/admin/viewAdmin/:pid',AdminController.viewAdmin)
router.get('/admin/viewUsers',AdminController.viewUser)
router.get('/admin/viewTravelplan',AdminController.Travelplan)
router.get('/admin/getProvinceData/:pid', AdminController.getProvinceData)

router.post('/admin/addImgtoProvinceData', AdminController.addImgtoProvinceData)
router.post('/admin/signup',AdminController.signup)
router.post('/admin/signin',AdminController.login)
router.post('/admin/deleteProvinceImage', AdminController.deleteProvinceImage)
router.post('/admin/descriptionUpdate', AdminController.descriptionUpdate)




module.exports=router