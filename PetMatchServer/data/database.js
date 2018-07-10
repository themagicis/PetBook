const fs = require("fs")

const dbFile = "db\\pets.db"

var db = {
    users: [],
    pets: [],
    messages: []
}

// class User {
    // id
//     name;
//     email;
//     password;
//     picture;
// }

// class Pet {
//     id
//     ownerId
//     name;
//     kind;
//     breed;
//     sex;
//     birthDate;
//     pictures;
// }

module.exports = {
    addUser: (user) => {
        const id = db.users.length + 1
        user.id = id
        db.users.push(user)
    },
    getUser: (id) => {
        return db.users.find(u => u.id === id)
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
    addMessage: (msg) =>{
        const id = db.messages.length + 1
        msg.id = id
        db.messages.push(msg)
    },
    getPetMessages: (id) => {
        return db.pets.find(p => p.id === id)
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
                return console.error(err);
            }
            db = JSON.parse(data.toString());
        });
    }

}
 
 