import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInfo {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextInfo>({} as AuthContextInfo);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredAuthData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setAuthData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    loadStoredAuthData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: authData.user, loading, signIn, signOut }}
    >
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
