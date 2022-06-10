const express = require('express');
const {User} = require('../models');


const router = express.Router();




router.route('/')
.post(
    async (req, res, next) => {
        try {
          console.log("받아온 바디 정보 : ",req.body);
          // view/login에서 axios.post(form Tag)한 정보가 들어옴
          console.log("받아온 요청 정보 : ",req.method);
          // SELECT * FROM user 
          // WHERE id = req.body.id
          // AND pw = req.body.pw 
          const user = await User.findOne({
             where:{
              id: req.body.id,
            } 
          });
          if(user){
            if(user.passwd == req.body.passwd){
              await res.status(201).json(user)
              /* public/login/login.js(13줄)로 결과를 response해줌. */
            } else{
              res.send("falsed");
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

module.exports = router;