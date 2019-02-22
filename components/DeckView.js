import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';

export class DeckView extends Component {
  state = {
    deckLoaded : false,
    deck: null
  }
  componentDidMount() {
    let deck = '';
    AsyncStorage.getItem('VIEW')
      .then((value) => {
        deck = JSON.parse(value)
        console.log('theDeck: ', deck )
      })
      .then(() => {
        this.setState({deckLoaded: true, deck})
      })
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <View>
        {this.state.deckLoaded
          ? <Text>{this.state.deck}</Text>
          :  <Text>Loading Deck</Text>}
      </View>
    )
  }
}

export default DeckView
