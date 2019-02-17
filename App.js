import React from 'react';
import { StyleSheet, StatusBar, View, Text, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { APP_COLOR } from './utils/colors'
import { Constants } from 'expo'
import DeckListView from './components/DeckListView'

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
      tabBarLabel: 'History',
      //tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
  AddEntry: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      //tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  Live: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Live',
      //tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor}/>
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
  }
})


export default class App extends React.Component {
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
