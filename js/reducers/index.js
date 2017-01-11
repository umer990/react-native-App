
'use strict';

import { combineReducers } from 'redux';

import drawer from './drawer';
import route from './route';
import user from './user';
import deal from './deal';
import deals from './deals';
import destinations from './destinations';
import destination from './destination';
import categories from './categories';
import filterMap from './filterMap'
import tabBar from './tabBar';

export default combineReducers({
	deal,
 	deals,
	destination,
	destinations,
	categories,
	filterMap,
	tabBar,
 	drawer,
 	route,
	user,
})
