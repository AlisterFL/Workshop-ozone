import { useState, useRef } from 'react';
import './style.css'
import useFetchTypes from '../../hooks/useFetchTypes';


function WasteForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const imageInputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Utilisation du hook useFetchTypes
  const { data: types, isLoading } = useFetchTypes();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Créez un WasteFormData pour faciliter l'envoi d'un fichier image
    const wasteFormData = new FormData();
    wasteFormData.append('name', name);
    wasteFormData.append('description', description);
    wasteFormData.append('image', image);
    wasteFormData.append('selectedOptions', JSON.stringify(selectedOptions));

    // Simule l'envoi du formulaire
    console.log("Formulaire soumis !", { name, description, image, selectedOptions});

    // Pour envoyer réellement le formulaire à un serveur :
    // fetch('/votre-url-api', {
    //   method: 'POST',
    //   body: wasteFormData
    // });

    setName('');
    setDescription('');
    setImage(null);
  };

  const handleSelectionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedValues);
};

const [imagePreview, setImagePreview] = useState(null);


const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    
    // Créer une URL temporaire à partir du fichier sélectionné
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  
  

  const [options, setOptions] = useState([
    'Plastique', 'Verre', 'Déchet Vert', 'Batterie', 'Encombrant'
  ]);


  const handleImageDelete = () => {
    setImage(null);
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';  // Réinitialise l'input de type "file"
    }
  };
  
  

  return (
    <div className="wasteForm">
        <h2>Ajouter un nouveau déchet</h2>
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
                {!isLoading && types.map(type => (
                    <option key={type} value={type}>
                    {type}
                    </option>
                ))}
                </select>
            </p>
        </div>
      {/* Ajouter une image */}
        <div>
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
)}


        <button type="submit">Soumettre</button>
        </form>

    </div>
  );
}

export default WasteForm;
