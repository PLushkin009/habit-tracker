import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HomeScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [habitCost, setHabitCost] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    setHabits([]);
  }, []);

  const addHabit = () => {
    if (!habitName.trim() || !habitCost.trim()) return;

    const cost = parseFloat(habitCost);
    if (isNaN(cost) || cost <= 0) return;

    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      const existingHabitIndex = updatedHabits.findIndex(h => h.name === habitName.trim());

      if (existingHabitIndex !== -1) {
        updatedHabits[existingHabitIndex].cost += cost;
      } else {
        updatedHabits.push({ id: Date.now().toString(), name: habitName.trim(), cost });
      }

      return updatedHabits;
    });

    setHabitName('');
    setHabitCost('');
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter(habit => habit.id !== id));
  };

  const totalSaved = habits.reduce((sum, habit) => sum + habit.cost, 0);

  const chartData = {
    labels: habits.map(h => h.name),
    datasets: [
      {
        data: habits.map(h => h.cost),
        color: () => `rgba(34, 139, 34, 1)`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная</Text>
      <Text style={styles.savedText}>Сэкономлено: ${totalSaved.toFixed(2)}</Text>

      <View style={styles.periodButtons}>
        {['today', 'week', 'month'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.activePeriod]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={styles.periodText}>
              {period === 'today' ? 'Сегодня' : period === 'week' ? 'Неделя' : 'Месяц'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {habits.length > 0 ? (
        <LineChart
          data={chartData}
          width={350}
          height={200}
          yAxisSuffix="$"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 10 },
          }}
          bezier
          style={{ marginVertical: 10, borderRadius: 10 }}
        />
      ) : (
        <Text style={styles.noDataText}>Нет данных для графика</Text>
      )}

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.habitItem}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitCost}>${item.cost.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => deleteHabit(item.id)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Название привычки"
        value={habitName}
        onChangeText={setHabitName}
      />
      <TextInput
        style={styles.input}
        placeholder="Стоимость"
        keyboardType="numeric"
        value={habitCost}
        onChangeText={setHabitCost}
      />

      <TouchableOpacity style={styles.addButton} onPress={addHabit}>
        <Text style={styles.addButtonText}>Добавить привычку</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  savedText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  periodButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  periodButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#aaa',
    borderRadius: 5,
  },
  activePeriod: {
    backgroundColor: 'blue',
  },
  periodText: {
    color: 'white',
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitCost: {
    fontSize: 16,
    color: 'green',
  },
  deleteButton: {
    fontSize: 20,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginBottom: 10,
  },
});
