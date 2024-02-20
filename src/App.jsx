import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Detailedlocation from './Components/Detailedlocation';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element ={<Home/>}/>
          <Route path='/Location/:locationid' element={<Detailedlocation />} />
        </Routes>
        </BrowserRouter>
    </div>

  );
}

export default App;
