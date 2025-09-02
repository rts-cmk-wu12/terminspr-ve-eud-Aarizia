import { getActivities } from '@/utilities/getApiData';
import './_activities-page.scss';
import ActivityCardBig from '@/components/ui/activity-cards/activity-card-big';

export default async function aktiviteterPage() {

  const data = await getActivities()
  //console.log(data)

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
        <p className='activities__error-message'>Der er sket en fejl på serveren. Vi beklager ulejligheden. Prøv igen senere.</p>
      }
    </main>
    
  );
}
