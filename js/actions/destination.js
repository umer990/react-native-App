
'use strict';

import type {Action} from './types';

export const SET_DESTINATION = "SET_DESTINATION";
import Global from '../Global';

export function setDestination(destination):Action {

    return {
        type: SET_DESTINATION,
        destination: destination
    }
}
