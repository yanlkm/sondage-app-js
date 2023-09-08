import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFacts,
  likeFac,
  unlikeFac,
} from "../../reducers/factories.reducers";
import { isEmpty } from "../Utils";
import { fetchUsers } from "../../reducers/users.reducers";
import { fetchUser } from "../../reducers/user.reducers";

const LikeButton = ({ idtofollow, etab }) => {
  const [like, setLike] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlelike = async (e) => {
    e.preventDefault();
    if (user.data && etab._id) {
      try {
        await dispatch(likeFac(idtofollow));

        // Mettre à jour les données utilisateur
        await dispatch(fetchUsers());
        await dispatch(fetchUser(user.data._id));

        // Mettre à jour les likes et les établissements après avoir like
        await dispatch(fetchFacts());
      } catch (error) {
        // Gérer les erreurs si nécessaire
        console.log(error);
      }
    }
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    if (user.data && etab._id) {
      try {
        await dispatch(unlikeFac(idtofollow));

        // Mettre à jour les données utilisateur
        await dispatch(fetchUsers());
        await dispatch(fetchUser(user.data._id));

        // Mettre à jour les likes et les établissements après avoir like
        await dispatch(fetchFacts());
      } catch (error) {
        // Gérer les erreurs si nécessaire
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(user.data) && etab.likes.includes(user.data._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [etab.likes, user.data]);

  return (
    <>
      {like && user.data && (
        <span onClick={() => setLike(!like)}>
          <button id="followbtntrend" onClick={handleDislike}>
            <img src="/img/factory/liked.svg" alt="Unfollow" />
          </button>
        </span>
      )}
      {!like && user.data && (
        <span onClick={() => setLike(!like)}>
          <button id="followbtntrend" onClick={handlelike}>
            <img src="/img/factory/unliked.svg" alt="Unfollow" />
          </button>
        </span>
      )}
    </>
  );
};

export default LikeButton;
