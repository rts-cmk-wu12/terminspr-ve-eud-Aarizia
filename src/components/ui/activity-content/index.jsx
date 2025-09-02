import SiteHeaderSpecial from "../headers/site-header-special";
import SiteFooter from "../site-footer";
import styles from '../../../app/page.module.scss';

export default function ActivityContent({ activityData, userId = null, access_token = null, userRole = null }) {

    return (
        <div className={`${styles.common_font} activity-page__wrapper`}>
            {userId && access_token && userRole ?
                <SiteHeaderSpecial imageUrl={activityData?.asset?.url} userId={userId.value} access_token={access_token.value} userRole={userRole.value} />
            :
                <SiteHeaderSpecial imageUrl={activityData?.asset?.url} />
            }
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