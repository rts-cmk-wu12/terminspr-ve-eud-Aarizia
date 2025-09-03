import ActivityCardSmall from "@/components/ui/activity-cards/activity-card-small";
import { getCurrentUser } from "@/utilities/getApiData";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Kalender'
}

export default async function kalenderPage() {

    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const access_token = cookieStore.get('landrupdans_access_token');
    const userRole = cookieStore.get('landrupdans_userRole');
    const userData = await getCurrentUser(userId?.value, access_token?.value);
    const response = await fetch(`http://localhost:4000/api/v1/users/${userId?.value}/roster/${userId?.value}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token?.value
        }
    })
    //response && console.log(response);
    const roster = await response.json();
    roster && console.log(roster)
    //roster && console.log('roster spread: ', ...roster);
    //roster && console.log('find roster length', roster.length)
    
    //roster && console.log(typeof(roster))

    //userData && console.log('userdata: ', userData);
    //userData && console.log('find role: ', userData?.role)

    return (
        <main>
            {userData && roster && roster.length === 1 &&
                <ul>
                    <li>
                        <ActivityCardSmall roster={roster} userData={userData} />
                    </li>
                </ul>
            }
            {userData && roster && roster.length > 1 &&
                    <ul>
                        <li>
                            <ActivityCardSmall roster={roster} userData={userData} />
                        </li>
                    </ul>
                    }
                    {userRole === 'default' &&
                        <ul>
                    {userData?.activities.map(activity => {
                        return (
                            <li key={activity.id}>
                                <ActivityCardSmall activity={activity} userData={userData} />
                            </li>
                        )
                    })}
                </ul>
            }
            </main>
        )
    }
    {/*                       {...roster.map((workshops, index) => {
                              return (
                                  <li key={index}>
                                      <ActivityCardSmall roster={roster} workshops={workshops} userData={userData} />
                                  </li>
                              )
                          })} */}