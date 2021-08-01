

export type UserProfileType = {
    _id:string;
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: string,
    update: string,
    isAdmin: boolean,
    verified:boolean,
    rememberMe:boolean,
    error: string
}

const initState:UserProfileType = {_id:"", email: "", name: "", avatar: "", publicCardPacksCount: 0, created:"",
                                   update:"", isAdmin:false, verified:false, rememberMe:false, error:""};

export const profileReducer = (state = initState, action: profileACType): UserProfileType => {
    switch (action.type) {
        case "ADD-PROFILE": {
            return {...state, ...action.value};
        }
        default:
            return state;
    }
};

export type profileACType = {
    type: 'ADD-PROFILE'
    value: UserProfileType
}


export const profileAC = (value: UserProfileType): profileACType => ({type: "ADD-PROFILE", value});


