import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Channel, AccountList } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import {
  Account,
  AccountActivity,
  Chat,
  ChatActivity,
  Profiles,
  ProfileActivity,
} from '../components/icon';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      headerTitle: routeName,
      headerRight: () =>
        routeName === 'Account' && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('Account Creation')}
          />
        ),
    });
  }, [route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="Channels"
        component={Channel}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <ChatActivity /> : <Chat />),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountList}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AccountActivity /> : <Account />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileActivity /> : <Profiles />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
