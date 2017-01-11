
'use strict';

import type {Action} from '../actions/types';
import { SET_TAB_BAR } from '../actions/tabBar';

export type State = {
    tabBar: object
}

const initialState = {
    tabBar: {
        name: "LastMinuteTabBar",
        initialPage: 3
    }
};

export default function (state:State = initialState, action:Action): State {
    if (action.type === SET_TAB_BAR) {
        return action.tabBar;
    }

    return state;
}

