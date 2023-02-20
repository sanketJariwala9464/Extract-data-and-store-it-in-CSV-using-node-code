import axios from "axios";

export default class API {
    async httpClient () {
        return axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com',
        });
    }

}