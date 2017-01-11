
'use strict';
import { AsyncStorage } from 'react-native';
import Global from '../Global';

function warn(error) {
    throw error; // To let the caller handle the rejection
}

module.exports = store => next => action => {
    let state = store.getState();

    let fbProfile = state.user.fbProfile;

    if (fbProfile.apiTokenExpiration) {
        let currentDate = new Date();
        let date = new Date(fbProfile.apiTokenExpiration * 1000);
        let expirationDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);

        if (expirationDate > currentDate) {
            console.log(`\r-----------------\r\r Auth token don't expiration \r\r-----------------\r`);
            next(action);
        } else {
            fetch(Global.API_URL + '/auth/facebook/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    facebook_id: fbProfile.fbUserId,
                    facebook_token: fbProfile.fbToken,
                    email: fbProfile.email,
                    name: fbProfile.name
                })
            })
            .then((response) => response.json())
            .then((apiData) => {
                if (apiData.status_code == 422) {
                    console.log('\r-----------------\r\r Auth token refresh failed \r\r-----------------\r', apiData.errors[0][0]);
                }
                else {
                    console.log('\r-----------------\r\r Auth token refresh \r\r-----------------\r');
                    AsyncStorage.setItem(Global.API_TOKEN, apiData.token);
                    next(action);
                }
            })
            .done();

        }
    } else {
        next(action);
    }
}
