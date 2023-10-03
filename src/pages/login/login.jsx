import { useState } from 'react';
import data from "../../data/data.json"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Traitement du formulaire (par exemple, envoi des données à un serveur)
    console.log('Username:', username);
    console.log('Password:', password);

    console.log('data.login', data.login)
    console.log('data.password', data.password)

    if (username === data.login && password === data.password){
        console.log("OK")
    } else {
        console.log("PAS OK")
    }

    // Réinitialiser les champs ou rediriger l'utilisateur après le traitement, selon vos besoins
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
