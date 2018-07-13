import {doPost} from './requestHelper'

let authService = {
    login(email, password){
        return doPost('auth/login', {email, password});
    }
}

export default authService;