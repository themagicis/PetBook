import { observable, computed } from "mobx"

class UserStore {
    @observable info = {
        id: 0,
        name: '',
        picture: '',
        roles: []
    };
    @computed get isAuthenticated() {
        return this.info.id !== 0;
    }
}