import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.response.use(
    (res) => {
    if (res.status === 200) {
        return res.data;
    }
    return res;
    },
    (error) => {
    const status = error.response ?? 401;
    switch (status) {
        case 401:
        case 403:
    break;
        default:
        break;
    }
    console.log(
        `${error?.response?.status ?? 0} ${error?.response?.statusText ?? ""}`
    );
    return Promise.reject(error);
    }
);

export function sendEmail({email}) {
    const params = new URLSearchParams();
    params.append('email',email);
    return axios.get('/auth/send-email-register',{params});
}

export function checkExistedEmail({email}){
    const params = new URLSearchParams();
    params.append('email',email);
    return  axios.get('/auth/existed-email',{params});
}

export function register({Username,Password,Displayname,token}){
    
    return axios.post(`/auth/register?token=${token}`,{
        "username": Username,
        "password": Password,
        "displayname": Displayname
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
}