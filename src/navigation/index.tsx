import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

import {RootNavigatorParamList} from './types';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import CommentScreen from '../screens/CommentScreen/CommentScreen';

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
        initialRouteName="Home"
        screenOptions={{headerShown: true}}>
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
