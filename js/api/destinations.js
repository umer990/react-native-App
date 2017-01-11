"use strict"

import Global from '../Global';

function getDestinations(options){
    let category = options.category || null;
    let text = options.text || null;
    let longMin = options.coordinates.longMin || "-164.640625";
    let longMax = options.coordinates.longMax || "169.453125";
    let latMin = options.coordinates.latMin || "-58.07787626787517";
    let latMax = options.coordinates.latMax || "80.923186";

    //let longMin = "-166.640625";
    //let longMax = "169.453125";
    //let latMin = "-58.07787626787517";
    //let latMax = "81.923186";


    return fetch(`${Global.API_URL}/geo`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            token: options.apiToken,
            type: category,
            name: text,
            longMin: longMin,
            longMax: longMax,
            latMin: latMin,
            latMax: latMax,
        })
    })
}

function getDestination(apiPath){
    return fetch(`${Global.API_URL}${apiPath}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export { getDestinations, getDestination };