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

const MainTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    navigation.setOptions({
      headerTitle: routeName,
      headerRight: () =>
        routeName === '주소록' && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('계좌추가')}
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
        name="채팅"
        component={Channel}
        options={{
          tabBarIcon: ({ focused }) => (focused ? <ChatActivity /> : <Chat />),
        }}
      />
      <Tab.Screen
        name="주소록"
        component={AccountList}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <AccountActivity /> : <Account />,
        }}
      />
      <Tab.Screen
        name="내 정보"
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
