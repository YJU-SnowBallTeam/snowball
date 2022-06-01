const express = require('express');
const model = require('../models')
const Login = require("../models/login")

const router = express.Router();


router.route('/')
.get( async(req,res,next) =>{
    try {
        const login = await Login.findAll();
        res.json(login);
        console.log(login);

    } catch (error) {
        console.error(error);
        next(error)
    }

})
.post(
    async (req, res, next) => {
        try {
          let body = req.body;
          let inputId = body.id;
          let inputPassword = body.Password;
          console.log("req:body = ",req.body);
          console.log("body:id = ",body.id);
          console.log("body:passwd = ",body.passwd);
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
})

router.get('/',(req,res) =>{
    console.log(req.body);
})


module.exports = router;