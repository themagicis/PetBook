class AdminService {
    constructor(http){
        this.http = http;
    }

    getReports(){
        return this.http.doGet('admin/getReports');
    }

    getUsers(){
        return this.http.doGet('admin/getUsers');
    }

    getPets(){
        return this.http.doGet('admin/getPets');
    }
}

export default AdminService