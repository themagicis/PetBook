import {doPost,doGet} from './requestHelper'

let petService = {
    add(pet){
        return doPost('pets/add', pet);
    },
    getById(id){
        return doGet('pets/get/' + id);
    },
    getByCategory(categoryId){
        return doGet('pub/pets/category/' + categoryId);
    },
    report(petId){
        return doPost('pets/report', { petId });
    },
    getTop(){
        return doGet('pub/pets/getTop/');
    }
}

export default petService;