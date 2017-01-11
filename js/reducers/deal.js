
'use strict';

import type {Action} from '../actions/types';
import { SET_DEAL_LIST, SET_CURRENT_DEAL } from '../actions/deal';

export type State = {
    deal: Object
}

const initialState = {
    deal: null
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_CURRENT_DEAL) {
        return action.deal;
    }

    return state;
}

