const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users = require("../model/usersSchema");
const moment = require("moment")

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{ // Images store here in this file
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`) // This file name is stored in db
    }
})

// for checking only img allowed
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("Only images are allowed"));
    }
  }
  
  const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
  });
  
  // user blog
  router.post("/blog", upload.single("photo"), async (req, res) => {
    try {
      const { filename } = req.file;
      const { fname } = req.body;
      const { userId } = req.body;
      const { title } = req.body;
      const { description } = req.body;
  
      if (!fname || !filename) {
        return res.status(401).json({ status: 401, message: "Fill all the data" });
      }
  
      const date = moment(new Date()).format("YYYY-MM-DD");
      const userdata = new users({
        fname: fname,
        title: title,
        description: description,
        imgpath: filename,
        date: date,
        userId: userId
      });
  
      const finaldata = await userdata.save();
      res.status(201).json({ status: 201, finaldata });
    } catch (error) {
      res.status(401).json({ status: 401, error: error.message });
    }
  });

// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// Get details of a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await users.findById(id);

    if (!blog) {
      return res.status(404).json({ status: 404, message: "Blog not found" });
    }

    res.status(200).json({ status: 200, blog });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});


// delete user data
router.delete("/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await users.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }

})




module.exports = router;
