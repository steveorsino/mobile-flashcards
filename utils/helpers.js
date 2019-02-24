import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards:Notifications'

export async function getDecks() {
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    const objDecks = JSON.parse(decks)
    if (objDecks)
      return objDecks;
    else
      return {}
  } catch {
    console.log('error')
  }
}

export async function getDeck(id) {
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    const objDecks = JSON.parse(decks)
    return objDecks[id];
  } catch {
    console.log('error')  
  }
}

export async function createDeck (title)  {
  const newDeck = {
    [title] : {
      title: title,
      questions : []
    }
  }
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    
    const curDecks = JSON.parse(decks)
    const allDecks = {
      ...curDecks,
      ...newDeck
    }
    return AsyncStorage.setItem('DECKS', JSON.stringify(allDecks))
  } catch {
    console.log('create deck error') 
  }
  
}

export async function addCard (title, card) {
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    const objDecks = JSON.parse(decks)
    objDecks[title].questions.push(card)
    return AsyncStorage.setItem('DECKS', JSON.stringify(objDecks))
  } catch {
    console.log('error') 
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Study your flash cards',
    body: 'Don\'t forget to study your flash cards today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

