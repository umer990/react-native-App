
'use strict';

export type Action =
    { type: 'SET_CURRENT_DEAL', deal: object }
    | { type: 'SET_DEAL_LIST', deals: array }
    | { type: 'SET_DESTINATIONS', destinations: array }
    | { type: 'SET_DESTINATION', destination: object }
    | { type: 'SET_CATEGORIES', categories: array }
    | { type: 'SET_FILTER_MAP', filter: object }
    | { type: 'SET_FB_PROFILE', filter: object }
    | { type: 'SET_TAB_BAR', tabBar: object }
    | { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'SELECTED_LASTMINUTES_TAB', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}

export type Dispatch = (action:Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any;
export type PromiseAction = Promise<Action>;