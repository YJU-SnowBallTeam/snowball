const express = require('express');
const { User } = require('../models');
const {Girugi} = require('../user');


const router = express.Router();


router.route('/jowon').post(

    async (req, res) => {
        const user = await Girugi.findAll({
            where : {
                grade : 2
            }
        });
        await res.send(user)
    }
)