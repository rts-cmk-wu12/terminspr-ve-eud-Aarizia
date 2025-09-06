'use client';

import Image from 'next/image';
import './_site-header-special.scss';
import styles from '../../../../app/page.module.scss';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import checkIfAlreadySignedUp from '@/utilities/check-if-already-signed-up';
import checkAge from '@/utilities/check-age';
import checkOtherActivitiesSameDay from '@/utilities/check-other-activities-same-day';
import removeUserFromActivity from '@/actions/remove-user-from-activity';
import addUserToActivity from '@/actions/add-user-to-activity';

export default function SiteHeaderSpecial({ userData = null, activityData, pageState, userId = null, access_token = null }) {
    
    const router = useRouter();
    const [deleteFormState, deleteFormAction, deleteIsPending] = useActionState(removeUserFromActivity);
    const [addFormState, addFormAction, addIsPending] = useActionState(addUserToActivity);
    
    let userSignUpOptions = null;
    const alreadySignedUp = checkIfAlreadySignedUp(activityData?.id, userData?.activities);
    const appropriateAge = checkAge(activityData?.minAge, activityData?.maxAge, userData?.age);
    const hasOtherActivitiesSameDay = checkOtherActivitiesSameDay(activityData?.weekday, userData?.activities);
    
    if (alreadySignedUp) {
        userSignUpOptions = 'user already signed up';
    } else if (!appropriateAge) {
        userSignUpOptions = 'user not appropriate age';
    } else if (hasOtherActivitiesSameDay) {
        userSignUpOptions = 'user has other activities same day';
    } else {
        userSignUpOptions = 'user can sign up';
    }
    
/*     useEffect(() => {
        
        if (!deleteFormState) return 
        
        console.log(deleteFormState);
        
    }, [deleteFormState]);
    
    useEffect(() => {

        if (!addFormState) return 

        console.log(addFormState);

    }, [addFormState]) */

    function clickHandlerLogin() {
        router.push('/log-ind');
    }
    
    return (deleteIsPending || addIsPending) ? (
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
            {pageState === 'default' && userSignUpOptions === 'user already signed up' && <form action={deleteFormAction} className='site-header-special__form'>
                <input type="text" hidden value={userId} readOnly name='userId' />
                <input type="text" hidden value={access_token} readOnly name='access_token' />
                <input type="text" hidden value={activityData.id} readOnly name='activityId' />
                <button className={`${styles.button} site-header-special__button`} type='submit'>Forlad</button>
            </form>}
            {pageState === 'default' && userSignUpOptions === 'user not appropriate age' && <> 
                <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                <p className='site-header-special__error-message'>Du møder ikke alderskriterierne for denne aktivitet</p>
            </>}
            {pageState === 'default' && userSignUpOptions === 'user has other activities same day' && <>
                <button disabled className={`${styles.button_disabled} site-header-special__button`}>Tilmeld</button>
                <p className='site-header-special__error-message'>Du har allerede en anden aktivitet denne ugedag</p>
                </>}
                {pageState === 'default' && userSignUpOptions === 'user can sign up' && <form action={addFormAction} className='site-header-special__form'>
                    <input type="text" hidden value={userId} readOnly name='userId' />
                    <input type="text" hidden value={access_token} readOnly name='access_token' />
                    <input type="text" hidden value={activityData.id} readOnly name='activityId' />
                    <button className={`${styles.button} site-header-special__button`} type='submit'>Tilmeld</button>
                </form>}
            <p className='site-header-special__error-message-general'>{deleteFormState?.error}{addFormState?.error}</p>
        </header>
    )
}

