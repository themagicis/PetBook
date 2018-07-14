import {doGet} from './requestHelper'

let adminService = {
    getReports(){
        return doGet('admin/getReports');
    },
}

export default adminService;