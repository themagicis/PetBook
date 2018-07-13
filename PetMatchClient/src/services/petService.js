import {doPost} from './requestHelper'

let petService = {
    add(pet){
        return doPost('pets/add', pet);
    }
}

export default petService;