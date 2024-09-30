import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/PageNotFound";
import Login from './pages/Login';
import CityList from "./components/CityList";
import { useEffect } from 'react';


function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    async function FetchCities  ()  {
       fetch("");
    }
  })


  return (
    <BrowserRouter>
       <Routes>
          <Route index  element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing  />} />
          <Route path='/login' element={<Login  />} />
          <Route path='app' element={<AppLayout  />}>
              <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
              <Route path='cities/:id' element={<City  />} />
              <Route path='countries' element={<CountryList cities={cities} isloading={isLoading} />} />
              <Route path='form' element={<p>Form</p>} />
           </Route>
      
          <Route path='*' element={<PageNotFound  />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
