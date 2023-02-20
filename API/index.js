import http from './http.js';

export default class ApiTypes {
    async $get(url, data, config) {
        const httpClient = new http();
        const get = await httpClient.httpClient();
        return get.get(url, data, config);
    }
}