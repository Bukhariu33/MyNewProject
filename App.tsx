import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import MyTabs from './src/navigation/bottomTabNavigation'

export default function App() {
  return (
    
      <MyTabs/>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,

  }
})