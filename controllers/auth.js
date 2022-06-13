require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SCRETE);
        console.log(decoded);
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SCRETE);
        console.log(decoded);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});

        if(!user){  
            throw new Error("Invalid User")
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("Please authanticate...")
    }
}

module.exports = auth;