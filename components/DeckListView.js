import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { getDecks } from '../utils/helpers'



class DeckListView extends Component {
  state = {
    decks: undefined,

  }


  componentDidMount() {
    console.log('State Text = ',this.state.text);
    
    getDecks()
      .then((value) => {
        this.setState( {
          decks: value
        })
      })
    
     
    // console.log('App: componentDidMount. Decks = ',decks);
    // console.log('State Decks = ',this.state.decks);
    
  }


  render() {
    return (
      <View style={styles.container}>
         {this.state.decks === undefined
          ? <View>
              <Text>You have no decks</Text>
            </View>
          : Object.keys(this.state.decks).map((key) => {
            return <Text key={key} style={styles.testText}>Deck {key}</Text>
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