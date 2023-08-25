import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SignInGoogle = () => {
  const [user, setUser] = useState(null); // State to store user data

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT: " + response.credential);
    const userObject = jwt_decode(response.credential);

    const userData = {
      googleId: userObject.sub,
      email: userObject.email,
      displayName: userObject.name,
    };

    setUser(userData); // Store user data in state
  };

  // Function to send user data to the backend
  const sendUserDataToBackend = async () => {
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}auth/login/google`,
        withCredentials: true,
        data: user
      }).then((res) => {
        if (res.data.user) {
            window.location = "/";
        } else {
          console.log(res.data)
        }
      }).catch((err) => {
  console.log({errors : err})
      });
  };

  useEffect(() => {
    const initGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        /* global google */
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_API_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse,
        });

        window.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "medium",
        });
      } else {
        setTimeout(initGoogleSignIn, 100);
      }
    };

    initGoogleSignIn();
  }, []);

  useEffect(() => {
    if (user) {
      sendUserDataToBackend(); // When user data is available, send it to backend
    }
  }); // Run this effect whenever user data changes

  return <div id="signInDiv"></div>;
};

export default SignInGoogle;