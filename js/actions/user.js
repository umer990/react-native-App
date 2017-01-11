
'use strict';

import type {Action} from './types';

export const SET_FB_PROFILE = "SET_FB_PROFILE";
import Global from '../Global';

export function setFbProfile(profile):Action {
    return {
        type: SET_FB_PROFILE,
        user:  {
            fbProfile: profile
        }
    }
}


