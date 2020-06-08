const express=require("express")
const router=express.Router()
const {check, validationResult}=require("express-validator")
const auth=require("../../middleware/auth")
const config=require("config")
const Profile=require("../../models/Profile")
const User=require("../../models/User")
const Post=require("../../models/Post")

router.post("/",[auth,[
    check("text","text is required").not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
    
    try {
        const user = await User.findById(req.user.id).select("-password")
        const newPost=new Post({
        text:req.body.text,
        name:user.name,
        avatar: user.avatar,
        user:req.user.id
    })
    
    const post=await newPost.save()
    res.json(post)    
    } catch (error) {
        console.log(error.message)
        res.status(500).json("server error")
    }
    
})

router.get("/",auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1})
        res.json(posts)    
    } catch (error) {
        console.log(error.message)
        res.status(500).json("server error")
    }
})

router.get("/:id",auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        
        if(!posts) return res.status(400).json({msg:"Post not found"})
        
        res.json(posts)    
    } catch (error) {
        console.log(error.message)
        if(error.name==="CastError") return res.status(400).json({msg:"Post not found"})
        res.status(500).json("server error")
    }
})

router.delete("/:id",auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        
        if(!posts) return res.status(400).json({msg:"Post not found"})
        
        if(posts.user.toString() !==req.user.id) return res.status(400).json({msg:"User not Authorized"})

        await posts.remove()
        res.json({msg:"Post Removed"})    
    } catch (error) {
        console.log(error.message)
        if(error.name==="CastError") return res.status(400).json({msg:"Post not found"})
        res.status(500).json("server error")
    }
})

router.put("/like/:id",auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        
        if(posts.likes.filter(like=>like.user.toString()==req.user.id).length>0)
            return res.status(400).json({msg:"Post already Liked"})

        posts.likes.unshift({user:req.user.id})
        await posts.save()
        res.json(posts.likes)    
    } catch (error) {
        console.log(error.message)
        if(error.name==="CastError") return res.status(400).json({msg:"Post not found"})
        res.status(500).json("server error")
    }
})

router.put("/unlike/:id",auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        
        if(posts.likes.filter(like=>like.user.toString()==req.user.id).length==0)
            return res.status(400).json({msg:"Post not Liked"})

        const removeIndex=posts.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        posts.likes.splice(removeIndex,1)
        await posts.save()
        res.json(posts.likes)    
    } catch (error) {
        console.log(error.message)
        if(error.name==="CastError") return res.status(400).json({msg:"Post not found"})
        res.status(500).json("server error")
    }
})

router.post("/comment/:id",[auth,[
    check("text","text is required").not().isEmpty()
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
    
    try {
        const user = await User.findById(req.user.id).select("-password")
        const posts=await Post.findById(req.params.id)

        const newPost={
        text:req.body.text,
        name:user.name,
        avatar: user.avatar,
        user:req.user.id
    }
    posts.comments.unshift(newPost)
    await posts.save()
    res.json(posts.comments)    
    } catch (error) {
        console.log(error.message)
        res.status(500).json("server error")
    }
    
})

router.delete("/comment/:id/:comment_id",auth,async(req,res)=>{
    try {
        const posts = await Post.findById(req.params.id)
        
        const comment=posts.comments.find(comment=>comment.id===req.params.comment_id)

        if(!comment) return res.status(400).json({msg:"comment does not found"})
        
        if(comment.user.toString() !==req.user.id) return res.status(400).json({msg:"User not Authorized"})

        const removeIndex=posts.comments.map(comments=>comments.user.toString()).indexOf(req.user.id)
        posts.comments.splice(removeIndex,1)
        await posts.save()
        res.json(posts.comments)    
    } catch (error) {
        console.log(error.message)
        if(error.name==="CastError") return res.status(400).json({msg:"Post not found"})
        res.status(500).json("server error")
    }
})

module.exports=router