import React, { useEffect, useState } from "react";
import { dateParser } from "../Utils";
import { useSelector } from "react-redux";
import FollowHandler from "../Profil/FollowHandler";
import LikeButton from "./LikeButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Card = ({ etab, type }) => {
  const etablishment = useSelector((state) => state.etablishment);

  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  let path = "/comments/" + etab._id;
  let imgSrc;
  if (etab.image) {
    imgSrc = etab.image;
    if (imgSrc && imgSrc.length !== 0) {
      // Extrait le chemin relatif à partir de imgSrc
      const pathIndex = imgSrc.indexOf("/img");
      imgSrc = imgSrc.substring(pathIndex);
    } else {
      imgSrc = "/classics/uploads/profile/user.jpg";
    }
  }

  useEffect(() => {
    if (etablishment.data.factory) setIsLoading(false);
  }, [isLoading, etablishment.data.factory]);

  return (
    <li key={etab._id} className="card-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left"></div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h5>
                  {etab.name}
                  <FollowHandler idtofollow={etab._id} type={"trend"} />
                </h5>
              </div>
              <span>Depuis {dateParser(etab.createdAt)}</span>
            </div>
            {type === "info" && (
              <>
                <p style={{ fontStyle: "italic", color: "gray" }}>
                  {etab.likes.length}{" "}
                  {etab.likes.length > 1
                    ? "personnes ont aimé cet établissement ♡"
                    : "personne a déjà aimé cet établissement ♡"}
                  <br />
                  ➡️ Suivi par {etab.followers.length}{" "}
                  {etab.followers.length > 1 ? "personnes" : "personne"}
                  <br />
                  <br />
                </p>
              </>
            )}
            <p>{etab.description}</p>
            <div className="card-img">
              <img
                src={imgSrc ? imgSrc : "./img/factory/etablissement1.jpg"}
                alt=""
              />
            </div>

            <div className="card-footer">
              <Link to={path}>
                <div className="comment-icon">
                  <img src="/img/factory/comment.png" alt="" id="img-icon" />

                  {etab.comments.length}
                </div>
              </Link>
              <div className="like-icon">
                {user.data ? (
                  <LikeButton etab={etab} idtofollow={etab._id} />
                ) : (
                  <Popup
                    trigger={
                      <img src="/img/factory/unliked.svg" alt="Unfollow" />
                    }
                    position="bottom center"
                  >
                    <div>Connectez-vous pour aimer cet établissement</div>
                  </Popup>
                )}
                <h6>{etab.likes.length}</h6>
              </div>
              <img src="/img/factory/share.png" alt="" />
            </div>
            <br />
            <br />
            {type === "info" && <Comment etab={etab} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
