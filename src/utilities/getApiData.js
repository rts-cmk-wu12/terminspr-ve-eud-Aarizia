async function getApiData(endpoint, searchParams = {}) {

    const BASE_API_URL = 'http:/localhost:4000/api/v1/';
    const options = {
        'method': 'GET'
    }
    const API_URL = new URL(endpoint, BASE_API_URL);
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

const getActivities = () => getApiData('activities');

export {
    getActivities,
}