import axios from 'axios'

const settings = {
    withCredentials: true,
    // headers: {
    //     'API-KEY': 'dfa3df07-6fe1-42ec-85cb-0092d073f5e2'
    // }
}
const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
})

// api

export type UserLoginType = {
    _id: string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number
}

export type UserForgotPassType = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}
export type UserNewPasswordType = {
    info : string
}

export const acsessAPI = {
    loginUser(email: string, password: string, rememberMe: boolean) {
        try {
            const promise = instance.post<UserLoginType>("/auth/login", {email, password, rememberMe});
            return promise
        } catch (e) {
            const error = e.response ?
                e.response.data.error :
                (e.message + ', more details in the console');
        }
    },
    forgotPassword(email: string, from: string, message: string) {
        return instance.post<UserForgotPassType>("/auth/forgot", {email, from, message});
    },
    setNewPassword(password : string , resetPasswordToken : string) {
        return instance.post<UserNewPasswordType>("/auth/set-new-password" , {password, resetPasswordToken});
    },
}






