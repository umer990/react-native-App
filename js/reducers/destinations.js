
'use strict';

import type {Action} from '../actions/types';
import { SET_DESTINATIONS } from '../actions/destinations';

export type State = {
    destinations: Array
}

const initialState = {
    destinations: null
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === SET_DESTINATIONS) {
        return action.destinations;
    }

    return state;
}

