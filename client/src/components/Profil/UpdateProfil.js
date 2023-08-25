import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import UpdateInfo from "./UpdateInfo";
const UpdateProfil = () => {


  const user = useSelector((state) => state.user);
  let imgSrc, name;
  if (user.data) {
    imgSrc = user.data.image;
    if (imgSrc && imgSrc.length !== 0) {
      // Extrait le chemin relatif à partir de imgSrc
      const pathIndex = imgSrc.indexOf("/classics");
      imgSrc = imgSrc.substring(pathIndex);
    } else {
      imgSrc = "/classics/uploads/profile/user.jpg";
    }

    name = user.data.displayName;

  }
  
  return (
    <div className="profil-container">
      <h1> Profil de {name}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={imgSrc} alt="Picturhere" />
          <UploadImg />
        </div>
        <div className="right-part">
        <UpdateInfo />
        </div>
       
        <br />
      </div>
    </div>
  );
};

export default UpdateProfil;
