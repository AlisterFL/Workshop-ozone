import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Header from './header/header';
import Footer from './footer/footer';
import Error from './error/error';
import AddType from './typeOfTrashForm/typeOfTrashForm';

import HomePage from '../pages/homePage/homepage'
import Login from '../pages/login/login';
import List from '../pages/list/list';
import AddToList from '../pages/addToList/addToList';



function App() {
  return(

  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/addToList" element={<AddToList />} />
      <Route path="/addType" element={<AddType />} />
      <Route path="*" element={<Error />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App