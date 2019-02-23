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
    getDecks()
      .then((value) => {
        this.setState( {
          decks: value
        })
      })
  }

  goToDeck = (key) => {
    AsyncStorage.setItem('DECK', JSON.stringify(key))
      .then(() => {
        this.props.navigation.navigate('DeckView')
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
              <TouchableOpacity key={key} onPress={() => this.goToDeck(key)}>
                <Text  style={styles.testText}>Deck {key}</Text>
                <Text  style={styles.testText}>cards {this.state.decks[key].questions.length}</Text>
              </TouchableOpacity>
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
  }
})

export default DeckListView