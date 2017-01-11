
'use strict';

import type {Action} from '../actions/types';
import { SET_DEAL_LIST } from '../actions/deals';
import { SELECTED_LASTMINUTES_TAB } from '../actions/deals';

export type State = {
    deals: Array
}

const initialState = {
    deals: null,
    isTabActive: true,
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_DEAL_LIST) {
        return {
            ...state,
            deals: action.deals
        };
    }

    if (action.type === SELECTED_LASTMINUTES_TAB) {
        return {
            ...state,
            isTabActive: action.active
        }
    }

    return state;
}

