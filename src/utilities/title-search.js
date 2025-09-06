export default function titleSearch(activities, query) {

    const activitiesArray = [];

    activities?.map(activity => {
        const search = activity?.name.search(query);
        if (search >= 0) activitiesArray.push(activity);
    })
    
    return activitiesArray;
}