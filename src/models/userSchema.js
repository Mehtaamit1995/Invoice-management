const mongoose = require("mongoose");
const validator = require("validator");


const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('password cannot contain "password"');
          }
        },
    },
    role: {
     type: String,
     default: 'Cashier',
     trim: true,
     enum: ["Cashier", "Manager", "Superadmin"]
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    },
    {
        timestamps: true,
    } 
);

   const User = mongoose.model('user', UserSchema);
    
   module.exports = UserSchema;