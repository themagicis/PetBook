import AdminService from '../services/AdminService'
import AuthService from '../services/AuthService'
import PetService from '../services/PetService'

class ApiStore {
    constructor(http){
        this.admin = new AdminService(http)
        this.auth = new AuthService(http);
        this.pets = new PetService(http);
    }
}

export default ApiStore;