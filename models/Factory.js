const mongoose = require("mongoose");

const Factory = new mongoose.Schema({

    adminId : {
        type : String, 
        required: true, 
    }, 
    name : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
        required : true
    } ,
    address : {
        type : String, 
        require : true,
        unique: true
    }, 
    image : {
        type :  String
    },
    followers : {
        type : [String] , 
        require : true,
        default  : []
    }, 
    likes : {
        type : [String], 
        required : true,
        default  : []
    }, 
    comments : {
        type : [
            {
                commenterId :String,
                displayName : String,
                message : String, 
                likes :[String], 
                timestamps : Number
            },

        ]

    }
},
    {
        timestamps : true
    }



)

module.exports = mongoose.model("Factory", Factory);