const jwt = require('jsonwebtoken');
const UserClassicSchema = require('../models/User');
const UserGoogle = require('../models/UserGoogle');

module.exports.checkUserClassic = async (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log(req.cookies)
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (!decodedToken) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                console.log(err);
            } else {
                // console.log({decodedToken})
                try {
                    let user;
                    if (!decodedToken.id) {
                      // Recherche de l'utilisateur dans la base de données des utilisateurs Google
                      user = await UserGoogle.findOne({ googleId : decodedToken.googleId});
                      
                    } else {
                      // Recherche de l'utilisateur dans la base de données des utilisateurs normaux
                      user = await UserClassicSchema.findById(decodedToken.id);
                    }
          
                    res.locals.user = user;
                    // console.log('user cooked : ' + res.locals.user)
                    next();
                  } catch (err) {
                    // Handle the error if user is not found or any other errors occur
                    // ...
                    console.log('Cannot connect to DB')
                    console.log(err)
                  }

            }
        });
    } else {
        res.locals.user = null;
        console.log('No token found');
        next();
    } 
};
module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err); 
            }
            else {
                // console.log(decodedToken); 
                next();
            }

        })

    }
    else {
        console.log('There is no token bro')
    }

}