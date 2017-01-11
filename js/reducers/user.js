
'use strict';

import type {Action} from '../actions/types';
import { SET_FB_PROFILE } from '../actions/user';

export type State = {
    user: Object
}

const initialState = {
    fbProfile: {
        apiTokenExpiration: null
    }
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_FB_PROFILE) {
        return action.user;
    }

    return state;
}

