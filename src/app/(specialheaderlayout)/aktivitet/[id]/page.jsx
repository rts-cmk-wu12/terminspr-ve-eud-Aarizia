import SiteHeaderSpecial from "@/components/ui/headers/site-header-special";
import SiteFooter from "@/components/ui/site-footer";
import styles from '../../../page.module.scss';
import './_activity-page.scss';
import { getCurrentUser, getSingleActivity } from "@/utilities/getApiData";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ActivityContent from "@/components/ui/activity-content";

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

    //console.log('userId: ', userId, 'userRole: ', userRole, 'access_token: ', access_token);
    //console.log(data)

    if (!activityData) {
        notFound();
    }

    return (
        activityData && userId && access_token && userRole ? 
            <ActivityContent activityData={activityData} userId={userId} access_token={access_token} userRole={userRole} />
        : activityData ? <ActivityContent activityData={activityData}/>
        : null
    )
}