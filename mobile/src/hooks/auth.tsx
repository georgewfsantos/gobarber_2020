import React, { createContext, useEffect, useCallback, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInfo {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextInfo>({} as AuthContextInfo);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({} as AuthState);

  useEffect(()=> {
    async function loadStoredAuthData(): Promise<void>{
      const [user, token] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if(token[1] && user[1]){
        setAuthData({ token: token[1], user: JSON.parse(user[1])})
      }
    }
    loadStoredAuthData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ]);


    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoBarber:user','@GoBarber:token',
    ]);

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextInfo {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be wrapped in AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
