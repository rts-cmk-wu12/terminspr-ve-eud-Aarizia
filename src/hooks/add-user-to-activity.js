'use client';

import { useEffect, useState } from "react";

export default function addUserToActivity(access_token, userId, activityId) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    //const [loading, setLoading] = useState(null);
    
    useEffect(() => {
        const BASE_API_URL = 'http://localhost:4000/api/v1/';
        
        if (!access_token || !userId || !activityId) {
            setError(new Error('access token or id is missing'));
            return;
        }
        const endpoint = `users/${userId}/activities/${activityId}`
    
    
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }

        fetch(BASE_API_URL + endpoint + id, options)
        .then(function(response) {
            if (!response.ok) throw new Error('endpoint not found');
            return response.json();
        })
        .then(function(data) {
            if (!data) throw new Error('data is falsy')
            setData(data);
        })
        .catch(function(error) {
            setError(error);
        })
        //.finally(function() {
          //  setLoading(false);
        //});

    }, [access_token, userId, activityId]);

    return { data, error, /* loading  */}
    
}