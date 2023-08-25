import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeComment,
  fetchFacts,
  likeComment,
} from "../../reducers/factories.reducers";
import { fetchUsers } from "../../reducers/users.reducers";
import { fetchUser } from "../../reducers/user.reducers";
import { isEmpty } from "../Utils";

const CommentLike = ({ com, etabId }) => {
  const [like, setLike] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlelike = async (e) => {
    e.preventDefault();
    if (user.data && etabId) {
      const data = {
        fid: etabId,
        cid: com._id,
      };
      if (user.data.googleId) {
        try {
          await dispatch(likeComment(data));

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
        dispatch(likeComment(data));
        dispatch(fetchUsers());
        dispatch(fetchUser(user.data._id));
      }
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    if (user.data && etabId) {
      const data = {
        fid: etabId,
        cid: com._id,
      };
      if (user.data.googleId) {
        try {
          await dispatch(dislikeComment(data));

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
        dispatch(dislikeComment(data));
        dispatch(fetchUsers());
        dispatch(fetchUser(user.data._id));
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(user.data) && com.likes.includes(user.data._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [com.likes, user.data]);

  return (
    <>
      {like && user.data && (
        <span onClick={() => setLike(!like)}>
          <button id="combtntrend" onClick={handleDislike}>
            <img id="combtntrend"  src="/img/factory/liked.svg" alt="Unfollow" />
          </button>
        </span>
      )}
      {!like && user.data && (
        <span onClick={() => setLike(!like)}>
          <button id="combtntrend" onClick={handlelike}>
            <img id="combtntrend" src="/img/factory/unliked.svg" alt="Unfollow" />
          </button>
        </span>
      )}
    </>
  );
};

export default CommentLike;
