/*eslint-disable */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import HomeScreen from '../screens/HomeScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddCategoryScreen from '../screens/AddCategoryScreen';

export const AppStackNavigator = createStackNavigator({
  // StartScreen: {
  //   screen: StartScreen,
  //   initial: true
  // },
  HomeScreen: {
    screen: HomeScreen
  },
  NoteDetailScreen: {
    screen: NoteDetailScreen
  },
  SettingsScreen:{
    screen: SettingsScreen
  },
  AddCategoryScreen:{
    screen: AddCategoryScreen
  }
});

export default AppStackNavigator;
