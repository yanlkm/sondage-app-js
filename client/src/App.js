import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "./reducers/user.reducers";
import { fetchFacts } from "./reducers/factories.reducers";
import { fetchUsers } from "./reducers/users.reducers";

const App = () => {
  
  const [uid, setUid] = useState(null);
  
  useEffect(() => {
    const checkToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL_BACK}jwtid`,
        withCredentials: true,
      })
        .then((res) => 
        {
          // console.log('réponse de get /jwtid :' + res.data)
          setUid(res.data)
        }
        )
        .catch((err) => console.log(err));
    };
    checkToken();
  }, []);

  const dispatch = useDispatch();
  if (uid) dispatch(fetchUser(uid))
  dispatch(fetchUsers())
  dispatch(fetchFacts())

  // console.log('uid : ' + uid)
  
  return (
    <UidContext.Provider value={uid}>
      
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
