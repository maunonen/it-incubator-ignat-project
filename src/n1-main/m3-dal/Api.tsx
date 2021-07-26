import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'dfa3df07-6fe1-42ec-85cb-0092d073f5e2'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

// api
export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<any>('todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<any>('todo-lists', {title: title});
        return promise;
    }
}
 captcha: true
// }






