import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, combineReducers, composeWithDevTools, getGameData,
} from './exports';
import { GameData } from './types';

enum KeyWords{
  TRAINS = 'TRAIN',
  PLAY = 'PLAY',
  TRAIN_MODE = 'TRAIN_MODE',
  PLAY_MODE = 'PLAY_MODE',
  CHANGE = 'CHANGE',
  CLEAR = 'CLEAR',
  PERCENT = 'percent',
  CATEGORY = 'category',
}

export function changeCategory(payload: number): { type: string, payload: number } {
  return {
    type: KeyWords.CATEGORY,
    payload,
  };
}

export function changeGameData(payload: GameData): { type: string, payload: GameData } {
  return {
    type: KeyWords.CHANGE,
    payload,
  };
}

export function trainView(): { type: string } {
  return {
    type: KeyWords.TRAINS,
  };
}

export function playView(): { type: string } {
  return {
    type: KeyWords.PLAY,
  };
}

export function trainMode(): { type: string } {
  return {
    type: KeyWords.TRAIN_MODE,
  };
}

export function playMode(): { type: string } {
  return {
    type: KeyWords.PLAY_MODE,
  };
}

function currentCategory(state = 0, action: { type: string, payload: number }):number {
  if (action.type === KeyWords.CATEGORY) {
    const newState = action.payload;
    return newState;
  }
  return state;
}

function incrementReducer(state = { categories: [], cards: [] }, action: { type: string, payload: GameData }):GameData {
  if (action.type === KeyWords.CHANGE) {
    const newState = action.payload;
    return newState;
  }
  return state;
}

function switchReducer(state = false, action = { type: KeyWords.TRAINS }): boolean {
  if (action.type === KeyWords.TRAINS) {
    return false;
  } if (action.type === KeyWords.PLAY) {
    return true;
  }

  return state;
}

function modeReducer(state = false, action = { type: KeyWords.TRAIN_MODE }): boolean {
  if (action.type === KeyWords.TRAIN_MODE) {
    return false;
  } if (action.type === KeyWords.PLAY_MODE) {
    return true;
  }

  return state;
}

export const rootReducer = combineReducers({
  view: switchReducer,
  mode: modeReducer,
  result: incrementReducer,
  category: currentCategory,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const fetchData = async (): Promise<void> => {
  const data = await getGameData();
  store.dispatch(changeGameData(data));
};

store.dispatch({ type: 'INIT' });

fetchData();
