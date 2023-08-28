import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacts } from "../reducers/factories.reducers";
import { isEmpty } from "./Utils";
import Card from "./Factory/Card";
import CreateFactory from "./Factory/CreateFactory";

const Thread = () => {
  const etablishment = useSelector((state) => state.etablishment);
  const user = useSelector((state) => state.user);
  const [loadFac, setLoadFac] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadFac) {
      dispatch(fetchFacts());
      setLoadFac(false);
    }

    
  }, [dispatch, loadFac]);

  return (
    <div>
      {etablishment.data ? (
        etablishment.data.factory &&
        !isEmpty(etablishment.data.factory[0]) &&
        etablishment.data.factory.map((etab) => {
          return <Card etab={etab} key={etab._id} type='null'/>;
        })
        
      ) : (
        <i className="fas fa-spinner fa-spin"></i>
      )}
      {
        user.data && <CreateFactory/> 
      }
    </div>
  );
};

export default Thread;
