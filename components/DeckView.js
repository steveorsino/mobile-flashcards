import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR, APP_COLOR } from '../utils/colors'
import { getDeck } from '../utils/helpers'

export class DeckView extends Component {
  state = {
    deckLoaded : false, 
    deckDetails: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck View',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: APP_COLOR,
      }
    }
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
  goToQuiz = () => {
    this.props.navigation.navigate('QuizView')
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.deckLoaded
          ? <View style={styles.container}>
              <Text style={styles.testText}>{this.state.deckDetails.title}</Text>
              <Text style={styles.deckCards}>cards: {this.state.deckDetails.questions.length}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => this.addQuestion(this.state.deckDetails.title)}
              >
                <Text style={styles.buttonTxt}>Add Card</Text>
              </TouchableOpacity>
              {this.state.deckDetails.questions.length > 0 &&
                <TouchableOpacity
                style={styles.addBtn}
                onPress={() => this.goToQuiz()}
                >
                  <Text style={styles.buttonTxt}>Start Quiz</Text>
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
  screenTxt: {
    flex: 1,
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
  deckCards: {
    color: TEXT_COLOR,
    fontSize: 25
  },
  addBtn: {
    backgroundColor: TEXT_COLOR,
    marginTop: 35,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    width: '60%'
  }
})

export default DeckView
