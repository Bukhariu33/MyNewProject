import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Filters(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:90,
        height:40,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    text:{
        color:'#fff',
        fontWeight:'bold'
    }
})