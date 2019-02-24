import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { createDeck, getDecks } from '../utils/helpers'

export class NewDeck extends Component {
  state = {
    text: '',
  }
  handleTextChange (text) {
    this.setState({text})
    console.log(this.state.text)
  }

  handleAddDeck () {
    if (this.state.text.length > 0) {
      console.log(this.state.text)
      createDeck(this.state.text)
        .then(() => {
          alert('YPU ADDED A DECK')
          this.props.navigation.navigate('Home')
        })
      
      //this.props.navigation.navigate('Home')
    } else {
      alert('You must enter a name for your new deck')
    }


  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
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
  testText: {
    color: TEXT_COLOR,
    fontSize: 30
  },
  addBtn: {
    borderColor: 'grey',
    borderWidth: 1,
  }
})

export default NewDeck
