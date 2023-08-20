import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./assets/pages/Product";
import Pricing from "./assets/pages/Pricing";
import HomePage from "./assets/pages/HomePage";
import PageNotFound from "./assets/pages/Pagenotfound";
import Login from "./assets/pages/Login";
import AppLayout from "./assets/pages/AppLayout";
import CityList from "./assets/components/CityList";
import { useEffect, useState } from "react";


   const URL= "http://localhost:9000"

 function App() { 

   const [cities,setCities]=useState([]);
   const [isLoading,setIsLoading]=useState(false);

   useEffect(()=>{
      async function fetchCities(){
         try{
         setIsLoading(true)
         const res= await fetch(`${URL}/cities`);
         const data=await res.json();
         setCities(data)   
      }
         catch{
            alert('there was an error loadiing data')
         }finally{
            setIsLoading(false)
         }
      }
      fetchCities();

   },[])

  return (
   <BrowserRouter>
   <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='product' element={<Product/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='pagenotfound' element={<PageNotFound/>}/>
      <Route path='login'  element={<Login/>}/>
      <Route path='app' element={<AppLayout/>}>
         <Route index   element={<CityList cities={cities} isLoading={isLoading}/>}/>
         <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
         <Route path="countries" element={<p>Countries</p>}/>
         <Route path="form" element={<p>Form</p>}/>
      </Route>
   </Routes>
   </BrowserRouter>
  )
}
export default App;