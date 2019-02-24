import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <ScrollView style={{backgroundColor: BACKGROUND_COLOR}}>
         {this.state.decks === undefined || Object.keys(this.state.decks).length === 0
          ? <View style={styles.container}>
              <Text style={[styles.deckTitle, {alignSelf: 'center'}]}>You have no decks</Text>
            </View>
          : Object.keys(this.state.decks).map((key) => {
            return (
              <View style={styles.addBtn} key={key} >
                <TouchableOpacity  style={styles.deckBtn} onPress={() => this.goToDeck(key)}>
                  <Text  style={styles.deckTitle}>{this.state.decks[key].title}</Text>
                  <Text  style={styles.deckCards}>cards: {this.state.decks[key].questions.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => this.removeDeck(key)}>
                  <Text style={styles.delete}>DELETE</Text>
                </TouchableOpacity>
              </View>
              )
          })
        } 
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  deckTitle: {
    color: TEXT_COLOR,
    fontSize: 30
  },
  deckBtn: {
    maxWidth: '80%',
  },
  deckCards: {
    color: TEXT_COLOR,
    fontSize: 20
  },
  delete: {
    color: 'red'
  },
  addBtn: {
    backgroundColor: '#fff',
    width:'100%',
    marginTop: 17,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default DeckListView