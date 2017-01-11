
'use strict';

import { createStore, applyMiddleware, compose } from 'redux'
import devTools from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import promise from './middlewares/promise';
import authToken from './middlewares/authToken';

export default function configureStore(onCompletion:()=>void):any {
	const enhancer = compose(
		applyMiddleware(promise, authToken),
		devTools({
	     	name: 'GolfSkiWorld', realtime: true
	    })
	);
	
	let store = createStore(reducer, enhancer);
	persistStore(store, {storage: AsyncStorage}, onCompletion);
	
	return store;
}
