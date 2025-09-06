'use server';

import { getActivities } from "@/utilities/getApiData";
import titleSearch from "@/utilities/title-search";
import z from "zod";

export default async function searchFormAction(prevState, formData) {

    const query = formData.get('query');
    
    const schema = z.object({
        query: z.string().min(1).max(50, {message: 'Du kan max indtaste 50 tegn'})
    });
    
    const validated = schema.safeParse({ query });
    
    if (!validated.success) return {
        ...validated,
        ...(z.treeifyError(validated.error))
    }
    
    const activitiesData = await getActivities();
    const queryResults = titleSearch(activitiesData, validated.data.query);
    
   if (queryResults.length === 0) {
        return {
            success: false,
            errors: ['Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet']
        }
   }
    
    return {
        success: true,
        results: queryResults
    };
}