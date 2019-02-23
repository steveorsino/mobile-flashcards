import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { getDeck } from '../utils/helpers'

export class DeckView extends Component {
  state = {
    deckLoaded : false, 
    deckDetails: {}
  }
  componentDidMount() {

    AsyncStorage.getItem('DECK')
      .then((value) => {
        const deck = JSON.parse(value)
        getDeck(deck)
          .then((value) => {
            this.setState({deckDetails: value, deckLoaded: true})
          })
      })
      .catch((err) => console.log(err))
  }

  addQuestion = (id) => {
    AsyncStorage.setItem('ADD_QUESTION_DECK', JSON.stringify(id))
      .then(() => {
        this.props.navigation.navigate('NewQuestionView')
      })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.deckLoaded
          ? <View>
              <Text style={styles.testText}>{this.state.deckDetails.title}</Text>
              <Text style={styles.testText}>{this.state.deckDetails.questions.length} cards</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => this.addQuestion(this.state.deckDetails.title)}
              >
                <Text>Add Card</Text>
              </TouchableOpacity>
              {this.state.deckDetails.questions.length > 0 &&
                <TouchableOpacity>
                  <Text>Start Quiz</Text>
                </TouchableOpacity>}
            </View>
          : <Text style={styles.testText}>Loading Deck</Text>}
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

export default DeckView
