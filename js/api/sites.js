"use strict"

import Global from '../Global';

function getSites() {
    return fetch(`${Global.API_URL}/sites`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export { getSites };