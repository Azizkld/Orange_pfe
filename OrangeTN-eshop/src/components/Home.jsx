import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import AnimatedOffers from './Animatedoffers';

function Home() {
  const navigate = useNavigate();
  const { userID } = useParams(); // Get user ID from the URL

  useEffect(() => {
    const token = Cookies.get('accessToken');
    const storedUserID = Cookies.get('userID');

    if (!token || storedUserID !== userID) {
      navigate('/'); // Redirect to login page if no token is found or if userID doesn't match
    }
  }, [navigate, userID]);

  return (
    <div className="App">
      <Header />
      <main className="App-content">
        <div className="App-offers">
          <AnimatedOffers />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
