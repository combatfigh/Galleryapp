import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <Drawer
        screenOptions={({ route }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'home';

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'search') {
            iconName = 'search';
          }

          return {
            headerShown: true,
            drawerLabel: route.name === 'index' ? 'Home' : 'Search',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name={iconName} size={size} color={color} />
            ),
          };
        }}
      />
    </PaperProvider>
  );
}
