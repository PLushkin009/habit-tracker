import React from 'react';
import { View, Text, Button } from 'react-native';

const AddHabitScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Добавление новой привычки</Text>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddHabitScreen;
