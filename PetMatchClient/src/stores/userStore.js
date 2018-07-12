import { observable, computed, action } from "mobx"

let defaultInfo = {
    id: 0,
    token: '',
    name: '',
    picture: '',
    roles: [],
}

class UserStore {
    static key = '__user__';
    constructor(){
        var info = localStorage.getItem(UserStore.key);
        if (info){
            this.setInfo(JSON.parse(info));
        } else{
            this.setInfo(defaultInfo);
        }
    }

    @action setInfo = info => {
        Object.assign(this.info, info);
        localStorage.setItem(UserStore.key, JSON.stringify(info));
    }

    @action clearInfo = () => {
        Object.assign(this.info, defaultInfo);
        localStorage.removeItem(UserStore.key);
    }

    @observable info = {
        id: 0,
        token: '',
        name: '',
        picture: '',
        roles: [],
        pets: [
            { id:1, picture:'http://myhswm.org/images/sized/images/animals/_DSC8112-256x256.JPG' },
            { id:2, picture:'http://myhswm.org/images/sized/images/animals/Henry_papillion-256x256.png' },
            { id:3, picture:'http://myhswm.org/images/sized/images/animals/Smith_New_Profile_Picture_-256x256.JPG' },
            { id:4, picture:'http://myhswm.org/images/sized/images/animals/Jace-256x256.jpg' },
            { id:5, picture:'http://myhswm.org/images/sized/images/animals/Ryanb-256x256.jpg' }
        ]
    };

    @computed get hasPets() {
        return this.info.pets.length > 0;
    }

    @computed get isAuthenticated() {
        return this.info.id !== 0;
    }
}

export default UserStore;