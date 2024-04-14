import {SignInOutput, getCurrentUser, AuthUser} from 'aws-amplify/auth';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Hub} from 'aws-amplify/utils';
import {HubCallback} from '@aws-amplify/core';

type UserType = SignInOutput | AuthUser | null | undefined;

type AuthContextType = {
  user: UserType;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

// context provider. This will be consumed by other components
const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(undefined);
  console.log('user:', user);

  const checkUser = async () => {
    try {
      const {userId, username, signInDetails} = await getCurrentUser();
      console.log('username:', username);

      setUser(username);
    } catch (e) {
      console.log('error:', (e as Error).message);

      setUser(null);
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

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
