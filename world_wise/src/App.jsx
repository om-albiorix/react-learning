import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCities } from "./contexts/CitiesContext";

import Product from "./assets/pages/Product";
import Pricing from "./assets/pages/Pricing";
import HomePage from "./assets/pages/HomePage";
import PageNotFound from "./assets/pages/Pagenotfound";
import Login from "./assets/pages/Login";
import AppLayout from "./assets/pages/AppLayout";
import CityList from "./assets/components/CityList";
import CountryList from "./assets/components/CountryList";
import City from "./assets/components/City"
import Forms from './assets/components/Forms'
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

 function App() { 

  return (
   <AuthProvider>
   <CitiesProvider>
   <BrowserRouter>
   <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='product' element={<Product/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='login'  element={<Login/>}/>
      <Route path='app' element={<AppLayout/>}>
         <Route index   element={<Navigate replace to="cities"/>}/>
         <Route path="cities" element={<CityList/>}/>
         <Route path='cities/:id' element={<City/>}/>
         <Route path="countries" element={<CountryList/>}/>
         <Route path="form" element={<Forms />}/>
      </Route>
   </Routes>
   </BrowserRouter>
   </CitiesProvider>
   </AuthProvider>
  )
}
export default App;