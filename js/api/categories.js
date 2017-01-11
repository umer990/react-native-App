"use strict"

import Global from '../Global';

function getListCategories(){
    return fetch(`${Global.API_URL}/geo/filter/categories`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export { getListCategories };