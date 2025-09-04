export default function checkIfAlreadySignedUp(activityId, userActivities) {

    if (!userActivities) return false;
/*     console.log('array log: ', userActivitiesArray.id);
    console.log('id log: ', activityId)
    console.log('datatype: ', typeof(userActivitiesArray)) */

/*     if (typeof(userActivities === 'object')) {
        if (userActivities?.id === activityId) {
            //console.log('datatype working')
            return true;
        } else {
            return false;
        }
    } */
   let hasActivity = false;

    userActivities.map(userActivity => {
        if (userActivity?.id === activityId) 
            
            hasActivity = true;
    });

    return hasActivity;
}