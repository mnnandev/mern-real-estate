import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Profile from "./Components/Profile";
import SignIn from "./Components/SignIn";
import Signout from "./Components/Singout";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />   

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<Signout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
