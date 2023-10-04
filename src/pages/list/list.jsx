import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './list.css';


function List() {
  const [data, setData] = useState([]);
  const [param, setParam] = useState('');

  useEffect(() => {
    if (param) {
      fetch(`http://192.168.210.137:8842/api/v1/${param}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data); // Étape 1: Afficher la réponse dans la console

          // Étape 2: Gérer les réponses inattendues
          if (Array.isArray(data)) {
            setData(data);
          } else if (data.data && Array.isArray(data.data)) {
            setData(data.data);
          } else {
            console.error("Unexpected format for data:", data);
          }
        })
        .catch(error => console.error("Erreur de chargement", error));
    }
  }, [param]);

  const handleDelete = (id) => {
    fetch(`http://192.168.210.137:8842/api/v1/${param}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setData(data.filter(item => item.id !== id));
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    })
    .catch(error => console.error(error));
  }

  return (
    <div className="data-list-container">
      <div>
        <button onClick={() => setParam('tags')}>Types de bac</button>
        <button onClick={() => setParam('bacs')}>Bac</button>
        <button onClick={() => setParam('dechets')}>Déchets</button>
      </div>

      <ul>
        {Array.isArray(data) && data.map((item) => (
          <li key={item.id}>
            <span>
                {param === 'tags' && item.type}
                {param === 'bacs' && item.nom}
                {param === 'dechets' && item.titre}
            </span>
            <span>
                <button onClick={() => handleDelete(item.id)}>Supprimer</button>
                <Link to={`/${param}/${item.id}`}>Modifier</Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
