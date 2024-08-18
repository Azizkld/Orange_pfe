// src/components/Home.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import AnimatedOffers from './Animatedoffers';
function Home() {
  const token = localStorage.getItem('accessToken');
  console.log('Access token:', token);
  return (
    <div className="App">
      <Header /> {/* Use Header component here */}
      <main className="App-content">
        <div className="App-offers" >
          <AnimatedOffers  />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
