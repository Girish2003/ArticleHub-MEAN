const connection = require("../connection");
const express=require('express');
const router=express.Router();
var auth=require('../services/authentication');


router.post('/addNewCategory',auth.authenticateToken,(req,res)=>{
    const category=req.body;
    query="insert into category(name) values(?)";
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Category added successfully"});

        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getCategory',auth.authenticateToken,(req,res)=>{
    query="select * from category order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);

        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.post('/updateCategory',auth.authenticateToken,(req,res)=>{
    let category=req.body;
    query="update category set name=? where id=?";
    connection.query(query,[category.name,category.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0)
            {
                return res.status(404).json({message:"No such id exist"});
            }
            else{
                return res.status(200).json({message:"updated successsfully"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports=router;