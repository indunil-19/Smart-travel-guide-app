const ifNotLoggedIn=(req,res,next)=>{
    if(req.session.user){
        next()
    }
    else{
        return res.status(422).json({error:"you are not logged in, please log in first"})
    }
}
module.exports=ifNotLoggedIn;