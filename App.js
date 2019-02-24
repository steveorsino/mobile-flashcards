import React from 'react';
import { StyleSheet, StatusBar, View, Text, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { APP_COLOR } from './utils/colors'
import { Constants } from 'expo'
import DeckListView from './components/DeckListView'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import { setLocalNotification } from './utils/helpers';

AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  History: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? APP_COLOR : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : APP_COLOR,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: APP_COLOR,
      }
    }
  },
  DeckView: {
    screen: DeckView
  },
  NewQuestionView: {
    screen: NewQuestionView
  },
  QuizView: {
    screen: QuizView
  }
})


export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification();
  }
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={APP_COLOR} barStyle='light-content' />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
