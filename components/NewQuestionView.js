import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { TEXT_COLOR, APP_COLOR, BACKGROUND_COLOR } from '../utils/colors'
import { getDecks, addCard } from '../utils/helpers'
import { AsyncStorage } from 'react-native';

export class NewQuestionView extends Component {
  state = {
    decks: {},
    deckToMod: '',
    question: '',
    answer: ''
  }

  static navigationOptions = () => {
    return {
      title: 'Add a Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: APP_COLOR,
      }
    }
  }

  handleQuestion = (text) =>{
    this.setState({question: text})
  }
  handleAnswer = (text) => {
    this.setState({answer: text})
  }
  handleAddCard = () => {
    if (
      this.state.question === '' ||
      this.state.answer === ''
    ) return alert('All fields Must be filled!')
    
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    addCard(this.state.deckToMod, card)
      .then(() => {
        this.props.navigation.navigate('DeckView')
      })

  }

  componentDidMount() {
    getDecks()
    .then((value) => {
      this.setState( {
        decks: value
      })
    }).then (() => {
      AsyncStorage.getItem('ADD_QUESTION_DECK')
        .then((value) => {
          const dtm = JSON.parse(value)
          this.setState({deckToMod: dtm})
        })
    })
  }
  render() {
    return (
      <View style={styles.container}>
      {
        this.state.deckToMod === ''
        ? <Text style={styles.testText} >Loading...</Text>
        : <KeyboardAvoidingView behavior="padding"  style={styles.container}>
            <Text style={styles.testText}>Add a Card</Text>
            <Text style={styles.testText}>To</Text>
            <Text style={styles.testText}>{this.state.deckToMod}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Question: "
              onChangeText={(text) => this.handleQuestion(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Answer: "
              onChangeText={(text) => this.handleAnswer(text)}
            />
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => this.handleAddCard()}
            >
              <Text style={styles.buttonTxt}>Add Card</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
  buttonTxt: {
    color: 'white',
    fontSize: 30,
  },
  addBtn: {
    backgroundColor: TEXT_COLOR,
    marginTop: 35,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    width: '60%'
  },
  textInput: {
    height: 40,
    padding:5,
    width: 200,
    marginTop: 25,
    backgroundColor: 'white',
    fontSize: 20,
  },
})

export default NewQuestionView
