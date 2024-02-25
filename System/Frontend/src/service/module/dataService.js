/*
 * @Description: 
 * @Author: Qing Shi
 * @Date: 2022-11-20 19:23:35
 * @LastEditTime: 2022-11-22 17:18:36
 */

import axios from 'axios';

// axios.defaults.withCredentials = true
const TEST_URL_PREFIX = 'http://43.153.168.84:8000/apis';

export function fetchHello(param, callback) {
    const url = `${TEST_URL_PREFIX}/hello/`;
    axios.post(url, param)
        .then(response => {
            callback(response.data)
        }, errResponse => {
            console.log(errResponse)
        })
}

export function uploadData(param, callback) {
    const url = `${TEST_URL_PREFIX}/upload/`;
    axios.post(url, param)
    .then(response => {
        callback(response.data);
    }, errResponse => {
        console.log(errResponse);
    })
}

export function fetchAllData(param, callback) {
    const url = `${TEST_URL_PREFIX}/fetch/`;
    axios.post(url, param)
    .then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    })
}

export async function queryRecommendation(param, callback) {
    const url = `${TEST_URL_PREFIX}/Recommendation`;
    const jsonString = JSON.stringify(param)
    const data = await axios({
        method: "post",
        url: url,
        headers: {
            "Content-Type": "application/json",
        },
        data: jsonString
    })
    return data;
    // .then(response => {
    //     callback(response);
    // }, errResponse => {
    //     console.log(errResponse)
    // })
}