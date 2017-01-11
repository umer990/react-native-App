
'use strict';

import type {Action} from './types';

export const SET_CATEGORIES = "SET_CATEGORIES";
import Global from '../Global';

export function setCategories(categories):Action {
    return {
        type: SET_CATEGORIES,
        categories: categories
    }
}

