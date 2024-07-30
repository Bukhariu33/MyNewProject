import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Todolist from '../screens/todolist';
import SecondScreens from '../screens/secondScreens';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#171716"
        inactiveColor="#fcba03"
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="Home"
          component={Todolist}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="SS"
          component={SecondScreens}
          options={{
            tabBarLabel: 'Second',
            tabBarIcon: ({ color }) => (
              <Icon name="screen-share" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
