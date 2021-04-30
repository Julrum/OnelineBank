import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Channel, AccountCreation, AccountList } from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Chat" component={MainTab} />
      <Stack.Screen name="Channel" component={Channel} />
      <Stack.Screen name="Account Creation" component={AccountCreation} />
      <Stack.Screen name="Account List" component={AccountList} />
    </Stack.Navigator>
  );
};

export default MainStack;
