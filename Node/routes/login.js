const express = require('express');
const {User} = require('../models');


const router = express.Router();




router.route('/')
.post(
    async (req, res, next) => {
        try {
          console.log("받아온 바디 정보 : ",req.body);
          console.log("받아온 요청 정보 : ",req.method);
          // SELECT * FROM user 
          // WHERE id = req.body.id
          // AND pw = req.body.pw 
          const user = await User.findOne({
             where:{
              id: req.body.id,
            } 
          });
          console.log("유저는 : ",user);
          if(user){
            if(user.passwd == req.body.passwd){
              await res.status(201).json(true)
            // await res.redirect('/')
            } else{
              res.send("비밀번호가 틀렸습니다.");
            }
          }else{
            res.send(false);
          }

        } catch (err) {
          console.error(err);
          next(err);
        }
    }
)




router.post("/user", async (req,res) =>{
  let result = await model.User.findOne({
    where: {
      id : body.id,
      passwd : body.passwd
    }
  })
  console.log(result);
})

router.get('/',(req,res) =>{
    console.log(req.body);
})


module.exports = router;