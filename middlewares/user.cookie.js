const jwt = require("jsonwebtoken");
const UserClassicSchema = require("../models/User");
const UserGoogle = require("../models/UserGoogle");

const getUserIdbyCookie = async (req, res, next) => {

    const token = req.cookies.jwt;

    // console.log(req.cookies.jwt)

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (!decodedToken) {
                // Si le token est invalide ou expiré, appeler next sans utilisateur
                next();
            } else {
                let user; 
                try {
                    if (!decodedToken.id) {
                        // Recherche de l'utilisateur dans la base de données des utilisateurs Google
                        user = await UserGoogle.findOne({ googleId: decodedToken.googleId });
                    } else {
                        // Recherche de l'utilisateur dans la base de données des utilisateurs normaux
                        user = await UserClassicSchema.findById(decodedToken.id);
                    }
                } catch (err) {
                    console.log(err);
                }
                // Renvoyer l'utilisateur trouvé ou null si l'utilisateur n'est pas trouvé
                // console.log('res avec cookeduser : '+ user)
                res.locals.user = user || null;
                next();
            }
        });
    } else {
        // Si le cookie n'est pas présent, appeler next sans utilisateur
        next();
    }
};

module.exports = {
    getUserIdbyCookie
};