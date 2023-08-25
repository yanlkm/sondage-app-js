import React from "react";
import CommentLike from "./CommentLike";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../reducers/users.reducers";
import { fetchUser } from "../../reducers/user.reducers";
import { deleteComment, fetchFacts } from "../../reducers/factories.reducers";

const CommentAction = ({ com, etabId }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (user.data && etabId) {
      const data = {
        fid: etabId,
        cid: com._id,
      };
      if (user.data.googleId) {
        try {
          await dispatch(deleteComment(data));

          // Mettre à jour les données utilisateur
          await dispatch(fetchUsers());
          await dispatch(fetchUser(user.data._id));

          // Mettre à jour les likes et les établissements après avoir like
          await dispatch(fetchFacts());
        } catch (error) {
          // Gérer les erreurs si nécessaire
          console.log(error);
        }
      } else {
        dispatch(deleteComment(data));
        dispatch(fetchUsers());
        dispatch(fetchUser(user.data._id));
      }
    }
  };

  return (
    <>
      <div className="card-footer">
        {user.data && user.data._id === com.commenterId && (
          <span>
            <button id="combtntrend" onClick={handleDelete}>
              <img
                id="combtntrend"
                src="/img/factory/delete.png"
                alt="Unfollow"
              />
            </button>
          </span>
        )}
        {user.data && user.data._id !== com.commenterId && (
            <br/>
        )}

        <div className="like-icon">
          <CommentLike etabId={etabId} com={com} />
          <h6>{com.likes.length}</h6>
        </div>
      </div>
    </>
  );
};

export default CommentAction;
