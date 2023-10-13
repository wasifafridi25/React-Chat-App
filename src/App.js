import './style.scss';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/'>
          <Route index element={<Home />}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route> */}
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;
