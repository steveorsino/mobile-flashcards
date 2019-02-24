import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { createDeck } from '../utils/helpers'

export class NewDeck extends Component {
  state = {
    text: '',
  }
  handleTextChange (text) {
    this.setState({text})
  }

  handleAddDeck () {
    if (this.state.text.length > 0) {
      createDeck(this.state.text)
        .then(() => {
          alert('YOU ADDED A DECK')
          this.props.navigation.navigate('Home')
        })
    } else {
      alert('You must enter a name for your new deck')
    }


  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the name of your new deck!"
          onChangeText={(text) => this.handleTextChange(text)}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => this.handleAddDeck()}>
          <Text style={styles.testText}>Add Deck</Text>
        </TouchableOpacity>
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
  textInput: {
    height: 40,
    padding:5,
    backgroundColor: 'white',
    fontSize: 20,
  },
  testText: {
    color: 'white',
    fontSize: 30
  },
  addBtn: {
    backgroundColor: TEXT_COLOR,
    marginTop: 35,
    alignItems: 'center',
    width: '60%'
  }
})

export default NewDeck
