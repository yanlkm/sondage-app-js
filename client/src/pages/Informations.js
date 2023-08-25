import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../components/Factory/Card";

const Informations = () => {
  let { id } = useParams();
  const etablishment = useSelector((state) => state.etablishment);

  const singleFactory =
    etablishment.data && etablishment.data.factory
      ? etablishment.data.factory.find((factory) => factory._id === id)
      : null;

  return (
    <div>
      {etablishment.data && etablishment.data.factory && singleFactory ? (
        <Card etab={singleFactory} key={id} type="info" />
      ) : (
        <i className="fas fa-spinner fa-spin"></i>
      )}
    </div>
  );
};

export default Informations;
