import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../app/home';
import Search from '../app/search';
import Explore from '../app/explore';
import Profile from '../app/profile';
import Settings from '../app/settings';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// 👉 Bottom Tabs inside Drawer
function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: 'home',
            Search: 'search',
            Explore: 'compass',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Tab.Screen name="Explore" component={Explore} options={{ title: 'Explore' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

// 👉 Drawer outside of Tabs
export default function RootNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        drawerIcon: ({ color, size }) => {
          const drawerIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
            'Main Tabs': 'apps',
            Settings: 'settings',
          };
          return <Ionicons name={drawerIcons[route.name] || 'folder'} size={size} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Main Tabs" component={TabStack} options={{ drawerLabel: 'Main App' }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ drawerLabel: 'Settings' }} />
    </Drawer.Navigator>
  );
}
