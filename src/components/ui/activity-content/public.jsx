'use client';

import SiteHeaderSpecial from "../headers/site-header-special";
import SiteFooter from "../site-footer";
import styles from '../../../app/page.module.scss';

export default function ActivityContentPublic({ activityData, userData = null, access_token = null }) {

    console.log('user data: ', userData);
    console.log('activity data: ', activityData);

    return (
        <div className={`${styles.common_font} activity-page__wrapper`}>
            <SiteHeaderSpecial 
                activityData = {activityData}
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