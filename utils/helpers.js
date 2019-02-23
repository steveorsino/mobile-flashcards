import React from 'react';
import { AsyncStorage } from 'react-native';

export async function getDecks() {
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    const objDecks = JSON.parse(decks)
    return objDecks;
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

export const createDeck = (title) => {
  const newDeck = {
    [title] : {
      title: title,
      questions : []
    }
  }
  let decks = ''
  AsyncStorage.getItem('DECKS')
  .then((value) => {
    console.log('get Item',value)
    decks = value
    console.log('get Item',decks)
    const curDecks = JSON.parse(value);
    const allDecks = {
      ...curDecks,
      ...newDeck
    }
    console.log('allDecks',allDecks)
    AsyncStorage.setItem('DECKS', JSON.stringify(allDecks))
    .then(() => {
      AsyncStorage.getItem('DECKS')
      .then((value) => console.log('DECKS: ', value))
    })
  })
}

export async function addCard (title, card) {
  try {
    const decks = await AsyncStorage.getItem('DECKS')
    const objDecks = JSON.parse(decks)
    objDecks[title].questions.push(card)
    console.log('after pushed question: ', objDecks)
    return AsyncStorage.setItem('DECKS', JSON.stringify(objDecks))
  } catch {
    console.log('error') 
  }
}

