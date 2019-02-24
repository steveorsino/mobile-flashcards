import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { getDecks } from '../utils/helpers'
import { AsyncStorage } from 'react-native';


class DeckListView extends Component {
  state = {
    decks: undefined,
  }
  componentDidMount() {
    console.log('componentDidMount') 
    getDecks()
      .then((value) => {
        this.setState( {
          decks: value
        })
        console.log('All Decks = ',this.state.decks)
      })
  }

  goToDeck = (key) => {
    AsyncStorage.setItem('DECK', JSON.stringify(key))
      .then(() => {
        this.props.navigation.navigate('DeckView')
      })
  }

  removeDeck = (key) => {
    AsyncStorage.getItem('DECKS')
      .then((value) => {
        const decks = JSON.parse(value)
        delete decks[key]
        AsyncStorage.setItem('DECKS', JSON.stringify(decks))
          .then(() => {
            this.setState({decks})
          })
      })
  }
  render() {
    return (
      <View style={styles.container}>
         {this.state.decks === undefined
          ? <View>
              <Text>You have no decks</Text>
            </View>
          : Object.keys(this.state.decks).map((key) => {
            return (
              <View style={styles.addBtn} key={key} >
                <TouchableOpacity  onPress={() => this.goToDeck(key)}>
                  <Text  style={styles.testText}>Deck </Text>
                  <Text  style={styles.testText}>cards {this.state.decks[key].questions.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.removeDeck(key)}>
                  <Text>Remove Deck</Text>
                </TouchableOpacity>
              </View>
              )
          })
        } 
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
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default DeckListView