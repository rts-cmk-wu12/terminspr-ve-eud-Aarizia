'use client';

import { useEffect, useState } from "react";

export default function removeUserFromActivity(access_token, userId, activityId) {

    const [data, setData] = useState(null);
    const [userError, setError] = useState(null);
    //const [loading, setLoading] = useState(null);
    const BASE_API_URL = 'http://localhost:4000/api/v1/';
    const endpoint = `users/${userId}/activities/${activityId}`

    if (!access_token) {
        setError(new Error('access token is missing'));
        return;
    }

    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    }

    useEffect(() => {

        if (!userId || !activityId) {
            setError(new Error('id is missing'));
            return;
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