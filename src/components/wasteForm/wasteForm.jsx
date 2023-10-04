import { useState, useRef } from 'react';
import './style.css'
import useFetchTypes from '../../hooks/useFetchTypes';


function WasteForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Utilisation du hook useFetchTypes
  const { data: types, isLoading } = useFetchTypes();
  
  //   const imageInputRef = useRef(null);
  //   const [image, setImage] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Créez un WasteFormData pour faciliter l'envoi d'un fichier image
    const wasteFormData = new FormData();
    wasteFormData.append('titre', name);
    wasteFormData.append('description', description);
    // wasteFormData.append('image', image);
    wasteFormData.append('type', JSON.stringify(selectedOptions));
    wasteFormData.append('scoreDeRecyclabilite', 100);
    

    // Simule l'envoi du formulaire
    console.log("Formulaire soumis !", { name, description, selectedOptions});

    // Pour envoyer réellement le formulaire à un serveur :
    // fetch('/votre-url-api', {
    //   method: 'POST',
    //   body: wasteFormData
    // });

    setName('');
    setDescription('');
    // setImage(null);
  };

  const handleSelectionChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedIds);
};

//image
// const [imagePreview, setImagePreview] = useState(null);


// const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
    
//     // Créer une URL temporaire à partir du fichier sélectionné
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//     }
//   };

//   const handleImageDelete = () => {
//     setImage(null);
//     setImagePreview(null);
//     if (imageInputRef.current) {
//       imageInputRef.current.value = '';  // Réinitialise l'input de type "file"
//     }
//   };
  
  

  return (
    <div className="formContainer">
        {isLoading ? (
                <div className="loading">

                    <h2>Ajouter un nouveau dechet</h2>
                    <p>Chargement du formulaire...</p>
                </div>
            ) : (
            <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Nom :</label>
            <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            />
        </div>
        <div>
            <label htmlFor="description">Description :</label>
            <textarea 
            id="description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
            />
        </div>
        <div>
            <p>
                <label htmlFor="type">Sélectionnez le type de déchet :</label>
                <select multiple name="dwarfs" id="type" onChange={handleSelectionChange}>
                    {!isLoading && types.map(({ id, type }) => (
                        <option key={id} value={id}>
                            {type}
                        </option>
                    ))}
                </select>

            </p>
        </div>
      {/* Ajouter une image */}
        {/* <div>
            <label htmlFor="image">Image :</label>
            <input 
            type="file" 
            id="image" 
            onChange={handleImageChange} 
            required
            ref={imageInputRef}
            />
        </div>
        {imagePreview && (
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
            <img src={imagePreview} alt="Prévisualisation" style={{ width: '60%', margin:'0 auto' }} />
            <button onClick={handleImageDelete} style={{ marginTop: '10px', display: 'block' }}>
                Supprimer l'image
            </button>
        </div>
)} */}


        <button type="submit">Soumettre</button>
        </form>
            )}

    </div>
  );
}

export default WasteForm;
