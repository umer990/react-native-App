
'use strict';

import type {Action} from '../actions/types';
import { SET_CATEGORIES } from '../actions/categories';

export type State = {
    categories: Array
}

const initialState = {
    categories: null
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_CATEGORIES) {
        return action.categories;
    }

    return state;
}

