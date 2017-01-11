
'use strict';

import type {Action} from './types';

export const SET_TAB_BAR = "SET_TAB_BAR";
import Global from '../Global';

export function setTabBar(tabBar, initialPage=0):Action {
    return {
        type: SET_TAB_BAR,
        tabBar: {
            name: tabBar,
            initialPage: initialPage
        }
    }
}


