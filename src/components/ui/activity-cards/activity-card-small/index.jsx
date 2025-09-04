import Link from 'next/link';
import './_activity-card-small.scss';

export default async function ActivityCardSmall( userData ) {

    return (
        <> 
            {userData.pageState === 'default' && <Link href={`/aktivitet/${userData.activity.id}`} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{userData.activity.name}</h2>
                <span className='activity-card-small__text'>{userData.activity.weekday} {userData.activity.time}</span>
            </Link>}
            {userData.pageState === 'instructor' && <Link href={'/kalender/hold-oversigt'} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{userData.roster[0].activity}</h2>
                <span className='activity-card-small__text'>{userData.roster[0].weekday} {userData.roster[0].time}</span>
            </Link>}
        </>

    )
}