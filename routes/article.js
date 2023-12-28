const connection = require("../connection");
const express=require('express');
const router=express.Router();
const auth=require('../services/authentication')
router.post('/addNewArticle',auth.authenticateToken,(req,res)=>{
    let article=req.body;
    query="insert into article(title,content,publication_date,categoryId,status) values(?,?,?,?,?)";
    connection.query(query,[article.title,article.content,new Date(),article.categoryId,article.status],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows!=0)
            {
                return res.status(200).json({message:"Article added successfully"})

            }
            else{
                return res.status(400).json({message:"id not available"})
            }


        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.get('/getAllArticle',auth.authenticateToken,(req,res)=>{
    query="select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId,c.name as categoryName from article as a inner join category as c where a.categoryId=c.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);

        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getAllPublishedArticle',(req,res)=>{
    query="select a.id,a.title,a.content,a.status,a.publication_date,c.id as categoryId,c.name as categoryName from article as a inner join category as c where a.categoryId=c.id and a.status='published'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);

        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.post('/updateArticle',auth.authenticateToken,(req,res)=>{
    let article=req.body;
    query="update article set title=?,content=?,categoryId=?,publication_date=?,status=? where id=?";
    connection.query(query,[article.title,article.content,article.categoryId,new Date(),article.status,article.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0)
            {
                return res.status(404).json({message:"No such article id exist"});
            }
            else{
                return res.status(200).json({message:"article updated successsfully"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.get('/deleteArticle/:id',auth.authenticateToken,(req,res)=>{
    const id=req.params.id;
    query="delete from article where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0)
            {
                return res.status(404).json({message:"No such article id exist"});
            }
            else{
                return res.status(200).json({message:"article deleted successsfully"});
            }

        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports=router;