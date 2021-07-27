import axios from 'axios'

const settings = {
    withCredentials: true,
    // headers: {
    //     'API-KEY': 'dfa3df07-6fe1-42ec-85cb-0092d073f5e2'
    // }
}
const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/',
    ...settings
})

// api

export type UserLoginType = {
    _id:string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number
}

type registrationUserType = {
    addedUser: {}
    error?: string
}

export const acsessAPI = {
    loginUser(email:string, password:string, rememberMe:boolean) {
        try{
        const promise = instance.post<UserLoginType>("/auth/login",{email, password, rememberMe});
        return promise
        }
        catch(e) {
            const error=e.response ?
                e.response.data.error:
                (e.message + ', more details in the console');
        }
    },
    registrationUser(email: string, password: string) {
        const promise = instance.post<registrationUserType>("/auth/register", {email, password})
        return promise
    }

}






