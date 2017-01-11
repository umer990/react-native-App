
'use strict';

import type {Action} from './types';

export const SET_CURRENT_DEAL = "SET_CURRENT_DEAL";
import Global from '../Global';

export function setCurrentDial(deal):Action {
    return {
        type: SET_CURRENT_DEAL,
        deal: deal
    }
}


