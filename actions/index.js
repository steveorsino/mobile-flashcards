export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK'
export const CREATE_DECK = 'CREATE_DECK';
export const ADD_CARD = 'ADD_CARD';

export const getDecks = () => {
  return {
    type: GET_DECKS
  }
}

export const createDeck = (deckTitle) => {
  return {
    type: CREATE_DECK,
    deckTitle,
  }
}

export const addCard = (title, card) => {
  return {
    
  }
}
