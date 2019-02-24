import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/colors'
import { getDeck } from '../utils/helpers'

export class QuizView extends Component {
  state = {
    deckLoaded : false, 
    deckDetails: {},
    cardIndex: 0,
    showCorrect: 0,
    numCorrect: 0
  }
  componentDidMount() {
    AsyncStorage.getItem('DECK')
    .then((value) => {
      const deck = JSON.parse(value)
      getDeck(deck)
        .then((value) => {
          this.setState({
            deckDetails: value,
            deckLoaded: true,
            showCorrect: Math.round(Math.random())
          })
        })
    })
    .catch((err) => console.log(err))
  }
  answer = (ans) => {
    if ((ans === this.state.showCorrect && ans === 1) || 
        (ans === this.state.showCorrect && ans === 0)) {
          console.log('Answer: ',ans)
          console.log('Showing: ',this.state.showCorrect)
          this.setState({numCorrect: this.state.numCorrect + 1})
        }
      
    console.log("Number correct: ", this.state.numCorrect)
    this.setState({
      cardIndex: this.state.cardIndex + 1,
      showCorrect: Math.round(Math.random())
    })
  }

  back = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View>
        {this.state.deckLoaded
          ? <View>
              <Text>Quiz: Number correct: {this.state.numCorrect}</Text>
              {this.state.deckDetails.questions.map((elem, index) => {
                  return (
                    <View key={index} style={this.state.cardIndex !== index && {display: 'none'}}>
                      <Text>Question #{index + 1}</Text>
                      <Text>{elem.question}Test Question</Text>
                      {this.state.showCorrect === 1 
                        ? <Text>{elem.correctAnswer}Test Correct</Text> 
                        : <Text>{elem.incorrectAnswer}Test Incorrect</Text>}
                      
                      
                    </View>
                  )
              })}
              {this.state.cardIndex < this.state.deckDetails.questions.length
                ? <View>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => this.answer(1)}
                    >
                      <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => this.answer(0)}
                    >
                      <Text>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                : <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => this.back()}
                  >
                    <Text>Back</Text>
                  </TouchableOpacity>
              }
            </View>
          :<Text>Loading...</Text>
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
export default QuizView
