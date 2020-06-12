import React from 'react';

import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  );
};

export default App;
