
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
    const userData = await getCurrentUser(userId?.value, access_token?.value);
    
    //userData && console.log('userData: ', userData);
    //console.log('userId: ', userId);
    //console.log('userRole: ', userRole);
    //console.log('access_token: ', access_token);
    //console.log(activityData)

    if (!activityData) {
        notFound();
    }

    return userData ? (
        <ActivityContent activityData={activityData} userData={userData} access_token={access_token.value} userId={userId.value} userRole={userRole.value} /* userRole={userRole.value} */ />
    ) : (
        <ActivityContent activityData={activityData} />
    )
}