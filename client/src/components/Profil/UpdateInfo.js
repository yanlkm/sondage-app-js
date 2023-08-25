import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo, fetchUser } from "../../reducers/user.reducers";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import { fetchFacts } from "../../reducers/factories.reducers";

const UpdateInfo = () => {
  console.log("Update info");
  const user = useSelector((state) => state.user);
  const etablishment = useSelector((state) => state.etablishment);
  const dispatch = useDispatch();
  const [updateForm, setUpdateForm] = useState(false);

  const [newEmail, setNewEmail] = useState(null);
  const [newName, setNewName] = useState(null);
  const [followingPop, setFollowingPop] = useState(false);

  const [numFollowings, setNumFollowings] = useState(null); // Local state to store number of followings

  // ...

  useEffect(() => {
    // Calculate the number of followings
    if (user.data) {
      console.log("use effect of abos :" + user.data.followings.length);

      setNumFollowings(user.data.followings.length);
    }
  }, [user.data]);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Récupérer les nouvelles valeurs des champs email et displayName
    console.log("Nouveau Pseudo :", newName);
    console.log("Nouvel Email :", newEmail);

    if (user.data) {
      const record = {
        displayName: newName ? newName : user.data.displayName,
        email: newEmail ? newEmail : user.data.email,
      };
      dispatch(fetchInfo(record));
      dispatch(fetchUser(user.data._id));
    }
  };

  return (
    <div id="divpro">
      <div className="bio-update">
        <h4>Profil </h4>
        {user.data && updateForm === false && (
          <>
            <p
              onClick={() => {
                if (!user.data.googleId) setUpdateForm(!updateForm);
              }}
            >
              Pseudo : {user.data.displayName} <br />
              Email : {user.data.email}
              <br />
              Role : {user.data.role}
            </p>
          </>
        )}

        {user.data && updateForm && (
          <>
            <form>
              Pseudo :{" "}
              <input
                type="text"
                id="updateName"
                name="displayName"
                defaultValue={user.data.displayName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
              <br />
              Email :{" "}
              <input
                type="text"
                id="updateEmail"
                name="email"
                defaultValue={user.data.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <br />
              Role : {user.data.role}
              <br />
              <button
                onClick={(e) => {
                  setUpdateForm(!updateForm);
                  handleUpdate(e);
                }}
              >
                Modifier
              </button>
            </form>
          </>
        )}
        <br />
      </div>
      <h6>
        Inscrit.e depuis{" "}
        {user.data ? dateParser(user.data.createdAt) : "en cours..."}
      </h6>
      <h5
        onClick={() => {
          setFollowingPop(true);
          dispatch(fetchFacts());
          dispatch(fetchUser(user.data._id));
        }}
      >
        Abonnements : {numFollowings !== null ? numFollowings : "en cours..."}
      </h5>
      {followingPop && (
        <div className="popup-profil-container" >
          <div className="modals">
            <h6>Abonnements</h6>
            <span
              className="cross"
              onClick={() => {
                setFollowingPop(false);
                dispatch(fetchUser(user.data._id));
              }}
            >
              &#10005;
            </span>
            <ul >
              {etablishment.data &&
                etablishment.data.factory &&
                etablishment.data.factory.map((etab) => {
                  for (let i = 0; i < user.data.followings.length; i++) {
                    if (etab._id === user.data.followings[i]) {
                      return (
                        <li key={etab._id}>
                          <img src={etab.image} alt="pic-etab" />
                          {etab.name}
                          <FollowHandler idtofollow={etab._id} type={'account'} />
                        </li>
                      );
                    }
                  }
                  return null; // Ajouter un renvoi par défaut
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateInfo;
