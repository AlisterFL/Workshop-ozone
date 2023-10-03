import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useFetchTypes from '../../hooks/useFetchTypes';

function TrashForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mapPosition, setMapPosition] = useState({ lat: 50.641830, lng: 3.061858 }); // Coordonnées initiales
  const { data: types, isLoading } = useFetchTypes();

  console.log(types);





  const handleSubmit = (e) => {
    e.preventDefault();

    // Créez un WasteFormData pour faciliter l'envoi d'un fichier image
    const trashFormData = new FormData();
    trashFormData.append('name', name);
    trashFormData.append('selectedOptions', JSON.stringify(selectedOptions));
    trashFormData.append('location', JSON.stringify(mapPosition));

    // Simule l'envoi du formulaire
    console.log("Formulaire soumis !", { name, description, selectedOptions, mapPosition })

    // Pour envoyer réellement le formulaire à un serveur :
    // fetch('/votre-url-api', {
    //   method: 'POST',
    //   body: trashFormData
    // });

    setName('');
    setDescription('');
  };


    const handleSelectionChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(selectedValues);
    };



    // parametrage de la map
    const mapStyles = {
        height: "400px",
        width: "100%"
      };
    
      const defaultCenter = {
        lat: 50.641830, lng: 3.061858
      }
    
      const onClickHandler = event => {
        setMapPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      }


      return (
        <div className="trashForm">
            {isLoading ? (
                <div className="loading">

                    <h2>Ajouter un nouveau type de poubelle</h2>
                    <p>Chargement du formulaire...</p>
                </div>
            ) : (
                <div className="trashForm">
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
                <p>
                    <label htmlFor="type">Sélectionnez le type de déchet :</label>
                    <select multiple name="dwarfs" id="type" onChange={handleSelectionChange}>
                        {types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </p>
            </div>
      
        {/* Ajout de Google Maps */}
        <LoadScript googleMapsApiKey='AIzaSyBXAHTLR9ttEAdSJ4d3Tr28Xe0mtIFESn4'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                onClick={onClickHandler}
                clickableIcons={false}
            >
                <Marker position={mapPosition} />
            </GoogleMap>
        </LoadScript>
        <div>
            Latitude: {mapPosition.lat}
        </div>
        <div>
            Longitude: {mapPosition.lng}
        </div>
       

        <button type="submit">Soumettre</button>
        </form>

    </div>
            )}
        </div>
    );

    
}

export default TrashForm;