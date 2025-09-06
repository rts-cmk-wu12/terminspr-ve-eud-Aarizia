import Link from 'next/link';
import './_activity-card-small.scss';

export default function ActivityCardSmall({ pageState, activity = null, roster = null }) {

    return (
        <> 
            {pageState === 'default' && <Link href={`/aktivitet/${activity?.id}`} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{activity?.name}</h2>
                <span className='activity-card-small__text'>{activity?.weekday} {activity.time}</span>
            </Link>}
            {pageState === 'instructor' && <Link href={'/kalender/hold-oversigt'} className='activity-card-small'>
                <h2 className='activity-card-small__heading'>{roster[0]?.activity}</h2>
                <span className='activity-card-small__text'>{roster[0]?.weekday} {roster[0]?.time}</span>
            </Link>}
        </>

    )
}