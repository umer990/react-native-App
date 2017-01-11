
'use strict';

import type {Action} from './types';

export const SET_DESTINATIONS = "SET_DESTINATIONS";
import Global from '../Global';

export function setDestinations(destinations):Action {
    return {
        type: SET_DESTINATIONS,
        destinations: destinations
    }
}


