const express=require('express');
const connection=require('../connection');
const router=express.Router();
require('dotenv').config();
const jwt=require('jsonwebtoken');
var auth=require('../services/authentication')



router.post('/addNewAppUser',auth.authenticateToken,(req,res)=>{
    let user=req.body;
    let query="select email,password,status from appuser where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err)
        {
            if(results.length<=0)
            {
                let query="insert into appuser(name,email,password,status,isDeletable) values(?,?,?,'false','true')";
                connection.query(query,[user.name,user.email,user.password],(err,results)=>{
                    if(!err)
                    {
                        return res.status(200).json({message:"Registered successfully"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })

            }
            else{
                return res.status(400).json({message:"Already exist"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })

})



router.post('/login',(req,res)=>{
    let user=req.body;
    query="select email,password,status,isDeletable from appuser where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0||results[0].password!=user.password){
                return res.status(400).json({message:"Invalid username or password"});
            }
            else if(results[0].status==='false'){
                return res.status(400).json({message:"Wait for admin approval"});
            }
            else if(results[0].password==user.password){
                const response={email:results[0].email,isDeletable:results[0].isDeletable}
                const accesstoken=jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn:'8h'});
                res.status(200).json({token:accesstoken});



            }
            else{
                return res.status(400).json({message:"Something went wrong, pls try again later"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })

})

router.get('/getAllAppUsers',auth.authenticateToken,(req,res)=>{
    const tokenpayload=res.locals;
    var query;
    if(tokenpayload.isDeletable==='false'){
        query="select id,name,email,status from appuser where isDeletable='true'";
    }
    else{
        query="select id,name,email,status from appuser where isDeletable='true' and email!=?";
    }

    connection.query(query,[tokenpayload.email],(err,results)=>{
        if(!err){
            return res.status(200).json(results);

        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.post('/updateUserStatus',auth.authenticateToken, (req,res) =>{
    let user = req.body;
    var query="update appuser set status=? where id=? and isDeletable='true'";
    connection.query(query, [user.status,user.id], (err,results) =>{
         if(!err){
              if(results.affectedRows == 0){
              return res.status(484).json({message:"Appuser ID does not exist"});
              }
              return res.status (200).json ({message: "Appuser Updated Successfully"});
         }
         else{
         return res.status (500).json(err);
         }
    })
 })

 router.post('/updateUser',auth.authenticateToken, (req,res)=>{
    let user = req.body;
    var query="update appuser set name=?,email=?where id=?";
    connection.query(query, [user.name,user.email,user.id], (err,results) =>{
         if(!err){
              if(results.affectedRows == 0){
              return res.status(484).json({message:"user ID does not exist"});
              }
              return res.status (200).json ({message: "user Updated Successfully"});
         }
         else{
         return res.status (500).json(err);
         }
    })

    
 })


 router.get('/checkToken',auth.authenticateToken, (req,res)=>{
    return res.status(200).json({message:"true"});
 })

module.exports=router;