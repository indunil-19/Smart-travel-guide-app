const express=require('express');
const AdminController = require('../controller/adminController');
const router=express.Router();
const RootController=require("../controller/rootController")
const UserController=require("../controller/userController")
const ifNotLoggedIn=require("../middleware/ifNotLoggedIn")
const ifTraveller=require("../middleware/ifTraveller")


// router.get('/test' , UserController.getTouristAttractions)


router.get('/', RootController.indexPage)
router.get('/logout', RootController.logout)

router.post('/signup',RootController.signup)
router.post('/signin',RootController.login)
router.post('/updateUser',UserController.updateUser)




router.get('/user/getTravelPlans',ifNotLoggedIn, ifTraveller, UserController.getTravelPlans)
router.get('/user/getPublicTravelPlans',ifNotLoggedIn, ifTraveller, UserController.getPublicPlans)
router.post('/user/getReview',ifNotLoggedIn,ifTraveller, UserController.getReviews)
router.post('/user/updateTravelPlan',ifNotLoggedIn, ifTraveller, UserController.updateTravelPlan)
router.post('/user/sharePlan',ifNotLoggedIn,ifTraveller, UserController.shareTravelPlan)
router.delete('/user/deleteTravelPlan',ifNotLoggedIn, ifTraveller, UserController.deleteTravelPlan)
router.post('/user/addReview',ifNotLoggedIn, ifTraveller, UserController.addReview)
router.post('/user/saveTravelPlan',ifNotLoggedIn, ifTraveller, UserController.saveTravelPlan)





router.get('/addAdmin', RootController.addAdmin)
router.get('/admin/viewAdmins',AdminController.viewAdmins)
router.get('/admin/viewAdmin/:pid',AdminController.viewAdmin)
router.get('/admin/viewUsers',AdminController.viewUser)
router.get('/admin/viewTravelplan',AdminController.Travelplan)
router.get('/admin/getProvinceData/:pid', AdminController.getProvinceData)
router.get('/admin/getPublicPlans', AdminController.getPublicPlans)


router.post('/admin/addImgtoProvinceData', AdminController.addImgtoProvinceData)
router.post('/admin/signup',AdminController.signup)
router.post('/admin/signin',AdminController.login)
router.post('/admin/deleteProvinceImage', AdminController.deleteProvinceImage)
router.post('/admin/descriptionUpdate', AdminController.descriptionUpdate)
router.post('/admin/getsharedPlans', AdminController.getSharedPlans)
router.delete('/admin/deleteTravelPlan', AdminController.deleteTravelPlan)
router.post('/admin/setPublicPlan', AdminController.setPublicPlan)
router.post('/admin/removePublic', AdminController.removePublicPlan)





module.exports=router