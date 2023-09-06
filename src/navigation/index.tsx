import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, View} from 'react-native';

import logo from '../assets/images/logo.png';

const stack = createNativeStackNavigator(); // Returns {Navigaotor, Screen}
const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Feed"
        screenOptions={{headerShown: true}}>
        <stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{headerTitle: HeaderTitle, headerTitleAlign: 'center'}}
        />
        <stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderTitle = () => {
  return (
    <View>
      <Image
        source={logo}
        resizeMode="contain"
        style={{width: 150, height: 40}}
      />
    </View>
  );
};

export default Navigation;
