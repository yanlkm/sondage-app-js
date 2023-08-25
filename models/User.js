const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;

const staticSalt = async () => {
  return bcrypt.genSalt(saltRounds);
};

const UserClassicSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      minlength: 6,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      validate: [isEmail],
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 1024,
      required: true,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    followings : {
      type : [String] , 
      required : true,
      default  : []
    }, 
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Ajouter les horodatages createdAt et updatedAt
  }
);

UserClassicSchema.pre('save', async function (next) {
  if(this.isModified('password')) {
    try {
      const salt = await staticSalt();
      this.password =  bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  }
  else {
    next()
  }

});

UserClassicSchema.statics.login = async function(email, password ) {
  const user = await this.findOne({ email }); 
  console.log('user');
  console.log(user);
  
  if(user) {
   
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth) 
    if(auth){
      console.log('login user id :' + user._id);
      return user._id;
    }
    
    throw new Error('Incorrect password');
  }
  
  throw new Error('Incorrect email');
};

module.exports = mongoose.model("UserClassic", UserClassicSchema);