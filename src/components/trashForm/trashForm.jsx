import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import useFetchTypes from '../../hooks/useFetchTypes';


function TrashForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mapPosition, setMapPosition] = useState({ lat: 50.641830, lng: 3.061858 }); // Coordonnées initiales
  const [address, setAddress] = useState(''); 
  // Utilisation du hook useFetchTypes
  const { data: types, isLoading } = useFetchTypes();






  const handleSubmit = (e) => {
    e.preventDefault();

    // Créez un WasteFormData pour faciliter l'envoi d'un fichier image
    const trashFormData = new FormData();
    trashFormData.append('nom', name);
    trashFormData.append('type', JSON.stringify(selectedOptions));
    trashFormData.append('longitude', JSON.stringify(mapPosition.lat));
    trashFormData.append('latitude', JSON.stringify(mapPosition.lgt));
    trashFormData.append('adresse', JSON.stringify(address));

    // Simule l'envoi du formulaire
    console.log("Formulaire soumis !", { name, selectedOptions, mapPosition })

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
    
      const onClickHandler = async event => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        setMapPosition({ lat: newLat, lng: newLng });
    
        // Utilisez l'API de géocodage inverse pour obtenir l'adresse
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyBXAHTLR9ttEAdSJ4d3Tr28Xe0mtIFESn4`);
        const data = await response.json();
    
        if (data.results && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
        } else {
            console.log('Adresse introuvable');
        }
    };

    return (
        <div className="formContainer">
            {isLoading ? (
                <div className="loading">
                    <h2>Ajouter un nouveau type de poubelle</h2>
                    <p>Chargement du formulaire...</p>
                </div>
            ) : (
                <>
                    <h2>Ajouter un nouveau type de poubelle</h2>
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
                                    {types.map(({ id, type }) => (
                                        <option key={id} value={id}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </p>
                        </div>
                        <div className='map'>
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
                        </div>
                        <div>Latitude: {mapPosition.lat}</div>
                        <div>Longitude: {mapPosition.lng}</div>
                        <div>Adresse: {address}</div>
                        <button type="submit">Soumettre</button>
                    </form>
                </>
            )}
        </div>
    );
    
    
}

export default TrashForm;