import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { productsData } from "./api/api";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Cart from "./pages/Cart";

// import Footer from "./components/footer/Footer";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Signin from "./pages/Signin";

const Layout =()=>{
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={productsData} ></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100 ">
<RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
