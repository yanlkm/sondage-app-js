import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { createFac, fetchFacts } from "../../reducers/factories.reducers";
import { fetchUser } from "../../reducers/user.reducers";

const placesLibrary = ["places"];

const CreateFactory = () => {
  console.log(process.env.REACT_APP_API_GOOGLE_MAPS_KEY);

  //   const etablishment = useSelector((state) => state.etablishment);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOk, setIsOk] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [FormIsOn, setFormIsOn] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  console.log("addr" + address);
  //creer l'autocompletion

  const autocompleteRef = useRef();

  useLoadScript({
    googleMapsApiKey: "AIzaSyB2KEjBzu3KPidgInsEQ3qOe9KETwslzUk",
    libraries: placesLibrary,
  });

  const onLoad = () => {
    const autocomplete = autocompleteRef.current;
    console.log(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  //

  // Fonction pour activer le popup
  const openPopup = () => {
    setFormIsOn(true);
    setIsOn(true);
  };

  // Fonction pour désactiver le popup
  const closePopup = () => {
    setIsOn(false);
  };
  //fonction pour desactiver le form
  const closeForm = (e) => {
    e.preventDefault();
    setFormIsOn(false);
  };
  const nameError = document.querySelector(".name.error");
  const addressError = document.querySelector(".address.error");
  const descriptionError = document.querySelector(".description.error");
  if (nameError && addressError && descriptionError) {
    nameError.innerHTML = "";
    addressError.innerHTML = "";
    descriptionError.innerHTML = "";
  }

  const createFactory = (e) => {
    e.preventDefault();

    if (nameError && addressError && descriptionError) {
      if (name.length === 0) {
        nameError.innerHTML = "Veuillez saisir un nom";
      }
      if (address.length === 0) {
        addressError.innerHTML = "Veuillez saisir une adresse";
      }
      if (description.length === 0) {
        descriptionError.innerHTML = "Veuillez saisir une description";
      } else {
        if (user.data && user.data.role === "user") {
          const data = {
            name,
            address: address.trim(),
            description,
          };
          dispatch(createFac(data)).then((res) => {
            if (res.payload.address) {
              addressError.innerHTML = res.payload.address;
            } else {
              setIsOk(true);
            }
          });
          if (isOk) {
            dispatch(fetchFacts());
            dispatch(fetchUser(user.data._id));
            closeForm(e);
          }

          nameError.innerHTML = "";
          addressError.innerHTML = "";
          descriptionError.innerHTML = "";
        }
      }
    }
  };
  // AIzaSyB2KEjBzu3KPidgInsEQ3qOe9KETwslzUk
  return (
    <>
      <div id="gotocreate">
        {/* Appel de la fonction openPopup lors du clic */}
        <img src="/img/icons/plus.png" alt="" onClick={openPopup} />
      </div>{" "}
      {isOn && (
        <div className={`modals-create ${FormIsOn ? "appear" : "disappear"}`}>
          {FormIsOn && (
            <h6>
              CRÉER RAPIDEMENT VOTRE ÉTABLISSEMENT{" "}
              <span // ajouter un bouton annuler pour fermer la pop-up donc annuler la création d'établissement
                className="cross"
                onClick={closePopup}
              >
                &#10005;
              </span>
            </h6>
          )}
          {!FormIsOn && (
            <>
              <span // ajouter un bouton annuler pour fermer la pop-up donc annuler la création d'établissement
                className="cross"
              ></span>
            </>
          )}
          <br />

          <form action="" onSubmit={createFactory}>
            <br />
            <label htmlFor="name">Nom de l'entreprise</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder="Nommer votre entreprise"
            />
            <div class="name error"></div>
            <label htmlFor="address">Addresse</label>
            <br />
            <Autocomplete
              options={{
                types: ["address"],
                componentRestrictions: { country: "fr" }, // Filtrer pour la France
              }}
              onPlaceChanged={(place) => onPlaceChanged(place)}
              onLoad={onLoad}
            >
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Rechercher une adresse en France"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Autocomplete>
            <div class="address error"></div>
            <br />
            <label htmlFor="description">
              Décrire votre entreprise en quelques lignes
            </label>
            <br />
            <textarea
              type="text"
              id="description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              placeholder=" Décrire les actions de votre entreprise"
            />
            <div class="description error"></div>
            <br />
            <input type="submit" value="Ajoutez votre établissement" />
          </form>
          <br />
          <div className="validation">
            <br />
            <h4>Enregistrement réussi</h4>
            <img src="/img/icons/valited.png" alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFactory;
