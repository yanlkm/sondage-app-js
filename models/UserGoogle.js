const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

        googleId : {
            type : String,
            required : true
        },
        email : {
            type : String, 
            required : true
        },
        displayName : {
            type : String,
            required : true
        },
        firstName : {
            type : String
        },
        lastName : {
            type : String
        },
        image : {
            type : String,
            default: ""
        
        },
        followings : {
            type : [String] , 
            require : true,
            default  : []
        }, 
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
          },
        createdAt : {
            type : Date,
            default : Date.now
        }

})
module.exports = mongoose.model('UserGoogle', UserSchema)