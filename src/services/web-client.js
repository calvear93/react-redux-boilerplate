import axios from 'axios';
import mime from 'mime-types';
import HttpMethod from '../constants/http-methods';

// axios instance pre-configured.
const request = axios.create({
    baseURL: process.env.REACT_APP_WEB_API_HOST,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept'
    },
    responseType: mime.lookup('json'),
    responseEncoding: 'utf8'
});

export default {
    // demo service.
    Demo: {
        /**
         * Returns users list.
         *
         * @returns {any} users list.
         */
        Users()
        {
            return request({
                url: '/api/users',
                method: HttpMethod.GET
            });
        }
    }
};