import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AiIcons from "react-icons/ai";

function CreateFactory() {
  const etablishment = useSelector((state) => state.etablishment);
  const user = useSelector((state) => state.user);
  const [isOn, setIsOn] = useState(false);

  // Fonction pour activer le popup
  const openPopup = () => {
    setIsOn(true);
  };

  // Fonction pour désactiver le popup
  const closePopup = () => {
    setIsOn(false);
  };

  return (
    <>
      <div id="gotocreate">
        {/* Appel de la fonction openPopup lors du clic */}
        <img src="/img/icons/plus.png" alt="" onClick={openPopup} />
      </div>{" "}
      {isOn && (
          <div className="modals-create">
            ICI EST UN TEST
            <span // ajouter un bouton annuler pour fermer la pop-up donc annuler la création d'établissement
              className="cross"
              onClick={closePopup}
            >
              &#10005;
            </span>
          </div>
      )}
    </>
  );
}

export default CreateFactory;
