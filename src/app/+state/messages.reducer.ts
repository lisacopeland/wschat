import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import {
  UserMessage,
  mapToUserMessage,
  mapToUserMessages,
} from '../model/message.model';
import {
  UserMessageCreatedAction,
  loadUserMessagesAction,
  setUserMessagesAction,
} from './messages.actions';

export interface MessageState {
  messages: UserMessage[];
}

const initialState: MessageState = {
  messages: [],
};

export const MESSAGES_FEATURE_KEY = 'Messages';

export const messagesReducer = createReducer(
  initialState,
  on(loadUserMessagesAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),
  on(setUserMessagesAction, (state, action) => {
    console.log('setting Users action!');
    const newState = {
      ...state,
      messages: mapToUserMessages(action.payload),
    };
    return newState;
  }),
  on(UserMessageCreatedAction, (state, action) => {
    const messages = [...state.messages];
    messages.push(mapToUserMessage(action.payload.userMessage));
    const newState = { ...state, messages: messages };
    return newState;
  })
);

export const getMessagesState =
  createFeatureSelector<MessageState>(MESSAGES_FEATURE_KEY);

export const selectAll = createSelector(
  getMessagesState,
  (state: MessageState) => state
);

export const selectAllMessages = createSelector(selectAll, (state) =>
  mapToUserMessages(state.messages)
);
