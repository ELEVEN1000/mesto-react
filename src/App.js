import './App.css';
import React from "react";
import './components/Header.js'
import Header from "./components/Header.js";
import Profile from "./components/Profile.js";
import Elements from "./components/Elements.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <>
      <Header/>
      <Profile/>
      <Elements/>
      <Footer/>
    </>
  )
}

export default App;
