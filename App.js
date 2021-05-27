import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import khuvuc from "./src/screen/KhuVucScreen";
import chitiet from "./src/screen/ChiTietScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none"
                       initialRouteName="Home">
        <Stack.Screen name="Home" component={khuvuc} />
        <Stack.Screen name="chitiet" component={chitiet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
