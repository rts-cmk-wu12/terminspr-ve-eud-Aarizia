export default function checkOtherActivitiesSameDay(activityWeekday, userActivities) {

    if (userActivities?.length === 0) return false;

    if (typeof(userActivities === 'object')) {
        if (userActivities?.weekday === activityWeekday) {
            return true;
        } else {
            return false;
        }
    }

    if (userActivities.length > 1) {
        userActivities.map(userActivity => {
            if (userActivity?.weekday === activityWeekday) {
                return true;
            } else {
                return false;
            }
        })
    }

    return 'check logic already signed up utility function';
}