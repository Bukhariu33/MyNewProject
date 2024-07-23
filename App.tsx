import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Todolist from './src/screens/todolist'

export default function App() {
  return (
    
      <Todolist/>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,

  }
})