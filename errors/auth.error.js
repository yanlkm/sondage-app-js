const authErrors = (err) => {
let errors = {
    displayName : '', 
    email : '', 
    password : ''

}

 if(err.message.includes('displayName'))
 {
    errors.displayName="pseudo saisi trop court ou trop long"
 }

 if(err.message.includes('email'))
 {
    errors.email="Adresse mail déjà prise"
 }
 if(err.message.includes('password'))
 {
    errors.password="Mot de passe trop court"
 }

 return errors; 
}

const signInErrors = (err) => {

   let errors = {
      email : '', 
      password : ''
  
  }

  if(err.message.includes('email'))
  {
     errors.email="Adresse mail incorrecte "
  }
  if(err.message.includes('password'))
  {
     errors.password="Mot de passe mal saisi"
  }


  return errors;

}
const updateErrors = (err) => {
   let errors = {
      email : '', 
      displayName : '', 
   }
   if(err.message.includes('displayName'))
 {
    errors.displayName="pseudo saisi incompatible"
 }
   if(err.message.includes('email')) {

      errors.email="Adresse mail saisie déjà utilisée "
   }
   return errors

}
module.exports = { authErrors, signInErrors, updateErrors } 