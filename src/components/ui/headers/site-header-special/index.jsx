'use client';

import Image from 'next/image';
import './_site-header-special.scss';
import styles from '../../../../app/page.module.scss';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SiteHeaderSpecial({ activityData, pageState, userId = null, access_token = null, userSignUpOptions = null }) {

    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const BASE_API_URL = 'http://localhost:4000/api/v1/';

    function clickHandlerLogin() {
        router.push('/log-ind');
    }

    function clickHandlerAddUserToActivity() {

        setLoading(true);
        
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
        })
        .catch(function(error) {
            console.log(error)
            setError('Der er sket en fejl på serveren. Prøv igen senere');
        })
        .finally(function() {
            setLoading(false);
            // skal den være her eller hvordan?
            router.push('/kvittering/tilmelding');
        });
        
    }

    function clickHandlerRemoveUserFromActivity() {

        setLoading(true);

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
            console.log(response);
            console.log('response delete request: ', response);
        })
        .catch(function(error) {
            console.log(error)
            setError('Der er sket en fejl på serveren. Prøv igen senere');
        })
        .finally(function() {
            setLoading(false);
            router.push('/kvittering/afmelding')
        });
    }

    return loading ? (
        <header className='site-header-special'>
            <Image 
                priority
                src={activityData?.asset?.url}
                width={411}
                height={489}
                alt='background-image'
                className='site-header-special__image'
            />
            <button disabled className={`${styles.button_disabled} site-header-special__button`} type='button'>Indlæser...</button>
        </header>
    ) : (
        <header className='site-header-special'>
            <Image 
                priority
                src={activityData?.asset?.url}
                width={411}
                height={489}
                alt='background-image'
                className='site-header-special__image'
            />
            {pageState === 'public' && <button onClick={clickHandlerLogin} className={`${styles.button} site-header-special__button`}>Log ind for tilmelding</button>}
            {pageState === 'instructor' && <button onClick={clickHandlerLogin} className={`${styles.button} site-header-special__button`}>Log ind som bruger for tilmelding</button>}
            {pageState === 'default' && userSignUpOptions === 'user already signed up' && <button onClick={clickHandlerRemoveUserFromActivity} className={`${styles.button} site-header-special__button`}>Forlad</button>}
            {pageState === 'default' && userSignUpOptions === 'user not appropriate age' && <>
                <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                <p className='site-header-special__error-message'>Du møder ikke alderskriterierne for denne aktivitet</p>
            </>}
            {pageState === 'default' && userSignUpOptions === 'user has other activities same day' && <>
                <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                <p className='site-header-special__error-message'>Du har allerede en anden aktivitet denne ugedag</p>
            </>}
            {pageState === 'default' && userSignUpOptions === 'user can sign up' && <button onClick={clickHandlerAddUserToActivity} className={`${styles.button} site-header-special__button`}>Tilmeld</button>}
            <p className='site-header-special__error-message-general'>{error}</p>
        </header>
    )
}