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
      initialRouteName="한줄뱅크"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="한줄뱅크" component={MainTab} />
      <Stack.Screen name="채팅" component={Channel} />
      <Stack.Screen name="계정생성" component={AccountCreation} />
      <Stack.Screen name="주소록" component={AccountList} />
    </Stack.Navigator>
  );
};

export default MainStack;
