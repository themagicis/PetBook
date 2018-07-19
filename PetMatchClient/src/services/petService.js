class PetService  {
    constructor(http){
        this.http = http;
    }

    add(pet){
        return this.http.doPost('pets/add', pet);
    }

    getById(id){
        return this.http.doGet('pets/get/' + id);
    }

    report(petId){
        return this.http.doPost('pets/report', { petId });
    }

    getByCategory(categoryId){
        return this.http.doGet('pub/pets/category/' + categoryId);
    }

    getTop(){
        return this.http.doGet('pub/pets/getTop/');
    }
}

export default PetService;