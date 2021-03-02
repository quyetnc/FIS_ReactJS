import axios from 'axios';
import config from '../config';

export async function apiCall(method, path, data){
    try {
        return (await axios[method](path, data)).data;
    } catch(err) {
        throw err.response.data.errorMsg;
    }
}

export default {
    condition: {
        getTodayCheckin: () => `${config.IPLOCAL}/api/dashboard/get_checkin_by_condition`,
        getUserByCheckinDate: (checkinDate) => `${config.IPLOCAL}/api/dashboard/get_checkin_by_condition?checkinTime=${checkinDate}`,
        getByCondition: (email, checkinDate) => `${config.IPLOCAL}/api/dashboard/get_checkin_by_condition?manager_approver_email=${email}&checkinTime=${checkinDate}`
    },
    etms: {
        getClaimReport: () => `${config.IPLOCAL}/api/dashboard/get_claim`
    }
}