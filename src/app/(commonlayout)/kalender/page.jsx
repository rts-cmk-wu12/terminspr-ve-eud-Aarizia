import { getCurrentUser } from "@/utilities/getApiData";
import { cookies } from "next/headers";
import './_calendar-page.scss';
import { notFound } from "next/navigation";
import ActivityCardSmall from "@/components/ui/activity-cards/activity-card-small";

export const metadata = {
  title: 'Kalender'
}

export default async function kalenderPage() {

    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const access_token = cookieStore.get('landrupdans_access_token');
    const userRole = cookieStore.get('landrupdans_userRole');
    const PAGE_STATE_NO_USER = 'public';
    const PAGE_STATE_USER = 'default';
    const PAGE_STATE_INSTRUCTOR = 'instructor';
    let pageState = PAGE_STATE_NO_USER;
    let roster = null;
    let userData = null;
    
    if (userRole?.value === 'default') {
        pageState = PAGE_STATE_USER;
    }

    if (userRole?.value === 'instructor') {
        pageState = PAGE_STATE_INSTRUCTOR;
    }

    if (pageState === PAGE_STATE_USER || pageState === PAGE_STATE_INSTRUCTOR) {
        userData = await getCurrentUser(userId?.value, access_token?.value);
    }
    
    if (pageState === PAGE_STATE_INSTRUCTOR) {
        const response = await fetch(`http://localhost:4000/api/v1/users/${userId?.value}/roster/${userId?.value}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token?.value
            }
        })
        const data = await response.json();
        roster = data;
    }

    if (pageState === PAGE_STATE_NO_USER) {
        notFound();
    }

    return (
        <main className="calendar">
            {pageState === 'default' && userData.activities.length === 0 && <p className="calendar__text">Du har ingen aktiviteter i kalenderen</p>}
            {pageState === 'default' && userData?.activities && <ul>
                {userData?.activities.map(activity => {
                    return (
                        <li key={activity.id}>
                            <ActivityCardSmall activity={activity} userData={userData} pageState={pageState} />
                        </li>
                    )
                })}
            </ul>}
            {pageState === 'instructor' && !roster && <p className="calendar__text">Du har ingen aktiviteter i kalenderen</p>}
            {pageState === 'instructor' && roster && <ul>
                <li>
                    <ActivityCardSmall pageState={pageState} roster={roster} userData={userData} />
                </li>
            </ul>}
        </main>
    )
}