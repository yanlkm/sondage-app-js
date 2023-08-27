const { createFacErrors } = require("../errors/auth.error");
const Factory = require("../models/Factory");
const User = require("../models/User");
const UserGoogle = require("../models/UserGoogle");
const ObjectId = require("mongoose").Types.ObjectId;

const getAll = async (req, res) => {
  try {
    const factory = await Factory.find();
    res.status(201).send({ factory });
  } catch (err) {
    console.log(err);
  }
};

const getOne = async (req, res) => {};

const createOne = async (req, res) => {
  const newFactory = new Factory({
    adminId: res.locals.user._id,
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    image :'',
    followers: [],
    likes: [],
    comments: [],
  });
  try {
    const factory = await newFactory.save();
    res.status(201).send({ factory });
  } catch (err) {
    const errors = createFacErrors(err);
    console.log(err);
    res.status(200).json(errors);
  }
};

const updateOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(401).send("ID Unknown : " + req.params.id);
  }

  const updatedRecord = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
  };

  try {
    const updatedFactory = await Factory.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true } // Correction de l'option pour le nouvel objet
    );
    res.status(201).send(updatedFactory);
  } catch (err) {
    console.log("Update error : " + err);
    res.status(500).send("Erreur lors de la mise à jour des données.");
  }
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(401).send("ID Unknown : " + id);
  }

  try {
    const deletedRecord = await Factory.findByIdAndRemove(id);
    if (deletedRecord) {
      return res.status(200).send("Record deleted successfully.");
    } else {
      return res.status(404).send("Record not found.");
    }
  } catch (err) {
    console.log("Delete error : " + err);
    return res.status(500).send("Error deleting record.");
  }
};

const followOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(401).send("ID Unknown : " + req.params.id);

  const user = res.locals.user;

  console.log(user);
  try {
    let currentUser;
    const factoryLoaded = await Factory.findById(req.params.id);

    if (factoryLoaded) {
      console.log(factoryLoaded);
      if (factoryLoaded.followers.includes(user._id)) {
        return res
          .status(200)
          .json({ message: "Vous suivez déjà cet établissement" });
      } else {
        try {
          factoryLoaded.followers.push(user._id);
        } catch (err) {
          return res.status(200).send("Erreur update follow");
        }
        if (user.googleId) {
          currentUser = await UserGoogle.findById(user._id);
          if (currentUser)
            if (currentUser.followings.includes(req.params.id)) {
              return res
                .status(200)
                .json({ message: "Vous suivez déjà cet établissement" });
            } else {
              currentUser.followings.push(req.params.id);
            }
        } else {
          currentUser = await User.findById(user._id);
          if (currentUser)
            if (currentUser.followings.includes(req.params.id)) {
              return res
                .status(200)
                .json({ message: "Vous suivez déjà cet établissement" });
            } else {
              currentUser.followings.push(req.params.id);
            }
        }

        await factoryLoaded.save();

        await currentUser.save();

        return res
          .status(200)
          .json({ message: "Vous suivez maintenant cet établissement" });
      }
    } else {
      return res.status(200).send("Establishment not found.");
    }
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json({ message: "Erreur lors du suivi de l'établissement" });
  }
};

const unfollowOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(401).send("ID Unknown : " + req.params.id);

  const user = res.locals.user;

  try {
    let currentUser;
    const factoryLoaded = await Factory.findById(req.params.id);

    if (factoryLoaded) {
      if (!factoryLoaded.followers.includes(user._id)) {
        return res
          .status(200)
          .json({ message: "Vous ne suivez pas  cet établissement" });
      } else {
        try {
          factoryLoaded.followers.pull(user._id);
        } catch (err) {
          return res.status(200).send("Erreur update unfollow");
        }

        if (user.googleId) {
          currentUser = await UserGoogle.findById(user._id);
          if (currentUser)
            if (currentUser.followings.includes(req.params.id)) {
              currentUser.followings.pull(req.params.id);
            }
        } else {
          currentUser = await User.findById(user._id);
          if (currentUser)
            if (currentUser.followings.includes(req.params.id)) {
              currentUser.followings.pull(req.params.id);
            }
        }
        await factoryLoaded.save();
        await currentUser.save();
        return res
          .status(200)
          .json({ message: "Vous ne suivez plus cet établissement" });
      }
    } else {
      return res.status(200).send("Establishment not found.");
    }
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json({ message: "Erreur lors du désabonnement de l'établissement" });
  }
};
const likeOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(401).send("ID Unknown : " + req.params.id);

  const user = res.locals.user;
  console.log(user);

  try {
    const factoryLoaded = await Factory.findById(req.params.id);
    if (!factoryLoaded)
      return res.status(200).json({ message: "Établissement non trouvé" , status : "404"});

    if (factoryLoaded.likes.includes(user._id)) {
      return res.status(200).json({
        message: "Vous ne pouvez pas liker 2 fois le même établissement", status : "401"
      });
    } else {
      factoryLoaded.likes.push(user._id);

      await factoryLoaded.save();
      // Réponse réussie

      res.status(200).json({ message: "Vous aimez cet établissement" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: "Erreur lors du like de l'établissement",
      factoryLoaded,
    });
  }
};

const dislikeOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(401).send("ID Unknown : " + req.params.id);

  const user = res.locals.user;
  console.log(user);

  try {
    const factoryLoaded = await Factory.findById(req.params.id);
    if (!factoryLoaded)
      return res.status(404).json({ message: "Établissement non trouvé" });

    if (!factoryLoaded.likes.includes(user._id)) {
      return res.status(400).json({ message: "Vous ne likez l'établissement" });
    } else {
      factoryLoaded.likes.pull(user._id);

      await factoryLoaded.save();
    }
    // Réponse réussie
    res.status(200).json({ message: "Vous n'aimez plus établissement" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Erreur lors du dislike de l'établissement" });
  }
};

const commentOne = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(401).send("ID Unknown : " + req.params.id);

  // Vérifier si l'utilisateur est connecté
  const user = res.locals.user;
  if (!user) {
    return res
      .status(401)
      .json({ message: "Vous devez être connecté pour commenter." });
  }

  try {
    const factoryLoaded = await Factory.findById(req.params.id);
    if (!factoryLoaded)
      return res.status(404).json({ message: "Établissement non trouvé" });

    // Vérifier que displayName et message sont fournis
    if (!req.body.displayName || !req.body.message) {
      return res.status(400).json({
        message:
          "Le nom d'utilisateur et le message sont requis pour commenter.",
      });
    }

    factoryLoaded.comments.push({
      commenterId: user._id,
      displayName: req.body.displayName,
      message: req.body.message,
      likes: [],
      timestamps: new Date().getTime(),
    });

    await factoryLoaded.save();

    return res
      .status(201)
      .json({ message: "Commentaire ajouté avec succès !" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Erreur en commentant l'établissement." });
  }
};

const deleteComment = async (req, res) => {
  const user = res.locals.user;

  if (!ObjectId.isValid(req.params.idfactory))
    return res.status(401).send("ID Unknown : " + req.params.idfactory);

  try {
    const factoryLoaded = await Factory.findById(req.params.idfactory);
    if (!factoryLoaded)
      return res.status(404).json({ message: "Établissement non trouvé" });

    const commentId = req.params.idcomment;
    const userId = user._id;

    let commentFound = false;
    let commentFoundIndex = -1;

    factoryLoaded.comments.forEach((comment, index) => {
      console.log("comment : " + comment + "user Id :" + userId.toString());
      if (
        comment.commenterId === userId.toString() &&
        comment._id.toString() === commentId
      ) {
        // Comment instance found that matches both commentId and userId
        commentFound = true;
        commentFoundIndex = index;
      }
    });

    if (!commentFound) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas commenté cet établissement" });
    }

    if (commentFoundIndex !== -1) {
      // Comment instance found, remove it from the array using Mongoose pull
      factoryLoaded.comments.pull(
        factoryLoaded.comments[commentFoundIndex]._id
      );
      // Save the updated document
      await factoryLoaded.save();
      // Do something else if needed
      return res
        .status(201)
        .json({ message: "Commentaire supprimé avec succès !" });
    }

    return res
      .status(400)
      .json({ message: "Vous n'avez pas commenté cet établissement" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression du commentaire" });
  }
};

const likeComment = async (req, res) => {
  const user = res.locals.user;

  if (!ObjectId.isValid(req.params.idfactory))
    return res.status(401).send("ID Unknown : " + req.params.idfactory);

  try {
    const factoryLoaded = await Factory.findById(req.params.idfactory);
    if (!factoryLoaded)
      return res.status(404).json({ message: "Établissement non trouvé" });

    const commentId = req.params.idcomment;
    const userId = user._id;

    let commentFoundIndex = -1;
    let commentLiked = false;

    for (let i = 0; i < factoryLoaded.comments.length; i++) {
      const comment = factoryLoaded.comments[i];

      if (comment._id.toString() === commentId) {
        commentFoundIndex = i;
        commentLiked = comment.likes.includes(userId);
        break; // Sortir de la boucle dès que le commentaire est trouvé
      }
    }
    console.log("status");
    if (commentLiked) {
      return res
        .status(400)
        .json({ message: "Vous avez déjà liké ce commentaire" });
    }

    if (commentFoundIndex !== -1) {
      factoryLoaded.comments[commentFoundIndex].likes.push(userId);
      await factoryLoaded.save();

      return res
        .status(201)
        .json({ message: "Commentaire liké avec succès !" });
    } else {
      return res
        .status(400)
        .json({ message: "le commentaire cherché n'existe pas" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erreur lors du like du commentaire" });
  }
};

const dislikeComment = async (req, res) => {
  const user = res.locals.user;

  if (!ObjectId.isValid(req.params.idfactory))
    return res.status(401).send("ID Unknown : " + req.params.idfactory);

  try {
    const factoryLoaded = await Factory.findById(req.params.idfactory);
    if (!factoryLoaded)
      return res.status(404).json({ message: "Établissement non trouvé" });

    const commentId = req.params.idcomment;
    const userId = user._id;

    let commentFoundIndex = -1;
    let commentDisliked = false;

    for (let i = 0; i < factoryLoaded.comments.length; i++) {
      const comment = factoryLoaded.comments[i];

      if (comment._id.toString() === commentId) {
        commentFoundIndex = i;
        commentDisliked = !comment.likes.includes(userId);
        break; // Sortir de la boucle dès que le commentaire est trouvé
      }
    }

    if (commentDisliked) {
      return res
        .status(400)
        .json({ message: "Vous n'avez pas liké ce commentaire" });
    }

    if (commentFoundIndex !== -1) {
      // Retirer le like du commentaire en utilisant la méthode pull de Mongoose
      factoryLoaded.comments[commentFoundIndex].likes.pull(userId);
      await factoryLoaded.save();

      return res
        .status(201)
        .json({ message: "Commentaire un-liké avec succès !" });
    } else {
      return res
        .status(400)
        .json({ message: "Le commentaire cherché n'existe pas" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erreur lors du dislike du commentaire" });
  }
};

module.exports = {
  deleteOne,
  createOne,
  updateOne,
  getOne,
  getAll,
  followOne,
  unfollowOne,
  likeOne,
  dislikeOne,
  commentOne,
  deleteComment,
  likeComment,
  dislikeComment,
};
