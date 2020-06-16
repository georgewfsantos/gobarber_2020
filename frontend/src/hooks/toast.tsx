import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToastContainer';

interface ToastContextInfo {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextInfo>({} as ToastContextInfo);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextInfo {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must only be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
