import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import './_roster-page.scss';

export const metadata = {
  title: 'Hold oversigt'
}

export default async function holdOversigtPage() {

    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const access_token = cookieStore.get('landrupdans_access_token');
    const userRole = cookieStore.get('landrupdans_userRole');
/*     const PAGE_STATE_NO_USER = 'public';
    const PAGE_STATE_USER = 'default';
    const PAGE_STATE_INSTRUCTOR = 'instructor';
    let pageState = PAGE_STATE_NO_USER; */
    let roster = null;

    if (!userRole || userRole === 'default') {
        notFound();
    }

    const response = await fetch(`http://localhost:4000/api/v1/users/${userId?.value}/roster/${userId?.value}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token?.value
        }
    });
    const data = await response.json();
    roster = data;

    return  (
        <main className="roster">
            {!roster && <p className="roster__text">Du har ingen hold</p>}
            {roster ? <> 
                <h2 className="roster__heading">{roster[0].activity}</h2>
                <ul className="roster__list">
                      {roster.map((person, index) => {
                          return <li key={index} className="roster__text">{person.firstname} {person.lastname}</li>
                      })}
                </ul>
            </> : <p className="roster__text">Indlæser...</p>}
        </main>
    )
}