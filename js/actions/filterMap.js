
'use strict';

import type {Action} from './types';

export const SET_FILTER_MAP = "SET_FILTER_MAP";
import Global from '../Global';

export function setFilterMap(filter):Action {
   return {
        type: SET_FILTER_MAP,
        filterMap: filter
    }
}

