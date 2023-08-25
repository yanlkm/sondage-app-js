import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SignInGoogle from "./SignInGoogle";


const index = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signUpModal, setSignUp] = useState(props.signUp);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signInModal, setSignIn] = useState(props.signIn);

  const handleModals = (e) => {
    if (e.target.id === "login") {
      setSignIn(true);
      setSignUp(false);
    } else if (e.target.id === "register") {
      setSignIn(false);
      setSignUp(true);
    }
  };



  return (
    <div className="connection-form">
      <div className="form-container">
        <ul >
        { <SignInGoogle/>}
        <br/>
          <li onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>
            Se connecter
          </li>
          <br />
          <li onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>
            S'inscrire
          </li>
        </ul>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}  
       

      </div>
     
    </div>
  );
};

export default index;
