import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';
import Routes from 'Routes';
import './App.css';
import './assets/styles/custom.scss';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement("#root");

function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });
  
  return (
    <AuthContext.Provider value={{authContextData, setAuthContextData}}>
        <Routes />
        <ToastContainer/>
      </AuthContext.Provider>
  );
}

export default App;