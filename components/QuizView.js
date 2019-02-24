import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import { BACKGROUND_COLOR, TEXT_COLOR, APP_COLOR } from '../utils/colors'
import { getDeck, clearLocalNotification, setLocalNotification } from '../utils/helpers'

export class QuizView extends Component {
  state = {
    deckLoaded : false, 
    deckDetails: {},
    cardIndex: 0,
    numCorrect: 0,
    showAnswer: false,
    quizOver: false
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz',
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
          this.setState({
            deckDetails: value,
            deckLoaded: true
          })
        })
    })
    .catch((err) => console.log(err))
  }
  answer = (ans) => {
    this.setState({
      numCorrect: this.state.numCorrect + ans,
      cardIndex: this.state.cardIndex + 1,
      showAnswer: false
    })
    if ((this.state.cardIndex + 1) === this.state.deckDetails.questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)
      this.setState({quizOver: true})
    }
  }



  back = () => {
    this.props.navigation.navigate('DeckView')
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.deckLoaded
          ? <View style={styles.container}>
          
              <Text style={styles.testText}>
                {this.state.deckDetails.questions.length - this.state.cardIndex} remaining questions
              </Text>
              <Text style={styles.testText}>Number correct: {this.state.numCorrect}</Text>
              {this.state.deckDetails.questions.map((elem, index) => {
                  return (
                    <View key={index} style={[styles.container, this.state.cardIndex !== index && {display: 'none'}]}>
                      <Text style={styles.testText}>Question: {index + 1}</Text>
                      <Text style={styles.qAndATxt}>{elem.question}</Text>
                      {
                        this.state.showAnswer
                        ?  <View style={styles.container}>
                            <Text style={styles.testText}>Answer</Text>
                            <Text style={styles.qAndATxt}>{elem.answer}</Text>
                            <TouchableOpacity
                              style={styles.correctBtn}
                              onPress={() => this.answer(1)}
                            >
                              <Text style={styles.buttonTxt}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.incorrectBtn}
                              onPress={() => this.answer(0)}
                            >
                              <Text style={styles.buttonTxt}>Incorrect</Text>
                            </TouchableOpacity>
                          </View>
                        : <TouchableOpacity
                            style={styles.addBtn}
                            onPress={() => this.setState({showAnswer: true})}
                          >
                            <Text style={styles.buttonTxt}>See Answer</Text>
                          </TouchableOpacity>
                      }
                   </View>
                  )
              })}
              {
                this.state.quizOver &&
                  (
                    <View>
                      <Text style={styles.quizEnd} >Quiz Ended</Text>
                      <Text style={styles.quizPercent}>
                        {((this.state.numCorrect/this.state.deckDetails.questions.length) * 100).toFixed(1)} %
                      </Text>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => this.back()}
                      >
                        <Text style={styles.buttonTxt}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => this.setState({
                          cardIndex: 0,
                          quizOver: false,
                          numCorrect: 0,
                        })}
                      >
                        <Text style={styles.buttonTxt}>Start Over</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => this.props.navigation.navigate('Home')}
                      >
                        <Text style={styles.buttonTxt}>Home</Text>
                      </TouchableOpacity>
                    </View>
                  )
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
  qAndATxt: {
    color: '#767A80',
    fontSize: 25
  },
  buttonTxt: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
  },
  quizEnd: {
    marginTop: 40,
    fontSize: 35,
    color: '#83D86C'
  },
  quizPercent: {
    marginTop: 5,
    fontSize: 45,
    alignSelf: 'center',
    color: '#767A80'
  },
  correctBtn: {
    backgroundColor: '#6FC456',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    width: '80%',
    paddingLeft: 10,
    paddingRight: 10
  },
  incorrectBtn: {
    backgroundColor: '#D55252',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    width: '80%',
    paddingLeft: 10,
    paddingRight: 10
  }, 
  addBtn: {
    backgroundColor: TEXT_COLOR,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    width: '80%',
    paddingLeft: 10,
    paddingRight: 10
  }
})
export default QuizView
