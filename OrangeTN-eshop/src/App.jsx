import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

/*import Apropos from './components/Apropos'; // Assurez-vous que ces composants existent
import Profile from './components/Profile';
import Numero from './components/Numero';
import Offer from './components/Offer';
import Contrat from './components/Contrat';
import Reclamation from './components/Reclamation/Reclamation';*/
import PdfGenerated from './components/Contrats/PdfGenerated';
import EditProfile from './components/Profile/Editprofile';
import Header from './components/Header'; 
import Footer from './components/Footer';
import AcheterNumero from './components/Numero/AchatSimEsim';
import ContratList from './components/Contrats/ContratList';

import AboutUs from './components/Apropos/Apropos';
import SignupForm from './components/Auth/Signup';
import LoginForm from './components/Auth/Login';
import SimEsimForm from './components/Numero/AchatSimEsim';
import ConvertSimToEsim from './components/Convertir/ConvertSimToEsim';
import Reclamation from './components/Reclamation/Reclamation';
import ConvertEsimToSim from './components/Convertir/ConvertEsimToSim';
import ConsultList from './components/Numero/ConsultList';
import OfferList from './components/Offres/OfferList';
import Login from './Admin/Login';
import Logout from './components/Auth/Logout';
import PrivateRoute from './components/Gards/PrivateRoute';


import PaymentForm from './components/Paiement/PaymentForm';
//admin 

//sidebar
import Sidebar from './Admin/Sidebar'; 
// gerer clients
import GererClients from './Admin/ManageClients';
import AdminDashboard from './Admin/Dashboard';
import Cookies from 'js-cookie';




function App() {

  return (

    <Router>
      <div className="App">
        
          <Routes>
          <Route path="/user/:userID" element={<PrivateRoute><Home /></PrivateRoute>} />
          
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/profile/:userID" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
            <Route path="/acheter-numero" element={<AcheterNumero />} />
            <Route path="/convertir-sim/esim" element={<ConvertSimToEsim />} />
            <Route path="/contrat/:userID" element={<PrivateRoute><ContratList /></PrivateRoute>} />
            <Route path="/contrat" element={<ContratList />} />
            <Route path="/apropos" element={<AboutUs />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/Admin" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
            
            
        
            
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/Login" element={<LoginForm />} />
            
            <Route path="/numero" element={<ConsultList />} />
            <Route path="/numero/:userID" element={<PrivateRoute><ConsultList /></PrivateRoute>} />
            <Route path="/convertir-esim/sim" element={<ConvertEsimToSim />} />

            <Route path="/Reclamation" element={<Reclamation />} />
            <Route path="/Reclamation/:userID" element={<PrivateRoute><Reclamation /></PrivateRoute>} />
            <Route path="/offres/:userID" element={<PrivateRoute><OfferList /></PrivateRoute>} />
            <Route path="/Offres" element={<OfferList />} />
          
            {/*<Route path="/apropos" element={<AboutUs />} />

              <Route path="/gererclient" element={<GererClients />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/numero" element={<Numero />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/contrat" element={<Contrat />} />
            <Route path="/reclamation" element={<Reclamation />} />*/}
          </Routes>
       
      </div>
    </Router>
  );
}

export default App;
