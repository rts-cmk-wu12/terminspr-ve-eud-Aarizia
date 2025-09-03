const { cookies } = require("next/headers");

const BASE_API_URL = 'http:/localhost:4000/api/v1/';

async function getApiData(endpoint, searchParams = {}) {

    const API_URL = new URL(endpoint, BASE_API_URL);
    const options = {
        'method': 'GET'
    }
    //Object.keys(searchParams).forEach(key => API_URL.searchParams.append(key, searchParams[key]));

    try {
        const response = await fetch(API_URL, options);
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('response status: ', response);
            return false;
        }
    } catch(error) {
        console.error(error);
        throw new Error;
    }
}

async function getUserData(endpoint, options) {

    const API_URL = new URL(endpoint, BASE_API_URL);
/*     const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    } */

    try {
        const response = await fetch(API_URL, options);

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('response status: ', response);
            return false;
        }
    } catch(error) {
        console.error(error);
        throw new Error;
    }
}

const getActivities = () => getApiData('activities');
const getSingleActivity = (id) => getApiData(`activities/${id}`);
const getCurrentUser = (id, access_token) => getUserData(`users/${id}`, { 
    method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }}
);


export {
    getActivities,
    getSingleActivity,
    getCurrentUser
}