import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

import React from 'react';

import {RootNavigatorParamList} from '../types/navigation';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from '../contexts/AuthContext';
import {ActivityIndicator, Text, View} from 'react-native';

const stack = createNativeStackNavigator<RootNavigatorParamList>(); // Returns {Navigaotor, Screen}

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['instaclone://', 'https://instaclone.com'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};
const Navigation = () => {
  const {user} = useAuthContext();
  // means user is loading
  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <stack.Navigator initialRouteName="Auth" screenOptions={{}}>
        {user ? (
          <>
            <stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
            <stack.Screen name="Comments" component={CommentScreen} />
          </>
        ) : (
          <stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
