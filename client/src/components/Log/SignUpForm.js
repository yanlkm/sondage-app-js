import axios from "axios";
import { useState } from "react";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".controlPassword.error"
    );
    const termsErrors = document.querySelector(".terms.error");

    //remplace ce premier if par une itération qui vérifie email, pseudo, password, controlpassword
    //et qui fait un innerhtml sur les constantes d'erreur adaptées en disant veuillez saisir un `${valeur}`...
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";
    termsErrors.innerHTML = "";

    if (pseudo.length === 0) {
      pseudoError.innerHTML = "Veuillez saisir un pseudo";
    }
    if (email.length === 0) {
      emailError.innerHTML = "Veuillez saisir un email";
    }
    if (password.length === 0) {
      passwordError.innerHTML = "Veuillez saisir un mot de passe";
    }
    if (password !== controlPassword || !acceptTerms) {
      console.log("erreurs gooded");
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe sont differents";
      if (!acceptTerms)
        termsErrors.innerHTML =
          " Veuillez acceptez les conditions d'utilisation";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL_BACK}auth/signup`,
        withCredentials: true,
        data: {
          displayName: pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.displayName || res.data.email || res.data.password) {
            pseudoError.innerHTML = res.data.displayName;
            emailError.innerHTML = res.data.email;
            passwordError.innerHTML = res.data.password;
          } else {
            console.log(res.data);
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          console.log("catch : ");
          console.log({ errors: err });
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <div>
          <SignInForm /><span></span> <h4 class="success">Enregistrement réussi ! Connectez vous !</h4>{" "}
        </div>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo"
            name="pseudo"
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
            value={pseudo}
          />
          <div class="pseudo error"></div>
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
          <label htmlFor="controlPassword">Confirmez le mot de passe</label>
          <input
            type="password"
            id="controlPassword"
            name="controlPassword"
            onChange={(e) => {
              setControlPassword(e.target.value);
            }}
            value={controlPassword}
          />
          <div class="controlPassword error"></div>

          <label class="terms">
            <input
              type="checkbox"
              id="terms"
              onChange={(e) => setAcceptTerms(e.target.checked)}
              checked={acceptTerms}
              style={{
                position: "relative",
                opacity: 1,
                pointerEvents: "fill",
              }} // Ajoute un espace entre la case à cocher et le texte
            />
            J'accepte les
            <a href="/" target="_blank" rel="noopener noreferrer">
              {" "}
              conditions générales
            </a>
          </label>
          <div class="terms error"></div>

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
