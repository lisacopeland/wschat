import { createAction, props } from '@ngrx/store';
import { UserMessage } from '../model/message.model';

// TODO: Implement an error popup

export const loadUserMessagesAction = createAction(
  'UserMessages: Load All',
  props<{ payload: {}}>()
);
export const setUserMessagesAction = createAction(
  'UserMessages: Set All',
  props<{ payload: UserMessage[] }>()
);

export const createUserMessageAction = createAction(
  'UserMessages: Create',
  props<{ payload: UserMessage }>()
);
export const userMessageCreatedAction = createAction(
  'UserMessages: Created',
  props<{ payload: { userMessage: UserMessage } }>()
);
export const setMessagesErrorAction = createAction(
  'UserMessages: Messages Error',
  props<{ payload: { error: string } }>()
);


