const UserClassicSchema = require("../models/User");
const UserGoogle = require("../models/UserGoogle");
const { authErrors, signInErrors } = require("../errors/auth.error");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (userId, googleId) => {
    return jwt.sign({ id: userId, googleId : googleId }, process.env.TOKEN_KEY, { expiresIn: '24h' });
  };


const singUp = async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    const user = await UserClassicSchema.create({
      displayName,
      email,
      password,
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = authErrors(err);
    console.log(err);
    res.status(200).json(errors);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;


  try {
    console.log('password :' + password)
    const user = await UserClassicSchema.login(email, password);
    
    console.log('user')
    console.log(user)
    const token = createToken(user._id, false);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).send({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    console.log(err);
    res.status(200).json({errors});
  }
};

const signInGoogle = async (req, res) => {
  const userSent = req.body;

  console.log('user sent : ');
  console.log(userSent);

  try {
    let user = await UserGoogle.findOne({ googleId: userSent.googleId });

    if (user) {
      const token = createToken(false, userSent.googleId);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
      res.status(201).send({ user: user._id });
    } else {
      const newUser = await UserGoogle.create(userSent);
      const token = createToken(false, newUser.googleId);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
      res.status(201).json({ user: newUser._id });
    }
  } catch (err) {
    res.status(200).json({ errors: err.message });
  }
};


const logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  req.session.destroy(function (err) {
    if (err) {
      res.status(200).json({ err });
    }
   
  });
   res.status(200).json({ success: true, redirectUrl : "/profile"});
};

module.exports = {
  singUp,
  signIn,
  signInGoogle,
  logOut,
  createToken
};
