import './_activity-page.scss';
import { getCurrentUser, getSingleActivity } from "@/utilities/getApiData";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import styles from '../../../page.module.scss';
import SiteHeaderSpecial from '@/components/ui/headers/site-header-special';
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

    if (!activityData) {
        notFound();
    }

    if (userRole?.value === 'default' && userId && access_token) {
        userData = await getCurrentUser(userId.value, access_token.value);
        pageState = PAGE_STATE_USER;
    }

    if (userRole?.value === 'instructor') {
        pageState = PAGE_STATE_INSTRUCTOR;
    }

    return (
        <div className={`${styles.common_font} activity-page__wrapper`}>
            {(pageState === 'public' || pageState === 'instructor') && <SiteHeaderSpecial activityData={activityData} pageState={pageState} />}
            {pageState === 'default' && <SiteHeaderSpecial 
                activityData = {activityData}
                userData={userData}
                userId={userId.value}
                access_token={access_token.value}
                pageState={pageState}
            />}
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