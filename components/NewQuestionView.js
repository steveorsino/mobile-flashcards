import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'

export class NewQuestionView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewQuestion</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testText: {
    color: TEXT_COLOR,
    fontSize: 30
  },
  addBtn: {
    borderColor: 'grey',
    borderWidth: 1,
  }
})

export default NewQuestionView
