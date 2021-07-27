import axios from 'axios'
import {UserProfileType} from '../m2-bll/redux/profile-reducer';

const settings = {
    withCredentials: true
};
const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/',
    ...settings
});

// api

export const acsessAPI = {
    loginUser(email:string, password:string, rememberMe:boolean) {
        try{
        const promise = instance.post<UserProfileType>("/auth/login",{email, password, rememberMe});
        return promise
        }
        catch(e) {
            const error=e.response ?
                e.response.data.error:
                (e.message + ', more details in the console');
        }
    }

}






