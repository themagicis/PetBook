import {doPost} from './requestHelper'

let authService = {
    login(email, password){
        return doPost('auth/login', {email, password});
    },
    register(name, email, password, picture){
        return doPost('auth/signup', {name, email, password, picture});
    }
}

export default authService;