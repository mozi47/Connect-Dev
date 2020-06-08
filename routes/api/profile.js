const express=require("express")
const router=express.Router()
const auth = require("../../middleware/auth")
const Profile=require("../../models/Profile")
const Post=require("../../models/Post")
const User=require("../../models/User")
const {check, validationResult}=require("express-validator")
const request=require("request")
const config=require("config")

router.get("/me",auth, async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id}).populate("user",["name","avatar"])
        if(!profile){
            return res.status(400).json({msg:"There is no profile for this user name"})
        }
        res.json(profile)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("server error")
    }
})

router.post("/",
[
    auth,
    [
        check("status",'status is required').not().isEmpty(),
        check("skills","Skills is required").not().isEmpty()
    ]
],
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            instagram,
            linkedin,
            twitter,
            youtube,
            facebook
        }=req.body

        const profileField={}
        profileField.user=req.user.id
        if(company) profileField.company = company
        if(website) profileField.website = website
        if(location) profileField.location = location
        if(bio) profileField.bio= bio
        if(status) profileField.status = status
        if(githubusername) profileField.githubusername = githubusername
        if(skills) {
            profileField.skills = skills.split(",").map(skill=>skill.trim())
        }

        profileField.social={}
        if(youtube) profileField.social.youtube =youtube
        if(twitter) profileField.social.twitter =twitter
        if(facebook) profileField.social.facebook =facebook
        if(linkedin) profileField.social.linkedin =linkedin
        if(instagram) profileField.social.instagram =instagram
        
        try {
            let profile=await Profile.findOne({user:req.user.id})
            if(profile){
                profile =await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileField},
                    {new:true})
                return res.json(profile)
            }

            profile =new Profile(profileField)
            await profile.save()
            res.json(profile)
            console.log(githubusername)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("server error")
        }
    
})

router.get("/",async(req,res)=>{
    try {
        const profiles = await Profile.find().populate("user",["name","avatar"])
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")
    }
})

router.get("/user/:user_id",async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate("user",["name","avatar"])
        if(!profile) return res.status(400).json({msg:"Profile not found"})
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(error.name=="CastError"){ 
            return res.status(400).json({msg:"Profile not found"})
        }
        res.status(500).send("server Error")
    }
})

router.delete("/",auth,async(req,res)=>{
    try {
        await Post.deleteMany({user:req.user.id})
        await Profile.findOneAndRemove({user:req.user.id})
        await User.findOneAndRemove({_id:req.user.id})
        res.json({msg:"User Deleted"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")
    }
})

router.put("/experience",[auth,[
   check("title","title is required").not().isEmpty(),
   check("company","company is required").not().isEmpty(),
   check("from","from date is required").not().isEmpty(), 
]],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})
    
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body

    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id})
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")
    }
})

router.delete("/experience/:exp_id",auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id})        
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex,1)
        await profile.save()
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")   
    }
})

router.put("/education",[auth,[
    check("school","school is required").not().isEmpty(),
    check("degree","degree is required").not().isEmpty(),
    check("fieldofstudy","fieldofstudy is required").not().isEmpty(),
    check("from","from date is required").not().isEmpty(), 
 ]],async(req,res)=>{
     const error=validationResult(req)
     if(!error.isEmpty()) return res.status(400).json({error:error.array()})
     
     const {
        school,
        degree,
        fieldofstudy,
         from,
         to,
         current,
         description
     }=req.body
 
     const newEdu={
         school,
         degree,
         fieldofstudy,
         from,
         to,
         current,
         description
     }
  
     try {
         const profile = await Profile.findOne({user:req.user.id})
         profile.education.unshift(newEdu)
         await profile.save()
         res.json(profile)
     } catch (error) {
         console.error(error.message)
         res.status(500).send("server Error")
     }
 })
 
 router.delete("/education/:edu_id",auth,async(req,res)=>{
     try {
         const profile = await Profile.findOne({user:req.user.id})        
         const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id)
         profile.education.splice(removeIndex,1)
         await profile.save()
         res.json(profile)
     } catch (error) {
         console.error(error.message)
         res.status(500).send("server Error")   
     }
 })

 router.get("/github/:username",(req,res)=>{
    try {
        const option={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("GITHUB_CLIENT_ID")}&client_secret=${config.get("GITHUB_CLIENT_SECRET")}`,
            method:"GET",
            headers:{"user-agent":"node.js"}
        }

        request(option,(error,response,body)=>{
            if(error) console.error(error)

            if(response.statusCode!==200){
                return res.status(404).json({msg:"No Github Profile found"})
            }
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server Error")   
    }
})

module.exports=router