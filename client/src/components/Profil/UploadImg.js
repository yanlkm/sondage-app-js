
import React, { useState } from 'react';
import { fetchImage } from "../../reducers/user.reducers";
import { useDispatch,useSelector } from 'react-redux';



const UploadImg = () => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch(); 
    const user = useSelector((state) => state.user);
    // console.log(user)

    let selectedImage;
    const handleChange = (e) => {
        e.preventDefault();
        selectedImage = e.target.files[0];
        setImage(selectedImage);
        console.log(selectedImage)
        handleUpload(); // Appeler la fonction de téléchargement ici
    };

    const handleUpload = () => {
        if (image || selectedImage) {
         
            const data = new FormData();
            data.append('file',( image ? image : selectedImage));

            dispatch(fetchImage(data,user.data._id))
        } else {
          console.log('erreur chargement image')
        }
    };

    return (
        <div>
            <form action="" className="upload-pic" onSubmit={handleUpload}>
                <label htmlFor='file'>Changer votre photo de Profil</label>
                <input
                    type='file'
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default UploadImg;