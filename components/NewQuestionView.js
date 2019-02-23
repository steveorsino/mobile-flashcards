import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { getDecks, addCard } from '../utils/helpers'
import { AsyncStorage } from 'react-native';

export class NewQuestionView extends Component {
  state = {
    decks: {},
    deckToMod: '',
    question: '',
    correctAns: '',
    incorrectAns: ''
  }

  handleQuestion = (text) =>{
    this.setState({question: text})
  }
  handleCorrectAnswer = (text) => {
    this.setState({correctAns: text})
  }
  handleIncorrectAnswer = (text) => {
    this.setState({incorrectAns: text})
  }
  handleAddCard = () => {
    if (
      this.state.question === '' ||
      this.state.correctAns === '' ||
      this.state.incorrectAns == ''
    ) return alert('All fields Must be filled!')
    


  }

  componentDidMount() {
    getDecks()
    .then((value) => {
      this.setState( {
        decks: value
      })
    }).then (() => {
      console.log('State Decks = ',this.state.decks)
      AsyncStorage.getItem('ADD_QUESTION_DECK')
        .then((value) => {
          const dtm = JSON.parse(value)
          console.log('Deck to modify = ',dtm)
          this.setState({deckToMod: dtm})
        })
    })
  }
  render() {


    return (
      <View style={styles.container}>
      {
        this.state.deckToMod === ''
        ? <Text>Loading...</Text>
        : <View>
            <Text>Add a Card</Text>
            <Text>To</Text>
            <Text>{this.state.deckToMod}</Text>
            <Text></Text>
            <TextInput
              style={{height: 40}}
              placeholder="Question: "
              onChangeText={(text) => this.handleQuestion(text)}
            />
            <TextInput
              style={{height: 40}}
              placeholder="Correct Answer: "
              onChangeText={(text) => this.handleCorrectAnswer(text)}
            />
            <TextInput
              style={{height: 40}}
              placeholder="Incorrect Answer: "
              onChangeText={(text) => this.handleIncorrectAnswer(text)}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => this.handleAddCard()}
            >
              <Text>Add Card</Text>
            </TouchableOpacity>
          </View>
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

export default NewQuestionView
