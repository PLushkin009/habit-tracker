import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddHabitScreen from './screens/AddHabitScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
        <Stack.Screen name="AddHabit" component={AddHabitScreen} options={{ title: 'Добавить привычку' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
