import { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailErrors = document.querySelector(".email.error");
  const passwordErrors = document.querySelector(".password.error");

  emailErrors.innerHTML = "";
  passwordErrors.innerHTML = "";
  
  const handleLogin = (e) => {
    e.preventDefault();


    if (email.length === 0) {
      emailErrors.innerHTML = "Veuillez saisir un email";
    }
    if (password.length === 0) {
      passwordErrors.innerHTML = "Veuillez saisir un mot de passe";
    }
    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}auth/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      }).then((res) => {
        if (res.data.errors) {
          console.log(res)
          emailErrors.innerHTML = res.data.errors.email;
          passwordErrors.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      }).catch((err) => {
  console.log({errors : err.response.data})
      });

    }
    
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-in-form">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <div class="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <div class="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
