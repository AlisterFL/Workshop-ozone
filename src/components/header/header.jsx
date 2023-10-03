import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="logo">
                <Link to="/">Ozone</Link>
            </div>
            <div className="navbar">
                <Link to="/login">Login</Link>
                <Link to="/list">La Liste</Link>
                <Link to="/addToList">Nouvel élément</Link>
                <Link to="/addType">Nouveau Type</Link>
            </div>
        </header>
    )
  }
  
  export default Header