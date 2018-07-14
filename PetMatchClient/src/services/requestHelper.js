import { Urls } from '../config'

export function doPost(url, data){
    var token = (window.UserStore.getInfo() || {}).token;

    return fetch(Urls.API + url, {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.error(`Fetch Error =\n`, error)); 
}

export function doGet(url){
    var token = (window.UserStore.getInfo() || {}).token;
    return fetch(Urls.API + url, {
        method: "GET", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json())
    .catch(error => console.error(`Fetch Error =\n`, error)); 
}
