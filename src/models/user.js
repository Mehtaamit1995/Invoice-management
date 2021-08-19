const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('./userSchema');
 


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  
    user.tokens = user.tokens.concat({ token });
    await user.save();
  
    return token;
  };


module.exports = User;