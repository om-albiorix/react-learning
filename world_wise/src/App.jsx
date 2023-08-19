import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./assets/pages/Product";
import Pricing from "./assets/pages/Pricing";
import HomePage from "./assets/pages/HomePage";
import PageNotFound from "./assets/pages/Pagenotfound";
import Login from "./assets/pages/Login";


 function App() { 
  return (
   <BrowserRouter>
   <Routes>
      <Route path='product' element={<Product/>}/>
      <Route path='pricing' element={<Pricing/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='pagenotfound' element={<PageNotFound/>}/>
      <Route path='login'  element={<Login/>}/>
      {/* <Route path='app' element={<AppLayout/>}/> */}
   </Routes>
   </BrowserRouter>
  )
}
export default App;