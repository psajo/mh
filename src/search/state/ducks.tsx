import produce from 'immer';
// Actions
export const SET_KEYWORD = 'search/SET_KEYWORD';
export const SET_AUTOCOMPLETES = 'search/SET_AUTOCOMPLETES';
export const FETCH_AUTOCOMPLETES = 'search/FETCH_AUTOCOMPLETES';

export type SearchAction =
  | ReturnType<typeof setKeywordAC>
  | ReturnType<typeof setAutoCompletesAC>
  | ReturnType<typeof fetchAutoCompletesAC>;
const INITIAL_STATE: SearchState = {
  keyword: '',
  autoCompletes: []
};
export interface SearchState {
  keyword?: string;
  autoCompletes?: UserData[];
}

// Reducer - immer 사용
export default function mySearchReducer(
  state = INITIAL_STATE,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case SET_KEYWORD: // 키워드 저장
      return produce(state, draft => {
        draft.keyword = action.payload.keyword;
      });
    case SET_AUTOCOMPLETES: // 자동완성 저장
      return produce(state, draft => {
        draft.autoCompletes = action.payload.autoCompletes;
      });
    default:
      return state;
  }
}

// Action Creators
export function setKeywordAC(
  keyword: string
): {
  type: typeof SET_KEYWORD;
  payload: {
    keyword: string;
  };
} {
  return { type: SET_KEYWORD, payload: { keyword } };
}

export function setAutoCompletesAC(
  autoCompletes: Array<UserData>
): {
  type: typeof SET_AUTOCOMPLETES;
  payload: {
    autoCompletes: UserData[];
  };
} {
  return { type: SET_AUTOCOMPLETES, payload: { autoCompletes } };
}

export function fetchAutoCompletesAC(
  keyword: string
): {
  type: typeof FETCH_AUTOCOMPLETES;
  payload: {
    keyword: string;
  };
} {
  return { type: FETCH_AUTOCOMPLETES, payload: { keyword } };
}
