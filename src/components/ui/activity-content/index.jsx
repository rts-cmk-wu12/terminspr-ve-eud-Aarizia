'use client';

import SiteHeaderSpecial from "../headers/site-header-special";
import SiteFooter from "../site-footer";
import styles from '../../../app/page.module.scss';
import checkIfAlreadySignedUp from "@/utilities/check-if-already-signed-up";
import checkAge from "@/utilities/check-age";
import checkOtherActivitiesSameDay from "@/utilities/check-other-activities-same-day";
import { useEffect, useState } from "react";

export default function ActivityContent({ activityData, userData = null, access_token = null, userId = null, userRole = null }) {

    const alreadySignedUp = checkIfAlreadySignedUp(activityData?.id, ...userData?.activities);
    //console.log('alreadySignedUp: ', alreadySignedUp);
    const appropriateAge = checkAge(activityData?.minAge, activityData?.maxAge, userData?.age);
    //console.log('appropriateAge: ', appropriateAge)
    const hasOtherActivitiesSameDay = checkOtherActivitiesSameDay(activityData?.weekday, ...userData?.activities);
    //console.log(hasOtherActivitiesSameDay);

    console.log('user data: ', userData);
    console.log('activity data: ', activityData);

    return (
        <div className={`${styles.common_font} activity-page__wrapper`}>
            <SiteHeaderSpecial 
                activityData = {activityData}
                userId={userId ? userId : null} 
                access_token={access_token ? access_token : null}
                userRole={userRole ? userRole : null} 
                alreadySignedUp={alreadySignedUp} 
                appropriateAge={appropriateAge} 
                hasOtherActivitiesSameDay={hasOtherActivitiesSameDay} 
            />
            <main className="activity">
                <h1 className="activity__heading">{activityData?.name}</h1>
                <span>{activityData?.minAge}-{activityData?.maxAge} år</span>
                <span className="line-break">{activityData?.weekday} {activityData?.time}</span>
                <p>{activityData?.description}</p>
            </main>
            <SiteFooter />
        </div> 
    )
}