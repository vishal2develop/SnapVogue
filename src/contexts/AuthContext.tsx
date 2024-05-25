import {
  SignInOutput,
  getCurrentUser,
  AuthUser,
  fetchAuthSession,
  JWT,
} from 'aws-amplify/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Hub} from 'aws-amplify/utils';
import {HubCallback} from '@aws-amplify/core';

type UserType = SignInOutput | AuthUser | null | undefined;
type UserJwtTokenType = string;

type AuthContextType = {
  user: UserType;
  userId: string;
  userJwtToken: UserJwtTokenType;
};
const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userId: '',
  userJwtToken: '',
});

// context provider. This will be consumed by other components
const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(undefined);
  const [userId, setUserId] = useState<string>('');
  const [userJwtToken, setUserJwtToken] = useState<UserJwtTokenType>('');

  console.log('user:', user);

  const checkUser = async () => {
    try {
      const {userId, username} = await getCurrentUser();
      const {tokens} = await fetchAuthSession();
      console.log('username:', username);
      // console.log('userId:', userId);
      // console.log('signInDetails:', signInDetails);
      const jwtToken = (tokens?.accessToken || '') as string;
      setUser(username);
      setUserJwtToken(jwtToken);

      setUserId(userId);
    } catch (e) {
      console.log('error:', (e as Error).message);

      setUser(null);
      setUserId('');
      setUserJwtToken('');
    }
  };

  useEffect(() => {
    (async () => await checkUser())();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      const {event} = data.payload;
      console.log('event:', event);

      if (event === 'signedOut') {
        setUser(null);
        setUserId('');
        setUserJwtToken('');
      }
      if (event === 'signedIn') {
        (async () => await checkUser())();
      }
    };
    const hubListenerCancelToken = Hub.listen('auth', listener);

    return () => {
      hubListenerCancelToken();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{user, userId: userId, userJwtToken: userJwtToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
