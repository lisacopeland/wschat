import { createAction, props } from '@ngrx/store';
import { UserMessage } from '../model/message.model';

// TODO: Implement an error popup

export const loadUserMessagesAction = createAction(
  'UserMessages: Load All',
  props<{ search: Partial<UserMessage>; index: string }>()
);
export const setUserMessagesAction = createAction(
  'UserMessages: Set All',
  props<{ payload: UserMessage[] }>()
);

export const createUserMessageAction = createAction(
  'UserMessages: Create',
  props<{ payload: UserMessage }>()
);
export const UserMessageCreatedAction = createAction(
  'UserMessages: Created',
  props<{ payload: { userMessage: UserMessage } }>()
);


