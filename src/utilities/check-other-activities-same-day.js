export default function checkOtherActivitiesSameDay(activityWeekday, userActivities) {

    if (!userActivities) return false;

/*     if (typeof(userActivities === 'object')) {
        if (userActivities?.weekday === activityWeekday) {
            return true;
        } else {
            return false;
        }
    } */

    let hasOtherActivities = false;

    userActivities.map(userActivity => {
        if (userActivity?.weekday === activityWeekday) {
            hasOtherActivities = true
        }
    });

    return hasOtherActivities;
}