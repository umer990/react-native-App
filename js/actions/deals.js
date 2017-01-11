
'use strict';

import type {Action} from './types';

export const SET_DEAL_LIST = "SET_DEAL_LIST";
export const SELECTED_LASTMINUTES_TAB = "SELECTED_LASTMINUTES_TAB";
import Global from '../Global';

export function setDealList(deals):Action {
    return {
        type: SET_DEAL_LIST,
        deals: deals.lastminutes
    }
}

export function lastMinutesTabActive(active):Action {
    return {
        type: SELECTED_LASTMINUTES_TAB,
        active: active
    }
}

