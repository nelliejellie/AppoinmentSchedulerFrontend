import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './views/Home';
import Register from './views/Register';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
