import axios from "axios";

const clientHttp = axios.create({
    baseURL: 'http://localhost:8120/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


export default clientHttp;