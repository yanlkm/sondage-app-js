import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFacts,
  followFac,
  unfollowFac,
} from "../../reducers/factories.reducers";
// import { fetchUser } from "../../reducers/user.reducers";

const FollowHandler = ({ idtofollow, type }) => {
  const [follow, setFollow] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlefollow = (e) => {
    e.preventDefault();
    if (user.data) {
      dispatch(followFac(idtofollow));

    }
  };
  const handleUnfollow = (e) => {
    e.preventDefault();

    if (user.data) {
      dispatch(unfollowFac(idtofollow));
    }
  };

  useEffect(() => {
    if (!isEmpty(user.data) && user.data.followings.includes(idtofollow)) {
      dispatch(fetchFacts());
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [user.data, dispatch, idtofollow]);

  return (
    <>
      {follow && user.data && (
        <span
          onClick={() => {
            setFollow(!follow);
          }}
        >
          {type === "account" && (
            <button id="followbtn" onClick={handleUnfollow}>
              <img src="/img/icons/unfollow.png" alt="Unfollow" />
            </button>
          )}
          {type === "trend" && (
            <button id="followbtntrend" onClick={handleUnfollow}>
              <img src="/img/icons/check.png" alt="Unfollow" />
            </button>
          )}
        </span>
      )}
      {!follow && user.data && (
        <span
          onClick={() => {
            setFollow(!follow);
          }}
        >
          {type === "account" && (
            <button id="followbtn" onClick={handlefollow}>
              <img src="/img/icons/follow.png" alt="Unfollow" />
            </button>
          )}
          {type === "trend" && (
            <button id="followbtntrend" onClick={handlefollow}>
              <img src="/img/icons/unchecked.png" alt="Unfollow" />
            </button>
          )}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
