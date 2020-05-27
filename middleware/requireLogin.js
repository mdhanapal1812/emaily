module.exports = (req,res,next)=>{
    if(!req.user){
        return res.send(401).send({error:'You must login'})
    }
    //There are many middlewares , now if the user is logged in , then he can go to next middleware.
    next();
};