const jwt = require("jsonwebtoken");
const UserClassicSchema = require("../models/User");
const UserGoogle = require("../models/UserGoogle");

const checkAdminRole = (req, res, next) => {
  // Vérifier si l'utilisateur est connecté et s'il a le rôle d'admin
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (!decodedToken) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        console.log(err);
        next();
      } else {
        // console.log({ decodedToken });
        let user;
        try {
          if (!decodedToken.id) {
            // Recherche de l'utilisateur dans la base de données des utilisateurs Google
            user = await UserGoogle.findOne({
              googleId: decodedToken.googleId,
            });
          } else {
            // Recherche de l'utilisateur dans la base de données des utilisateurs normaux
            user = await UserClassicSchema.findById(decodedToken.id);
          }
        } catch (err) {
          console.log(err);
        }
        console.log(user);
        res.locals.user = user;

        if (res.locals.user && res.locals.user.role === "user") {
          // L'utilisateur est un admin, passer au middleware suivant ou à la route
          next();
        } else {
          // L'utilisateur n'est pas un admin, renvoyer une réponse d'erreur
          res
            .status(403)
            .send(
              "Vous n'êtes pas autorisé à effectuer cette action. car :" +
                res.locals.user
            );
          console.log(res.locals.user);
        }
      }
    });
  } else {
    // L'utilisateur n'est pas un admin, renvoyer une réponse d'erreur
    res
      .status(403)
      .send(
        "Vous n'êtes pas autorisé à effectuer cette action. car :" +
          res.locals.user
      );
    console.log(res.locals.user);
  }
};

module.exports = {
  checkAdminRole,
};
