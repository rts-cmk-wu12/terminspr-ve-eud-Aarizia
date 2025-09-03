import { getCurrentUser } from "@/utilities/getApiData";
import { cookies } from "next/headers";

export const metadata = {
  title: 'Hold oversigt'
}

export default async function holdOversigtPage() {

    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const access_token = cookieStore.get('landrupdans_access_token');
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

    return roster && (
      <main>
          <ul>
            {roster.length === 1 &&
                <>
                <h2>{roster[0].activity}</h2>
                <ul>
                  <li>{roster[0].firstname} {roster[0].lastname}</li>
                </ul>
                </>
            }
            {roster.length > 1 &&
              <>
              <h2>{roster[0].activity}</h2>
              <ul>
                <li>{roster[0].firstname} {roster[0].lastname}</li>
                <li>{roster[1].firstname} {roster[1].lastname}</li>
              </ul>
              </>
            }
          </ul>
      </main>
    )
}