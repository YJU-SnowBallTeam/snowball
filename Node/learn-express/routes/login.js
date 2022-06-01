const express = require('express');
const Login = require("../models/login")

const router = express.Router();


router.route('/')
.get( async(req,res,next) =>{
    try {
        const login = await Login.findAll();
        res.json(login);

    } catch (error) {
        console.error(error);
        next(error)
    }

})
.post(
    async (req, res, next) => {
        try {
          const login = await Login.create({
            id: req.body.id,
            passwd: req.body.passwd,
          });
          console.log("PostUser : ",login);
          res.status(201).json(login);
        } catch (err) {
          console.error(err);
          next(err);
        }
    }
)

router.get('/',(req,res) =>{
    console.log(req.body);
})


module.exports = router;