export const Urls = {
    API: "http://localhost:5000/"
}

export const PetTypes = [
    {   id: 1, 
        name: "Cat", 
        breeds: [
            {id: 1, name: "British Shorthair"},
            {id: 2, name: "Persian"},
            {id: 3, name: "Siamese"}
        ]
    },
    { 
        id: 2, 
        name: "Dog",
        breeds: [
            {id: 1, name: "Labrador Retriever"},
            {id: 2, name: "Bulldog"},
            {id: 3, name: "German Shepherd"}
        ]
     },
    { id: 3, name: "Aquatic", breeds: [] },
    { id: 4, name: "Rodent", breeds: [] },
    { id: 5, name: "Bird", breeds: [] },
    { id: 6, name: "Lizard", breeds: [] },
    { id: 7, name: "Arthropod", breeds: [] },
    { id: 8, name: "Other", breeds: [] },
]