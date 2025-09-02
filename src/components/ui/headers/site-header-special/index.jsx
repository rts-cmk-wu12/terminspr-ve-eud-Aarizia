'use client';

import Image from 'next/image';
import './_site-header-special.scss';
import styles from '../../../../app/page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SiteHeaderSpecial({ imageUrl = '', userId = null, access_token = null, userRole = null }) {

    const router = useRouter();
    const [currentUserData, setCurrentUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || !access_token) return;

        fetch(`http://localhost:4000/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }).then(function(response) {
            
            if (response.status !== 200) {
                throw new Error('endpoint not found');
            }

            return response.json();
        })
        .then(function(data) {
            if (!data) {
                //setCurrentUserData({});
                throw new Error('Data is null');
            }
            setCurrentUserData(data);
        })
        .catch(function(error) {
            setError(error);
        })
        .finally(function() {
            setLoading(false);
        });

        console.log(currentUserData)
    }, [userId, access_token])

    function clickHandlerLogin() {
        router.push('/log-ind');
    }

    function clickHandlerSignUp() {
        // lav fetch hvor du signer op
    }

    return (
        <header className='site-header-special'>
            <Image 
                priority
                src={imageUrl}
                width={411}
                height={489}
                alt='background-image'
                className='site-header-special__image'
            />
            {!userId || !access_token || !userRole && <button onClick={clickHandlerLogin} className={`${styles.button} site-header-special__button`}>Log ind for tilmelding</button>}
            {userId && access_token && userRole === 'default' && <button onClick={clickHandlerSignUp} className={`${styles.button} site-header-special__button`}>Tilmeld</button>}
            {userId && access_token && userRole !== 'default' && <button disabled className={`${styles.button_disabled} site-header-special__button site-header-special__button--disabled`}>Tilmeld</button>}
        </header>
    )
}