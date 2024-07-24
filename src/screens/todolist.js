import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';

export default function Todolist() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTodos();
  }, []);

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      Alert.alert('Error', 'Failed to save todos');
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load todos');
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      let updatedTodos;
      if (editIndex !== null) {
        updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, text: inputValue.trim() } : todo
        );
        setEditIndex(null);
      } else {
        updatedTodos = [...todos, { text: inputValue.trim(), completed: false }];
      }
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setInputValue('');
    } else {
      Alert.alert('Validation', 'Please enter something');
    }
  };

  const handleEdit = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const getFilteredTodos = () => {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else if (filter === 'pending') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  };

  const renderFilterButton = (title, currentFilter) => {
    return (
      <TouchableOpacity 
        style={[styles.filterButton, filter === currentFilter && styles.activeFilterButton]}
        onPress={() => setFilter(currentFilter)}
      >
        <Text style={[styles.filterButtonText, filter === currentFilter && styles.activeFilterButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todo First App</Text>
      <View style={styles.textInputContainerStyles}>
        <TextInput 
          style={styles.textInput} 
          placeholder='Write here something' 
          placeholderTextColor="#999"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{editIndex !== null ? 'Edit' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        {renderFilterButton('All', 'all')}
        {renderFilterButton('Completed', 'completed')}
        {renderFilterButton('Pending', 'pending')}
      </View>
      <FlatList
        data={getFilteredTodos()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={[styles.todoText, item.completed && styles.completedText]}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(index)}>
                <FontAwesome name="edit" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(index)}>
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComplete(index)}>
                <FontAwesome 
                  name={item.completed ? 'check-circle' : 'circle-o'} 
                  size={24} 
                  color={item.completed ? 'green' : 'gray'} 
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  textInputContainerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: 'green',
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
