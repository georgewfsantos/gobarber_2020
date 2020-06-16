import React from 'react';

// import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';
import ToastContainer from './components/ToastContainer/index';
import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <ToastContainer />
      <GlobalStyle />
    </>
  );
};

export default App;
