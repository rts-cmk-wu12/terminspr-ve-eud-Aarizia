import { getActivities } from '@/utilities/getApiData';
import './_activities-page.scss';
import ActivityCardBig from '@/components/ui/activity-cards/activity-card-big';

export const metadata = {
  title: 'Aktiviteter'
}

export default async function aktiviteterPage() {

  const data = await getActivities()
  
  //data && console.log(data)

  return (
    <main className='activities'>
      {data ? 
        <ul>
          {data?.map(activity => {
            return (
              <li key={activity.id}>
                <ActivityCardBig data={activity} />
              </li>
            )
          })}
        </ul>
        :
        <p>Indlæser...</p>
      }
    </main>
    
  );
}
