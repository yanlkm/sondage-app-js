import Log from '../components/Log'
import { UidContext } from '../components/AppContext'
import { useContext } from 'react'
import UpdateProfil from '../components/Profil/UpdateProfil'

const Profil = () => {

    const uid = useContext(UidContext)
  
    return (
        <div class="profil-page">
            {uid ? (<UpdateProfil/>) : (

                <div class="log-container">
            <Log signIn={false} signUp={true}/>
        
            </div>

            )}
            
        

        </div>
      
    )
  }


export default Profil