"use strict"

import Global from '../Global';

function getLastMinutes(siteId) {
    return fetch(`${Global.API_URL}/adventure/lastminutes/${siteId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

function getLastMinute(id) {
    return fetch(`${Global.API_URL}/adventure/lastminute/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

function lastMinuteReservation(options) {
    return fetch(`${Global.API_URL}/user/booking?token=${options.apiToken}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            model: options.model,
            id: options.id,
        })
    })
}

export {
    getLastMinutes,
    getLastMinute,
    lastMinuteReservation,
};