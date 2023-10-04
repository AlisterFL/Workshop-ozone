import { useState } from 'react';

function SimpleForm() {
  const [type, setType] = useState('');
  const [detail, setDetail] = useState('');
  const [color, setColor] = useState('');

  const colors = ['#689f38', '#8e24aa', '#e64a19', '#283593', '#33691e', '#546e7a', '#ffb300'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
        type,
        detail,
        color
    };

    fetch('http://192.168.210.137:8842/api/v1/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données');
        }
        return response.json();
    })
    .then(data => {
        console.log('Données envoyées avec succès:', data);
        
        // Reset les champs
        setType('');
        setDetail('');
        setColor('');
    })
    .catch(error => {
        console.error('Il y a eu un problème avec l\'opération fetch:', error.message);
    });
};

  return (
    <div className="simpleForm">
      <h2>Ajouter un Type de dechets</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type :</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="detail">Détail :</label>
          <textarea
            id="detail"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            required
          />
        </div>
        <div className='colorChoice'>
          <label>Choisissez une couleur :</label>
          {colors.map((currentColor, index) => (
            <div
              key={index}
              className={`color-box ${color === currentColor ? 'selected-color' : ''}`}
              style={{ backgroundColor: currentColor, borderRadius: '8px', cursor: 'pointer', height: '30px', width: '30px', display: 'inline-block', margin: '5px' }}
              onClick={() => setColor(currentColor)}
            >
            </div>
          ))}
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}

export default SimpleForm;
