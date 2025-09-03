export default function checkIfAlreadySignedUp(activityId, userActivities) {

    if (userActivities?.length === 0) return false;
/*     console.log('array log: ', userActivitiesArray.id);
    console.log('id log: ', activityId)
    console.log('datatype: ', typeof(userActivitiesArray)) */

    if (typeof(userActivities === 'object')) {
        if (userActivities?.id === activityId) {
            //console.log('datatype working')
            return true;
        } else {
            return false;
        }
    }

    if (userActivities.length > 1) {
        userActivities.map(userActivity => {
            if (userActivity?.id === activityId) {
                return true;
            } else {
                return false;
            }
        })
    }

    return 'check logic other activities same day utility function';
}