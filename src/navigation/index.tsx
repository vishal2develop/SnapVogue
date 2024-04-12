import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

import React from 'react';

import {RootNavigatorParamList} from '../types/navigation';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import AuthStackNavigator from './AuthStackNavigator';

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
  return (
    <NavigationContainer linking={linking}>
      <stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: true}}>
        <stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <stack.Screen name="Comments" component={CommentScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
