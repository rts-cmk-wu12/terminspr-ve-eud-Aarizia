import Link from 'next/link';
import './_activity-card-small.scss';
import { cookies } from 'next/headers';

export default async function ActivityCardSmall( userData, roster = null, workshops = []) {

    console.log('userdata act card: ', userData.userData)
    //console.log('find role act card: ', userData.userData.role)
    //console.log('find roster name: ', userData.roster.activity)
    //console.log('find roster length: ', userData.roster.length)
    //console.log('find roster name: ', userData.roster[0])
    //console.log('workshops: ', workshops)
    //console.log('roster: ', roster)

    const cookieStore = await cookies();
    const userId = cookieStore.get('landrupdans_userId');
    const access_token = cookieStore.get('landrupdans_access_token');
    const userRole = cookieStore.get('landrupdans_userRole');
    const response = await fetch(`http://localhost:4000/api/v1/users/${userId?.value}/roster/${userId?.value}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + access_token?.value
        }
    })
    const fetchedRoster = await response.json();
    fetchedRoster && console.log('fetched roster: ', fetchedRoster);
    console.log(roster)

    return (
        <> 
            {userData?.userData?.role === 'default' &&
            <Link href={`/aktivitet/${userData.activity.id}`} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{userData.activity.name}</h2>
                <span className='activity-card-small__text'>{userData.activity.weekday} {userData.activity.time}</span>
            </Link>}
            {userData.userData.role === 'instructor' && userData?.roster?.length === 1 &&
            <Link href={'/kalender/hold-oversigt'} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{userData.roster[0].activity}</h2>
                <span className='activity-card-small__text'>{userData.roster[0].weekday} {userData.roster[0].time}</span>
            </Link>}
            {userData.userData.role === 'instructor' && fetchedRoster && fetchedRoster.length > 1 &&
            <>
            <Link href='/kalender/hold-oversigt' className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{fetchedRoster[0].activity}</h2>
                <span className='activity-card-small__text'>{fetchedRoster[0].weekday} {userData.roster[0].time}</span>
            </Link>
                </>
            }
            
        </>

    )
}