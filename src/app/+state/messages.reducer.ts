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
  userMessageCreatedAction,
  loadUserMessagesAction,
  setUserMessagesAction,
  setMessagesErrorAction,
} from './messages.actions';

export interface MessageState {
  messages: UserMessage[];
  messagesError: string;
}

const initialState: MessageState = {
  messages: [],
  messagesError: null
};

export const MESSAGES_FEATURE_KEY = 'messages';

export const messagesReducer = createReducer(
  initialState,
  on(loadUserMessagesAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),
  on(setUserMessagesAction, (state, action) => {
    const newState = {
      ...state,
      messages: mapToUserMessages(action.payload),
      messagesError: null
    };
    return newState;
  }),
  on(setMessagesErrorAction, (state, action) => {
    const newState = {
      ...state,
      messagesError: action.payload.error
    };
    return newState;
  }),
  on(userMessageCreatedAction, (state, action) => {
    const messages = [...state.messages];
    messages.push(mapToUserMessage(action.payload.userMessage));
    const newState = { ...state, messages: messages, messagesError: null };
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
  (state.messages !== null && state.messages.length > 0) ? mapToUserMessages(state.messages) : []
);
export const selectMessagesError = createSelector(
  selectAll,
  (state) => state.messagesError
);
