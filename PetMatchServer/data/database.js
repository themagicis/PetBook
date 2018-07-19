const fs = require("fs")

const dbFile = "db\\pets.db"

var db = {
    users: [],
    pets: [],
    messages: [],
    reports: [],
    roles: ['Admin']
}

module.exports = {
    addUser: (user) => {
        const id = db.users.length + 1
        user.id = id
        db.users.push(user)
    },
    getUserById: (id) => {
        return db.users.find(u => u.id === id)
    },
    getUserByEmail: (email) => {
        return db.users.find(u => u.email === email)
    },
    getAllUsers: () =>{
        return db.users;
    },
    addPet: (pet) => {
        const id = db.pets.length + 1
        pet.id = id
        db.pets.push(pet)
    },
    getPet: (id) => {
        return db.pets.find(p => p.id === id)
    },
    getPets: (userId) =>{
        return db.pets.filter(p => p.ownerId === userId)
    },
    getPetsByKind: (kindId) =>{
        return db.pets.filter(p => p.kind === kindId)
    },
    getAllPets: () =>{
        return db.pets;
    },
    addMessage: (msg) =>{
        const id = db.messages.length + 1
        msg.id = id
        db.messages.push(msg)
    },
    getPetMessages: (id) => {
        return db.pets.find(p => p.id === id)
    },
    addReport: (report) => {
        const id = db.reports.length + 1
        report.id = id
        db.reports.push(report)
    },
    getReports: () =>{
        return db.reports;
    },
    getTopPets: () =>{
        return db.pets.sort((a, b) => a.id > b.id).slice(0, 5);
    },
    saveChanges: () => {
        var data = JSON.stringify(db);
        fs.writeFile(dbFile, data, (err) =>{
            if (err) {
                return console.error(err);
            }
        });
    },
    init: () => {
        fs.readFile(dbFile, (err, data) => {
            if (err) {
                var data = JSON.stringify(db);
                fs.writeFile(dbFile, data, (err) =>{});
            }
            db = JSON.parse(data.toString());
        });
    }

}
 
 