import axios from "axios";
import validator from "validator";

axios.defaults.baseURL = 'http://localhost:3000/api';

// axios.interceptors.response.use(
//     (res) => {
//     if (res.status === 200) {
//         return res.data;
//     }
//     return res;
//     },
//     (error) => {
//         return error;
//     }
// );

const axiosCookie = axios.create({
    withCredentials: true
 })

export async function sendEmail ({email}) {
    const params = new URLSearchParams();
    params.append('email',email);
    return await axios.get('/auth/send-email-register',{params});
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
    }
    );
}

export function checkToken(token,used_to){
    return axios.get(`/auth/check-token?token=${token}&used_to=${used_to}`);  
}

export function login({loginCred,password}){
    if(validator.isEmail(loginCred)){
        return axiosCookie.post('/auth/login/client',{
            email: loginCred,
            password
        })
    }
    return axiosCookie.post('/auth/login/client',{
        username: loginCred,
        password
    })
}

export function getUser() {
    return axiosCookie.get('/auth/me');
}

export function logout() {
    return axiosCookie.post('/auth/logout');
}

export function sendEmailResetPassword(email){
    return axios.get(`/auth/send-email-reset-password?email=${email}`)
}

export function resetPassword(token,password){
    return axios.post(`/auth/reset-password?token=${token}`,{
        "password": password
    })
}