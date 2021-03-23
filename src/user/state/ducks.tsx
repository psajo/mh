import produce from 'immer';
// Actions
export const SET_USER = 'user/SET_USER' as const;
export const FETCH_USER = 'user/FETCH_USER' as const;

export type UserActionType = typeof SET_USER | typeof FETCH_USER;
export type UserAction =
  | ReturnType<typeof setUserAC>
  | ReturnType<typeof fetchUserAC>;

export interface UserState {
  user: UserData | undefined;
}
const INITIAL_STATE = {
  user: undefined
};

// Reducer - immer 사용
export default function myUserReducer(
  state: UserState = INITIAL_STATE,
  action: UserAction
): UserState {
  switch (action.type) {
    case SET_USER:
      return produce(state, draft => {
        draft.user = action.payload.user;
      });
    default:
      return state;
  }
}

// Action Creators
export function setUserAC(
  user: UserData
): {
  type: 'user/SET_USER';
  payload: {
    user: UserData;
  };
} {
  return { type: SET_USER, payload: { user } };
}

export function fetchUserAC(
  name: string
): {
  type: 'user/FETCH_USER';
  payload: {
    name: string;
  };
} {
  return { type: FETCH_USER, payload: { name } };
}
