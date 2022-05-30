const express = require('express');
const User = require("../models/user")

const router = express.Router();

router.router('/login')
.get( async(req,res,next) =>{
    try {
        const login = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        next(error)
    }

}).post(
    async (req, res, next) => {
        try {
          const user = await User.create({
            id: req.body.id,
            passwd: req.body.passwd,
            pwcheck: req.body.pwcheck,
            name: req.body.name,
            tel: req.body.tel,
            email: req.body.email,
            grade : req.body.grade,
            yjuclass : req.body.yjuclass,
          });
          console.log("PostUser : ",user);
          res.status(201).json(user);
        } catch (err) {
          console.error(err);
          next(err);
        }
    }
)