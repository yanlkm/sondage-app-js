const fs = require("fs");
const formidable = require("formidable");
const UserClassicSchema = require("../models/User");
const path = require("path");
const UserGoogle = require("../models/UserGoogle");

const isFileValid = (file) => {
  const type = file.mimetype.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png", "pdf"];
  const size = file.size;
  console.log("size & type : " + size + "  " + type);

  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  if (size >= 500000) {
    return false;
  }
  return true;
};

const uploadProfile = async (req, res) => {
  try {
    // Vérifiez que res.locals.user est correctement défini et contient les informations de l'utilisateur
    const user = res.locals.user;
    if (!user) {
      throw new Error("User information not found");
    }
    let updatedRecord;
    let isValid = false;
    let form = new formidable.IncomingForm();
    form.multiples = false;
    form.uploadDir = path.resolve(`${__dirname}/../client/public/classics/uploads/profile`);
    form.parse(req);

    form.on("fileBegin", async function (name, file) {
      file.originalFilename = user.displayName.replace(/\s+/g, '_') + ".jpg";

      file.filepath = `${form.uploadDir}/${encodeURIComponent(
        file.originalFilename
      )}`;
    });

    form.on("file", function (name, file) {
      isValid = isFileValid(file);
      console.log("isValid 1: " + isValid);

      if (!isValid) {
        fs.unlink(file.filepath, (err) => {
          if (err) {
            console.log("Error deleting the file:", err);
          }
        });
      }
    });

    form.on("end", async () => {
      // Toutes les validations ont été effectuées ici
      console.log("status isvalid last : " + isValid);

      if (!isValid) {
        return res.status(200).json({
          status: "Fail",
          message:
            "The file type is not a valid type or the size exceeds the limit",
        });
      }

      const files = form.openedFiles;
      for (const file of files) {
        const absoluteFilePath = path.resolve(file.filepath);
        console.log("dir : " + absoluteFilePath);
        console.log("Upload file : " + file.originalFilename);
        updatedRecord = {
          image: absoluteFilePath,
        };
      }
      if (!updatedRecord) {
        throw new Error("Error on updating image profile account");
      }
      try {
        if(user.googleId)
        {
          await UserGoogle.findByIdAndUpdate(
            user._id,
            { $set: updatedRecord },
            { new: true } // Correction de l'option pour le nouvel objet
          );

        } else {
          await UserClassicSchema.findByIdAndUpdate(
            user._id,
            { $set: updatedRecord },
            { new: true } // Correction de l'option pour le nouvel objet
          );
        }

      } catch (err) {
        console.log("Update error : " + err);
      }

      res.status(201).json({ message: "File uploaded successfully!" });
    });
  } catch (err) {
    console.log('erreur'+err);
    res.status(200).json({ error: err.message });
  }
};

module.exports = {
  uploadProfile,
  isFileValid
};
