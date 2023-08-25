import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { fetchFacts, postComment } from "../../reducers/factories.reducers";
import { fetchUsers } from "../../reducers/users.reducers";
import { fetchUser } from "../../reducers/user.reducers";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CommentAction from "./CommentAction";

const Comment = ({ etab }) => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [posted, setPosted] = useState(false);

  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();

    if (user.data && text.trim() !== "") {
      // Vérifier que le texte n'est pas vide
      const record = {
        fid: etab._id,
        data: {
          message: text,
          displayName: user.data.displayName,
        },
      };
      if (user.data.googleId) {
        try {
          await dispatch(postComment(record)); // Attendre que le commentaire soit posté

          // Mettre à jour les données utilisateur
          await dispatch(fetchUsers());
          await dispatch(fetchUser(user.data._id));

          // Mettre à jour les commentaires et les établissements après avoir posté le commentaire
          await dispatch(fetchFacts());

          setPosted(true);
          setText(""); // Réinitialiser le champ texte après l'envoi
        } catch (error) {
          // Gérer les erreurs si nécessaire
          console.log(error);
        }
      } else {
        dispatch(postComment(record));
        dispatch(fetchFacts());
      }

      setPosted(true);
      setText(""); // Réinitialiser le champ texte après l'envoi
    }
  };

  useEffect(() => {
    if (posted && user.data) {
      console.log("posted true");

      dispatch(fetchUsers());
      dispatch(fetchUser(user.data._id));
      dispatch(fetchFacts());
      setPosted(false);
    }
  }, [dispatch, posted, user.data]);

  const defaultImagePath = "/classics/uploads/profile/user.jpg";

  return (
    <div className="comments-container">
      <br />
      {users.data &&
        etab.comments.map((com) => {
          const imagePath = users.data.users
            .map((user) => {
              if (user._id === com.commenterId) {
                console.log(com.commenterId);
                return user.image.substring(user.image.indexOf("/classics"));
              }
              return null;
            })
            .join("");

          return (
            <div
              className={
                user.data
                  ? com.commenterId === user.data._id
                    ? "comment-container client"
                    : "comment-container"
                  : "comment-container"
              }
              key={com._id}
            >
              <div className="left-part">
                <img
                  src={!isEmpty(imagePath) ? imagePath : defaultImagePath}
                  alt=""
                />
              </div>
              <div className="right-part">
                <div className="comment-header">
                  <div className="pseudo">
                    {" "}
                    <h6> {com.displayName}</h6>
                  </div>
                  <span>Publié le {timestampParser(com.timestamps)}</span>
                </div>
                <p>{com.message}</p>
                <CommentAction com={com} etabId={etab._id} />
              </div>
            </div>
          );
        })}
      {user.data && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          {user.data ? (
            <input type="submit" value="Envoyer" />
          ) : (
            <Popup trigger={<button>Envoyer</button>} position="bottom center">
              <div>Connectez-vous pour commenter cet établissement</div>
            </Popup>
          )}
        </form>
      )}
    </div>
  );
};

export default Comment;
