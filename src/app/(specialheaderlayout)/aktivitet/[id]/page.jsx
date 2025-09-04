import './_activity-page.scss';
import { getCurrentUser, getSingleActivity } from "@/utilities/getApiData";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import styles from '../../../page.module.scss';
import SiteHeaderSpecial from '@/components/ui/headers/site-header-special';
import checkIfAlreadySignedUp from '@/utilities/check-if-already-signed-up';
import checkAge from '@/utilities/check-age';
import checkOtherActivitiesSameDay from '@/utilities/check-other-activities-same-day';
import SiteFooter from '@/components/ui/site-footer';

export async function generateMetadata({ params }) {
    
    const {id} = await params;
    const data = await getSingleActivity(id);

    return {
        title: data?.name
    }

}

export default async function aktivitetsDetaljerPage({ params }) {

    const {id} = await params;
    const activityData = await getSingleActivity(id);
    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const userRole = cookieStore.get('landrupdans_userRole');
    const access_token = cookieStore.get('landrupdans_access_token');
    const PAGE_STATE_NO_USER = 'public';
    const PAGE_STATE_USER = 'default';
    const PAGE_STATE_INSTRUCTOR = 'instructor';
    let pageState = PAGE_STATE_NO_USER;
    let userData = null;
    let userSignUpOptions = null;

    if (!activityData) {
        notFound();
    }
    
    if (userId && access_token) {
        userData = await getCurrentUser(userId.value, access_token.value);
    }

    if (userRole?.value === 'default') {
        pageState = PAGE_STATE_USER;

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
        //console.log(userData);
    }

    if (userRole?.value === 'instructor') {
        pageState = PAGE_STATE_INSTRUCTOR;
    }

    return (
        <div className={`${styles.common_font} activity-page__wrapper`}>
            {pageState === 'public' && <SiteHeaderSpecial activityData = {activityData} pageState={pageState} />}
            {pageState === 'default' && <SiteHeaderSpecial 
                activityData = {activityData}
                userId={userId.value}
                access_token={access_token.value}
                pageState={pageState}
                userSignUpOptions={userSignUpOptions}
            />}
            {pageState === 'instructor' && <SiteHeaderSpecial activityData = {activityData} pageState={pageState} />}
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