
'use strict';

import type {Action} from '../actions/types';
import { SET_FILTER_MAP } from '../actions/filterMap';

export type State = {
    filter: Object
}

const initialState = {
    filterMap: {
        category: "",
        text: "",
        show: false,
    }
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === SET_FILTER_MAP) {
        return action.filterMap;
    }

    return state;
}

