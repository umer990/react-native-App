
'use strict';

import type {Action} from '../actions/types';
import { SET_DESTINATION } from '../actions/destination';

export type State = {
    destination: Object
}

const initialState = {
    destination: null
};

export default function (state:State = initialState, action:Action): State {

    if (action.type === SET_DESTINATION) {
        return action.destination;
    }

    return state;
}

