"use strict"

import Global from '../Global';

function getFBLike(options){
    return fetch(`${Global.API_URL}/user/likes?token=${options.apiToken}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            model: options.model,
            id: options.id,
            token: options.apiToken,
        })
    })
}

function setFBLike(options){
    return fetch(`${Global.API_URL}/user/like?token=${options.apiToken}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            model: options.model,
            id: options.id,
            token: options.apiToken,
        })
    })
}

function setFBShare(options){
    return fetch(`${Global.API_URL}/user/share?token=${options.apiToken}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({
            model: options.model,
            id: options.id,
            share: options.fbPostId,
            token: options.apiToken,
        })
    })
}

export { getFBLike, setFBLike, setFBShare };