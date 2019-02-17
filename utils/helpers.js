import React from 'react';
import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem('DECKS')
    console.log('Value is ',value);
  } catch (error) {
    console.log(error);
  }
  
}

createDeck = () => {

}

addCard = () => {

}

