'use client';

import Image from 'next/image';
import './_site-header-special.scss';
import styles from '../../../../app/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeaderSpecial({ activityData, userId = null, access_token = null, userRole = null, alreadySignedUp = null, appropriateAge = null, hasOtherActivitiesSameDay = null }) {

    const router = useRouter();
    const [addUserData, setAddUserData] = useState(null);
    const [addUserError, setAddUserError] = useState(null);
    const [deleteUserError, setDeleteUserError] = useState(null);
    const BASE_API_URL = 'http://localhost:4000/api/v1/';
    //console.log(userData)

    function clickHandlerLogin() {
        router.push('/log-ind');
    }

    function clickHandlerAddUserToActivity() {
        
        if (!access_token || !userId || !activityData.id) {
            setError(new Error('access token or id is missing'));
            return;
        }

        const endpoint = `users/${userId}/activities/${activityData.id}`
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }

        fetch(BASE_API_URL + endpoint, options)
        .then(function(response) {
            if (!response.ok) throw new Error('endpoint not found');
            return response.json();
        })
        .then(function(data) {
            if (!data) throw new Error('data is falsy')
            //setAddUserData(data);
        })
        .catch(function(error) {
            setAddUserError(error);
        })
        //.finally(function() {
          //  setLoading(false);
        //});
    }


    function clickHandlerRemoveUserFromActivity() {

        if (!access_token || !userId || !activityData.id) {
            setError(new Error('access token or id is missing'));
            return;
        }

        const endpoint = `users/${userId}/activities/${activityData.id}`
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }

        fetch(BASE_API_URL + endpoint, options)
        .then(function(response) {
            if (!response.ok) throw new Error('endpoint not found');
            console.log('response delete request: ', response);
        })
    }

    return (
        <header className='site-header-special'>
            <Image 
                priority
                src={activityData?.asset?.url}
                width={411}
                height={489}
                alt='background-image'
                className='site-header-special__image'
            />
            {(!userId || !userRole || !access_token) && <button onClick={clickHandlerLogin} className={`${styles.button} site-header-special__button`}>Log ind for tilmelding</button>}
            {userId && access_token && userRole === 'default' && alreadySignedUp && <button onClick={clickHandlerRemoveUserFromActivity} className={`${styles.button} site-header-special__button`}>Forlad</button>}
            {userId && access_token && userRole === 'default' && !alreadySignedUp && appropriateAge && !hasOtherActivitiesSameDay && <button onClick={clickHandlerAddUserToActivity} className={`${styles.button} site-header-special__button`}>Tilmeld</button>}
            {userId && access_token && userRole !== 'default' && (
                <>
                    <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                    <Link href='/log-ind'>Log ind som bruger for tilmelding</Link>
                </>
            )}
            {userId && access_token && userRole === 'default' && !appropriateAge && (
                <>
                    <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                    <p>Du møder ikke alderskriterierne for denne aktivitet</p>
                </>
            )}
{/*             {userId && access_token && userRole === 'default' && appropriateAge && hasOtherActivitiesSameDay && (
                <>
                    <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                    <p>Du har allerede en anden aktivitet denne ugedag</p>
                </>
            )} */}
        </header>
    )
}