const router =require("express").Router();
const bcrypt=require("bcrypt");
const User =require("../models/usermodel")



router.get('/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.query.userId);
    const users = await User.find();
    const userList = users.map(user => {
      return {
        ...user._doc,
        isFollowing: currentUser.followings.includes(user._id)
      };
    });
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json(err);
  }
});


//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });


//delete user
router.delete("/delete/:id", async (req, res) => {
    
      
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
   });

//get user
router.get("/", async (req, res) => {
  const userId=req.query.userId
  const username=req.query.username
    try {
      const user =userId ? await User.findById(userId):await User.findOne({username:username});
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId!=req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentuser=await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentuser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("followed")
            }
            else{
                res.status(403).json("you already follow this user")
            }
        }
        catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("you cannot follow yourself")
    }
})

//unfollow user
router.put("/:id/unfollow",async (req,res)=>{
  if(req.body.userId!=req.params.id){
      try{
          const user=await User.findById(req.params.id)
          const currentuser=await User.findById(req.body.userId)
          if(user.followers.includes(req.body.userId)){
              await user.updateOne({$pull:{followers:req.body.userId}})
              await currentuser.updateOne({$pull:{followings:req.params.id}})
              res.status(200).json("unfollowed")
          }
          else{
              res.status(403).json("you already unfollow this user")
          }
      }
      catch(err){
          res.status(500).json(err);
      }

  }else{
      res.status(403).json("you cannot unfollow yourself")
  }
})

//get user followers
router.get("/friends/:userId",async(req,res)=>{
  try {
    const user=await User.findById(req.params.userId)
    const friends=await Promise.all(
      user.followings.map(followerId=>{
        return User.findById(followerId)
      })
    )
    let friendlist=[]
    friends.map(friend=>{
      const {_id,username,profilePicture}=friend;
      friendlist.push({_id,username,profilePicture})
    })
    res.status(200).json(friendlist)
  } catch (error) {
    res.status(500).json(error)
  }
})

//search user
router.get("/search/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router