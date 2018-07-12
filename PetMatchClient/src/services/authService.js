import { Urls } from '../config'

let authService = {
    login(email, password){
        return doPost('auth/login', {email, password});
    }
}

function doPost(url, data){
    return fetch(Urls.API + url, {
        method: "POST", 
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.error(`Fetch Error =\n`, error)); 
}

export default authService;